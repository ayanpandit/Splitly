-- Supabase schema for Splitly
-- Run these statements in the Supabase SQL editor.

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- Profiles table (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  nickname text unique,
  avatar text,
  created_at timestamptz default now()
);

-- Groups table
create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image text not null,
  invite_code text unique not null,
  invite_expires_at timestamptz not null,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

-- Group members
create table if not exists public.group_members (
  id bigserial primary key,
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('admin','member')),
  joined_at timestamptz default now(),
  unique(group_id, user_id)
);

-- Expenses (who paid total amount)
create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups(id) on delete cascade,
  description text not null,
  amount numeric(12,2) not null check (amount > 0),
  paid_by uuid not null references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- Expense shares (each participant's share)
create table if not exists public.expense_shares (
  id bigserial primary key,
  expense_id uuid not null references public.expenses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  share_amount numeric(12,2) not null check (share_amount >= 0),
  unique(expense_id, user_id)
);

-- Settlements (manual payments)
create table if not exists public.settlements (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups(id) on delete cascade,
  from_user_id uuid not null references auth.users(id) on delete cascade,
  to_user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  created_at timestamptz default now()
);

create index if not exists idx_group_members_user on public.group_members(user_id);
create index if not exists idx_expenses_group on public.expenses(group_id);
create index if not exists idx_expense_shares_expense on public.expense_shares(expense_id);
create index if not exists idx_settlements_group on public.settlements(group_id);
drop policy if exists "Groups: Insert" on public.groups;
drop policy if exists "Groups: Select auth" on public.groups;
drop policy if exists "Groups: Select limited" on public.groups;
drop policy if exists "Groups: Update admin" on public.groups;
drop policy if exists "Groups: Delete admin" on public.groups;

create policy "Groups: Insert" on public.groups for insert with check (auth.uid() is not null);

-- Restrictive select: only creator or member (reference group_members; acceptable since group_members select is permissive)
create policy "Groups: Select limited" on public.groups for select using (
  auth.uid() = created_by OR exists (
    select 1 from public.group_members gm where gm.group_id = groups.id and gm.user_id = auth.uid()
  )
);
create policy "Profiles: Update own" on public.profiles for update using (auth.uid() = id);

-- Groups: members can select; creator can insert; members can update limited (not enforced here) or delete (only admin)
-- Groups insert policy (any authenticated user; created_by set by trigger)
drop policy if exists "Groups: Insert" on public.groups;
create policy "Groups: Insert" on public.groups for insert with check (auth.uid() is not null);
create policy "Groups: Select for members" on public.groups for select using (exists (select 1 from public.group_members gm where gm.group_id = groups.id and gm.user_id = auth.uid()));
create policy "Groups: Select by creator" on public.groups for select using (created_by = auth.uid());
-- (Optional emergency debug) Uncomment if still blocked, then re-run. Remove later.
-- create policy "Groups: Select all temp" on public.groups for select using (true);
create policy "Groups: Update admin" on public.groups for update using (created_by = auth.uid());
create policy "Groups: Delete admin" on public.groups for delete using (created_by = auth.uid());

drop policy if exists "GroupMembers: Select" on public.group_members;
-- Non-recursive: user can see
-- 1) Their own membership row
-- 2) Any row in groups they created (admin/creator)
-- 3) (Temporary broad) Any row in groups where they are a member using a join to groups only
--    Achieved by allowing select if they are creator OR user_id = auth.uid().
-- NOTE: This means non-creator members only see their own row. To show all members, we add a second policy.
create policy "GroupMembers: Select own" on public.group_members
for select using (auth.uid() = user_id);
create policy "GroupMembers: Select as creator" on public.group_members
for select using (exists (select 1 from public.groups g where g.id = group_members.group_id and g.created_by = auth.uid()));
-- OPTIONAL: Uncomment below to allow members to see all rows of groups they belong to (less strict)
-- create policy "GroupMembers: Select group members (broad)" on public.group_members
-- for select using (exists (
--   select 1 from public.groups g
--   join public.group_members gm_self on gm_self.group_id = g.id and gm_self.user_id = auth.uid()
--   where g.id = group_members.group_id
-- ));
create policy "GroupMembers: Insert self" on public.group_members for insert with check (auth.uid() = user_id);
create policy "GroupMembers: Delete admin" on public.group_members for delete using (
  exists (
    select 1 from public.group_members gm3 
    where gm3.group_id = group_members.group_id 
      and gm3.user_id = auth.uid() 
      and gm3.role = 'admin'
  )
);

-- Expenses: members can insert/select; update/delete only payer (simplified)
create policy "Expenses: Select" on public.expenses for select using (exists (select 1 from public.group_members gm where gm.group_id = expenses.group_id and gm.user_id = auth.uid()));
create policy "Expenses: Insert" on public.expenses for insert with check (exists (select 1 from public.group_members gm where gm.group_id = expenses.group_id and gm.user_id = auth.uid()));
create policy "Expenses: Update by payer" on public.expenses for update using (paid_by = auth.uid());
create policy "Expenses: Delete by payer" on public.expenses for delete using (paid_by = auth.uid());

-- Expense shares: select members; insert when related expense inserted; no update except member or payer
create policy "ExpenseShares: Select" on public.expense_shares for select using (exists (
  select 1 from public.expenses e join public.group_members gm on gm.group_id = e.group_id
  where e.id = expense_shares.expense_id and gm.user_id = auth.uid()));
create policy "ExpenseShares: Insert" on public.expense_shares for insert with check (exists (
  select 1 from public.expenses e join public.group_members gm on gm.group_id = e.group_id
  where e.id = expense_shares.expense_id and gm.user_id = auth.uid()));

-- Settlements: select/insert members of group
create policy "Settlements: Select" on public.settlements for select using (exists (select 1 from public.group_members gm where gm.group_id = settlements.group_id and gm.user_id = auth.uid()));
create policy "Settlements: Insert" on public.settlements for insert with check (exists (select 1 from public.group_members gm where gm.group_id = settlements.group_id and gm.user_id = auth.uid()));

-- Helper view for balances (optional)
create or replace view public.group_balances as
select
  g.id as group_id,
  m.user_id,
  coalesce(sum(case when e.paid_by = m.user_id then e.amount else 0 end),0) -
  coalesce(sum(es.share_amount) filter (where es.user_id = m.user_id),0) as net_amount
from groups g
join group_members m on m.group_id = g.id
left join expenses e on e.group_id = g.id
left join expense_shares es on es.expense_id = e.id
group by g.id, m.user_id;

comment on view public.group_balances is 'Net balance per user (positive => others owe them).';

-- Function to regenerate invite (admin only)
create or replace function public.regenerate_group_invite(gid uuid)
returns table (id uuid, invite_code text, invite_expires_at timestamptz) as $$
declare
  new_code text;
begin
  -- Ensure caller is admin (creator)
  if not exists (select 1 from public.groups g where g.id = gid and g.created_by = auth.uid()) then
    raise exception 'Not authorized';
  end if;
  new_code := upper(substr(replace(gen_random_uuid()::text,'-',''),1,8));
  update public.groups
    set invite_code = new_code,
        invite_expires_at = now() + interval '24 hours'
    where id = gid
  returning groups.id, groups.invite_code, groups.invite_expires_at into id, invite_code, invite_expires_at;
  return next;
end;
$$ language plpgsql security definer;

-- Promote a member to admin (caller must be an admin of the group)
create or replace function public.promote_group_member(gid uuid, target_uid uuid)
returns void as $$
begin
  -- ensure caller is admin of group
  if not exists (
    select 1 from public.group_members gm
    where gm.group_id = gid and gm.user_id = auth.uid() and gm.role = 'admin'
  ) then
    raise exception 'Not authorized';
  end if;
  update public.group_members
    set role = 'admin'
    where group_id = gid and user_id = target_uid;
  if not found then
    raise exception 'Member not found';
  end if;
end;
$$ language plpgsql security definer;

-- ================= Additional helper triggers =================
-- Ensure created_by defaults to auth.uid() if not provided and auto add admin membership
create or replace function public.set_group_created_by()
returns trigger as $$
begin
  if new.created_by is null then
    new.created_by := auth.uid();
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_set_group_created_by on public.groups;
create trigger trg_set_group_created_by
before insert on public.groups
for each row execute function public.set_group_created_by();

create or replace function public.add_creator_membership()
returns trigger as $$
begin
  insert into public.group_members(group_id, user_id, role)
  values (new.id, new.created_by, 'admin')
  on conflict do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_add_creator_membership on public.groups;
create trigger trg_add_creator_membership
after insert on public.groups
for each row execute function public.add_creator_membership();

-- RPC: return all members with profile info for a group (caller must belong)
create or replace function public.get_group_members(gid uuid)
returns table (
  user_id uuid,
  role text,
  full_name text,
  nickname text,
  avatar text
) as $$
begin
  -- authorize: caller must be a member of the group
  if not exists (
    select 1 from public.group_members gm where gm.group_id = gid and gm.user_id = auth.uid()
  ) then
    raise exception 'Not authorized';
  end if;
  return query
  select gm.user_id, gm.role, p.full_name, p.nickname, p.avatar
  from public.group_members gm
  left join public.profiles p on p.id = gm.user_id
  where gm.group_id = gid
  order by gm.joined_at asc;
end;
$$ language plpgsql security definer;
