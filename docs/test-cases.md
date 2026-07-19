# Use cases and test cases

How to try the portfolio and confirm each part works. Live site: https://monideep-portfolio.netlify.app

## Contents

- [Use cases](#use-cases)
- [Test cases for anyone](#test-cases-for-anyone)
- [Test cases for the owner](#test-cases-for-the-owner)
- [Reference: API](#reference-api)

## Use cases

- A visitor browses the projects and opens a project's live or GitHub link.
- A visitor sends a message through the contact form.
- The owner logs in to add, edit, or remove a project.
- The owner checks page-view analytics.

## Test cases for anyone

You only need a web browser.

### TC1: Browse projects

1. Open https://monideep-portfolio.netlify.app
2. Go to the projects section.

Expected: the project cards load (they come from the database, not hardcoded).

### TC2: Recent projects via the API

```bash
curl -s https://monideep-portfolio.netlify.app/api/projects | head -c 400
```

Expected: a JSON array of projects with `title`, `description`, `githubUrl`, `liveUrl`.

### TC3: Send a contact message

1. Open the contact form on the site.
2. Enter a name, email, and message, then submit.

Expected: a success confirmation. The message is saved and emailed to the owner. Via the API:

```bash
curl -s -X POST https://monideep-portfolio.netlify.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

Expected: the saved message as JSON with an `id`.

### TC4: Admin routes are protected

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST https://monideep-portfolio.netlify.app/api/projects \
  -H "Content-Type: application/json" -d '{"title":"x","description":"y"}'
```

Expected: `401` (creating a project without logging in is rejected).

## Test cases for the owner

Needs the admin username and password (Netlify environment variables).

### TC5: Log in and manage a project

1. Go to the admin login and sign in.
2. Create a new project, confirm it appears on the public projects page.
3. Edit it, confirm the change shows.
4. Delete it, confirm it disappears.

Command-line version (keeps the session cookie in a jar):

```bash
JAR=$(mktemp)
# log in
curl -s -c "$JAR" -X POST https://monideep-portfolio.netlify.app/api/auth/login \
  -H "Content-Type: application/json" -d '{"username":"YOUR_USER","password":"YOUR_PASS"}'
# should show authenticated
curl -s -b "$JAR" https://monideep-portfolio.netlify.app/api/auth/status
# create a project
curl -s -b "$JAR" -X POST https://monideep-portfolio.netlify.app/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"temp","featured":false,"status":"published"}'
```

Expected: login returns `{"success":true}`, status returns `{"isAuthenticated":true}`, create returns the new project with an `id`.

### TC6: View analytics

Logged in, open the analytics view (or `GET /api/analytics` with the session cookie).

Expected: a list of recorded page-view events.

## Reference: API

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/projects` | public | List projects |
| GET | `/api/projects/featured` | public | Featured projects |
| GET | `/api/projects/:id` | public | One project |
| POST | `/api/contact` | public | Save + email a contact message |
| POST | `/api/analytics` | public | Record a page view |
| POST | `/api/auth/login` | public | Admin login |
| GET | `/api/auth/status` | public | Session status |
| POST | `/api/auth/logout` | public | Log out |
| POST | `/api/projects` | admin | Create a project |
| PATCH | `/api/projects/:id` | admin | Update a project |
| DELETE | `/api/projects/:id` | admin | Delete a project |
| GET | `/api/analytics` | admin | View analytics |
