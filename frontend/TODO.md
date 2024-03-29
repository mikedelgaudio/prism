# General

- [] Ensure all user input goes thru validString()
- [] Migrate all Firestore code to BE
- [x] Add loading spinner for all async components
- [] Add timeout for all async components
- [] Add error boundaries to additional components
- [] Some components are missing index.ts for Cube, Account, and WeekCard
- [x] Research React Query instead of useEffect
- [] Use React Query site-wide
- [] Creative ways to do skeleton loading for Cards
- [] Migrate all navigation links to share in nav/footer

# Register / Login

- [] Ensure that multiple Prism IDs do not register
- [x] Ensure that if registration fails roll back all changes
- [] Add password strength for registration
- [] Email verification notification should be an observable?
- [x] Delete functionality of Firebase Auth & Firestore
- [x] Consider refactoring how auth store loads using Mobx instead
- [x] Investigate issue when logging out there is insufficent perms errors
- [x] Create password reset for unauth

# Settings

- [x] Ability to read tasks pool from Firebase
- [x] Ability to save side task changes to Firebase
- [x] Ability to delete task change to Firebase
- [x] Ability to modify task name change to Firebase
- [x] Ability to add task to Firebase
- [x] Ability to disconnect Prism from account
- [x] Ability to connect a new Prism to the account after disconnect
- [x] Ability to change account display name

# Dashboard

- [x] Logic to consume API response from Google Sheet / Zapier from cube
- [x] Determine logic in case user changes Task name it should not affect older days. For example, Day A side 1 was: "Read" and Day B side 1 was: "Math". The cube should remember that Day A's side was "Read" rather than "Math.
- [x] Add refresh data button
- [] Refactor / research ways to get real time data of charts per day card
- [] Create a UI design for week over week view with toggle per side
- [x] Research why useEffect cleanup code is returning at loadtime 