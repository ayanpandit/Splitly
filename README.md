# Splitly – Smart Expense Sharing App

Splitly is a smart expense-sharing app designed for friends, roommates, and groups who want to keep track of shared expenses without the headache of manual calculations. It allows users to split bills, track balances, and settle up easily—making group payments transparent, stress-free, and just a little less friendship-ending.
  
  *Track, split, settle—repeat without stress.*

# Features
## 🚀No Download Required

Runs directly in your browser—no install, no wasted storage. Just open and go!

## 📱APK Available

For offline access, you can also install the app as an APK on your Android device.

## ⚡Lightweight & Fast

Optimized for speed with a playful, cartoonish UI that works smoothly on any device.

## 🎨Playful Avatars & Nicknames

Every user gets a fun cartoon avatar and nickname for a lively, personal experience.

## 🌐 Cross-Device Access

Log in from any device—phone, tablet, computer, or APK—and continue right where you left off.

## 💬Contact Developer

Built-in contact form lets you reach the developer directly from the app—feedback always welcome!

## 🔐Privacy First

Your data is never sold or shared. You’re always in control of your information.

 # Setup for devs :-
## Step 1:- 
open your  IDE (vs code, Cursor), in the terminal type "git clone https://github.com/ayanpandit/Splitly.git" 
## Step 2:-
Go to the supabase "https://supabase.com/"
## Step 3:-
Create  a account on it > Create a project .
## Step 3:-
Copy the Supabase project url something like "https://your-project.supabase.co"  and also copy the  Anon Key  "ey..........usN"
## Step 4:-
Go to "https://api-ninjas.com/api/animals" there create a api key 
## Step 5:- 
Now come back to the your IDE and  inside the Splitly>Splitly make a new file name it ".env" 
## Step 6:-
Copy the content of the ".env.example" file in the ".env" file you created 
## Step 7:-
Place the api key collected in the starting.
## Step 8:-
Now navigate to the final Splitly in the terminal .run the command "npm install"
## Step 9:-
Open the file "supabase-schema.sql" copy all the content as it is and then 
## Step 10:-
Open the  Supabase and open  you project dashboard in the top right corner open the SQL editor and paste the code copied from the "supabase-schema.sql" now click run 
## Step 11-  
you  will see an comfirmation "Success. No rows returned.".
# APK Setup:
In the folder "Splitlyapk"> App.js , around line no.29 source={{ uri: "Your_deployment_link "}}
replace it with you deployment link 
# E-mail Setup:


---

## 🛠 Tech Stack

- **Frontend**: React, Vite  
- **Backend (Database as a Service)**: Supabase (PostgreSQL + Auth + API)  
- **APIs**:  Animals API (via [API Ninjas](https://api-ninjas.com/api/animals))  
- **State Management**: React Hooks (`useState`, `useEffect`, etc.)  
- **Styling**: Tailwindcss
- **Mobile (APK Build)**: React Native WebView  
- **Version Control**: Git & GitHub  
- ---

## 📬 Contact Developer

Developed by **Ayan Pandit**.  

- GitHub: (https://github.com/ayanpandit)  
- Email: aayanpandey8528@gmail.com   
- Feedback & suggestions: Use the **in-app contact form** in Splitly  

Feel free to reach out for questions, collaborations, or reporting issues!

