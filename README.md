# demoqa-bdd

A BDD test automation framework built with **Playwright + Cucumber.js**, following **Page Object Model** for UI and **API Object Model** for REST API testing.

---

## Tech Stack

- [Playwright](https://playwright.dev/) — Browser automation & API testing
- [Cucumber.js](https://cucumber.io/) — BDD test runner (Gherkin)
- [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter) — HTML reporting
- `dotenv` — Environment management
- `cross-env` — Cross-platform env variables
- `ts-node` + `typescript` — TypeScript support for env loading

---

## Project Structure

```
src/
├── modules/                        ← Test modules (feature + steps co-located)
│   ├── bookstore/
│   │   ├── features/
│   │   │   └── bookstore.feature   ← Gherkin scenarios (Given/When/Then)
│   │   └── stepDefinitions/
│   │       └── bookstore.js        ← Step definitions for BookStore UI
│   └── user/
│       ├── features/
│       │   └── user.feature        ← Gherkin scenarios for User API
│       └── stepDefinitions/
│           └── user.js             ← Step definitions for User API
│
├── pageObjects/                    ← UI Page Object Model
│   ├── loginPage.js                ← Login page locators & actions
│   └── bookStorePage.js            ← Book Store page locators & actions
│
├── utils/                          ← Reusable utilities
│   ├── hooks.js                    ← Before/After hooks, browser & API setup
│   ├── apiHelper.js                ← Generic HTTP client (GET/POST/PUT/DELETE)
│   ├── reqresClient.js             ← API Object Model for reqres.in
│   ├── commonUtility.js            ← Reusable UI helpers (click, fill, getText)
│   ├── assert.js                   ← Custom assertion wrapper
│   ├── browser.js                  ← Browser launcher
│   └── fixture.js                  ← Shared state across steps
│
├── helpers/
│   └── fileHelper.js               ← Writes book details to file
│
└── env/
    ├── .env.demoqa                 ← Environment config & credentials (gitignored)
    └── env.ts                      ← Loads env variables via dotenv
```

---

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/ishaanprajapati/demoqa-bdd-framework.git
cd demoqa-bdd-framework

# 2. Install dependencies
npm install

# 3. Create environment file
# Create src/env/.env.demoqa with the following keys:
```

```
BASEURL=https://demoqa.com
API_BASEURL=https://reqres.in
BROWSER=chrome
APP_USERNAME=your_demoqa_username
PASSWORD=your_demoqa_password
ENV=demoqa
API_KEY=your_reqres_api_key
NEW_USER_NAME=John Doe
NEW_USER_JOB=QA Engineer
UPDATED_USER_NAME=John Senior QA
```

---

## Running Tests

```bash
# Run UI tests (BookStore) — tag: @BookStoreApplication
npm run test:bookstore

# Run API tests (User CRUD) — tag: @CreateGetUpdateUser
npm run test:api

# Run all tests
npm test

# Generate HTML report (run after any test)
npm run report
```

---

## What's Covered

### UI Tests — demoqa.com BookStore

**Scenario 1 — Open book and verify details** (`@BookStoreSearchAndVerifySpecificBookDetails`)
- Login with credentials
- Navigate to Book Store
- Search for a book by title (3 books via Examples table)
- Validate search result contains the book
- Open the book detail page
- Verify Title, Author and Publisher on the detail page
- Save book details to `test-results/book-details.txt`
- Logout

**Scenario 2 — Verify details in search results table** (`@BookStoreSearchAndVerifySearchBookDetails`)
- Login with credentials
- Navigate to Book Store
- Search for a book by title (3 books via Examples table)
- Validate search result contains the book
- Fetch Title, Author and Publisher directly from the search results table
- Save book details to `test-results/book-details.txt`
- Logout

### API Tests — reqres.in (Collections)
| Step | Method | Endpoint |
|------|--------|----------|
| Create a new user | `POST` | `/api/collections/users/records` |
| Get the created user | `GET` | `/api/collections/users/records/{id}` |
| Update the user name | `PUT` | `/api/collections/users/records/{id}` |

Every API call logs and attaches full request/response info to the HTML report:
```
=================================== API Info ===================================
Request Method   : POST
Request Endpoint : https://reqres.in/api/collections/users/records
Request Body     : { "data": { "name": "...", "job": "..." } }
Status Code      : 201
Response Body    : { ... }
================================================================================
```
