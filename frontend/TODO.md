# General

- [] Create banner if API offline
- [] Ensure all user input goes thru validString()
- [] Add loading spinner for all async components
- [] Add timeout for all async components
- [] Modify navigation bar to support account dropdown rather than logout button
- [] Add error boundaries to additional components
- [] Some components are missing index.ts for Cube, Account, and WeekCard
- [] Research React Query instead of useEffect

# Register / Login

- [] Ensure that multiple Prism IDs do not register
- [] Ensure that if registration fails roll back all changes
- [] Add password strength for registration
- [] Email verification notification should be an observable?
- [x] Delete functionality of Firebase Auth & Firestore

# Settings

- [x] Ability to read tasks pool from Firebase
- [x] Ability to save side task changes to Firebase
- [x] Ability to delete task change to Firebase
- [x] Ability to modify task name change to Firebase
- [x] Ability to add task to Firebase
- [x] Ability to disconnect Prism from account
- [] Ability to connect a new Prism to the account after disconnect
- [] Ability to change account display name

# Dashboard

- [] Logic to consume API response from Google Sheet / Zapio from cube
