# TODO

## General

- [x] Configure ESLint
- [x] Updated configuration for Firebase auth middleware
- [x] Create an MVP route to pull entire sheet data with no logic but calculations and throwing to UI (will be slow but functional)
- [] Create an optimized route to pull last entry since last calculated by timestamp in Firestore
- [] Ensure all POST routes validate / sanitize input
- [] Ensure every response to FE has proper status code and status message in JSON as 'OK' or 'FAIL'

## Dashboards

The `/dashboards` route

### Migrate the following functionality from frontend:
- [] 

## Settings

The `/settings` route

### Tasks
- [] GET /settings/tasks (infer id from token)
- [] POST /settings/tasks/add
- [] PATCH /settings/tasks/edit
- [] DELETE /settings/tasks/{id}
- [] PUT /settings/tasks/assign

### Profile
- [] GET /profile (infer id from token)
- [] POST /profile/unauth-reset
- [] PATCH /profile/disconnect
- [] PATCH /profile/connect
- [] DELETE /profile (infer id from token)