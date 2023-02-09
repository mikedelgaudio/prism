# TODO

## General

[x] Configure ESLint
[x] Updated configuration for Firebase auth middleware
[x] Create an MVP route to pull entire sheet data with no logic but calculations and throwing to UI (will be slow but functional)
[x] Ensure all POST routes validate / sanitize input
[] Ensure every response to FE has proper status code and status message in JSON as 'OK' or 'FAIL'
[] Allow Sheets API to wipe after successful upload to Firestore

## Dashboards

The `/dashboards` route

### Migrate the following functionality from frontend:
- [] GET /dashboards/days

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