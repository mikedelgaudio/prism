# General

- [] Create banner if API offline
- [] Ensure all user input goes thru validString()
- [] Add loading spinner for all async components
- [] Add timeout for all async components
- [] Modify navigation bar to support account dropdown rather than logout button
- [] Add error boundaries to additional components
- [] Some components are missing index.ts for Cube, Account, and WeekCard
- [x] Research React Query instead of useEffect

# Register / Login

- [] Ensure that multiple Prism IDs do not register
- [x] Ensure that if registration fails roll back all changes
- [] Add password strength for registration
- [] Email verification notification should be an observable?
- [x] Delete functionality of Firebase Auth & Firestore
- [] Determine how to handle loading before transition to dashboard

# Settings

- [x] Ability to read tasks pool from Firebase
- [x] Ability to save side task changes to Firebase
- [x] Ability to delete task change to Firebase
- [x] Ability to modify task name change to Firebase
- [x] Ability to add task to Firebase
- [x] Ability to disconnect Prism from account
- [x] Ability to connect a new Prism to the account after disconnect
- [] Ability to change account display name
- [] Creative ways to do skeleton loading for Cards

# Dashboard

- [] Logic to consume API response from Google Sheet / Zapio from cube
- [] Determine logic in case user changes Task name it should not affect older days. For example, Day A side 1 was: "Read" and Day B side 1 was: "Math". The cube should remember that Day A's side was "Read" rather than "Math.
- [] Creative ways to do skeleton loading for Cards
