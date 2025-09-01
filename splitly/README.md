# Splitly - Expense Splitting App

A modern React application for splitting expenses with friends, built with Vite and Supabase.

## Features

- ✅ User Authentication (Sign up/Sign in)
- ✅ Profile Management
- ✅ Group Creation and Management
- ✅ Expense Tracking
- ✅ Settlement Management
- ✅ Responsive Design
- ✅ Dark Theme

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Supabase
- **Routing**: React Router v6
- **Icons**: Lucide React

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd splitly
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env` and fill in your Supabase credentials:
```bash
cp .env.example .env
```

Update the following variables in `.env`:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 4. Supabase Setup

Create the following tables in your Supabase database:

#### Auth Configuration
The app uses Supabase Auth with the following user metadata fields:
- `full_name`: User's full name
- `nickname`: Auto-generated funny nickname
- `avatar`: Random avatar filename (1-30.jpg)

### 5. Start Development Server
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # React components
│   ├── AuthModal.jsx   # Login/Signup modal
│   ├── Navigation.jsx  # Main navigation
│   ├── ProtectedRoute.jsx # Route protection
│   └── ...             # Other components
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication context
├── lib/               # Utilities
│   └── supabase.js    # Supabase client
└── assets/           # Static assets (30 avatar images)
```

## Authentication Flow

1. Users can sign up with email, password, and full name
2. System automatically generates a funny nickname and assigns random avatar
3. Users can only update their password (name, email, nickname, avatar are read-only)
4. Protected routes require authentication
5. Profile management with sign out functionality

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
