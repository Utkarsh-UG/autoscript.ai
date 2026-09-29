git # AutoScript AI

AutoScript AI is an AI-powered test automation platform designed to help QA engineers and developers generate, execute, and analyze automated tests for websites using natural-language prompts.

Tagline: Generate. Execute. Analyze.

## Project Goal

The platform allows users to provide a website URL and a test scenario in natural language, then dynamically inspect the application, identify UI elements, and either:

- generate an automation script, or
- execute the test directly in a browser.

## Core Features

### 1. AI Script Generator
- Accepts website URL, scenario, framework, language, and optional configuration
- Supports initial target stack:
  - Selenium + Java
  - Playwright + Java
  - Playwright + TypeScript
  - Cucumber BDD + Java
  - TestNG
  - JUnit
  - Page Object Model
- Generates code, copies it, and supports file-level downloads

### 2. AI Test Runner
- Accepts URL, scenario, browser, iterations, headed/headless mode, screenshot settings, and AI analysis options
- Uses dynamic inspection of the live page rather than hardcoded selectors
- Executes step-by-step automation based on the current page state

### 3. Test Management
- Stores projects, scripts, scenarios, execution records, results, screenshots, logs, and reports

### 4. Reporting
- Generates execution summaries with pass/fail rates, screenshots, logs, iteration-level results, and failure analysis

### 5. Dashboard
- Overview of scripts generated
- Execution metrics
- pass/fail rates
- recent activity and reports

## Tech Stack

### Backend
- Java 21
- Spring Boot
- Maven
- Spring Web
- Spring Validation
- Lombok
- Spring Boot DevTools

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- React Icons
- Monaco Editor

### Database
- PostgreSQL

### AI Providers
- Designed for abstraction through an AI provider interface
- Intended support for providers such as:
  - Gemini
  - Groq
  - OpenRouter
  - Ollama / local LLMs

### Browser Automation
- Playwright as the primary execution engine
- Selenium as a generated-script target initially

## Architecture

The project is intended to remain modular and provider-agnostic.

Suggested package structure:

```text
com.autoscriptai
├── config
├── controller
├── service
├── dto
├── model
├── repository
├── exception
├── ai
├── automation
├── script
├── report
├── project
├── security
└── util
```

## Current Development Status

We are currently in Sprint 1.

### Achieved so far
- Spring Boot backend foundation initialized
- Backend health endpoint created: `GET /api/health`
- Health endpoint returns JSON status data
- Frontend scaffolded with React + TypeScript + Vite
- Initial dashboard implemented
- Dashboard connected to backend health endpoint
- Local frontend/backend integration configured via Vite proxy

### Future sprint focus
- AI script generation for test cases
- Playwright-based execution engine
- Test management persistence
- Rich reporting and historical execution views
- Authentication and user-facing project management

## Repository Structure

```text
autoscript.ai/
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── mvnw
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── docs/
├── .gitignore
├── README.md
└── .github/
```

## Backend Setup

From the `backend` directory:

```bash
./mvnw spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

Health endpoint:

```text
http://localhost:8080/api/health
```

Example response:

```json
{
  "status": "UP",
  "service": "autoscript-ai-backend",
  "timestamp": "2026-09-29T20:51:24.036909700Z"
}
```

## Frontend Setup

From the `frontend` directory:

```bash
npm install
npm run dev
```

The app runs locally via Vite and proxies `/api` requests to the Spring Boot backend.

## Development Approach

The project follows a feature-by-feature approach:

1. Define requirements
2. Design API contracts
3. Implement backend
4. Implement frontend
5. Connect frontend to backend
6. Validate end-to-end
7. Commit feature changes
8. Move to the next feature

## Notes

This project is being built as a serious portfolio-grade application with emphasis on:

- clean architecture
- maintainability
- security-minded design
- separation of concerns
- testability
- readable, production-quality code

## License

This project is currently under active development and does not yet declare a formal production license.
