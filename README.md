# Social Support App

## Overview

This is a multi-step form wizard for a government social support portal, allowing citizens to apply for financial assistance with smart AI help. The app is built with React, Vite, Redux Toolkit, Tailwind CSS, and integrates OpenAI GPT for writing assistance.

---

## Design Patterns and Architecture

This project follows a modular, component-based architecture that promotes separation of concerns and reusability.

- **Component-Based Architecture**: The UI is built with React, following a component-based approach. Components are organized into two main categories: page components and shared components. Page components are responsible for rendering the main content of each step in the application, while shared components are reusable UI elements that can be used across multiple pages.

- **State Management**: The app uses Redux Toolkit for state management, which provides a centralized store for the application's state. This makes it easy to manage the state of the multi-step form and persist it across page reloads. The use of Redux also helps to decouple the application's state from the UI, making it easier to test and maintain.

- **API Factory Pattern**: The app uses an API Factory pattern to create a reusable API client with Axios. This pattern allows for a centralized configuration of the API client, including the base URL, timeout, and interceptors. This makes it easy to handle API requests and responses in a consistent and predictable way.

- **Modular Design**: The project is organized into modules, with each module responsible for a specific feature or functionality. This makes it easy to navigate the codebase and understand the different parts of the application. The use of modules also helps to reduce the bundle size of the application by allowing for code-splitting and lazy loading.

---

## Architecture

## Project Structure

```text
social-support-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── ErrorBoundary.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── progress.tsx
│   │       ├── select.tsx
│   │       └── textarea.tsx
│   ├── i18n/
│   │   ├── index.ts
│   │   └── locales/
│   │       ├── ar.json
│   │       └── en.json
│   ├── lib/
│   │   ├── apiFactory.ts
│   │   ├── schema.ts
│   │   ├── utils.ts
│   │   └── schema/
│   │       └── index.ts
│   ├── pages/
│   │   ├── FamilyFinancialInfo.tsx
│   │   ├── PersonalInfo.tsx
│   │   └── SituationDescription.tsx
│   ├── services/
│   │   └── openaiService.ts
│   ├── store/
│   │   ├── store.ts
│   │   └── slices/
│   │       ├── familyFinancialInfoSlice.ts
│   │       ├── familyFinancialSlice.ts
│   │       ├── personalInfoSlice.ts
│   │       └── situationDescriptionSlice.ts
│   ├── validation/
│   │   └── schemas.ts
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── babel.config.js
├── biome.json
├── components.json
├── index.html
├── jest.config.js
├── package.json
├── pnpm-lock.yaml
├── project.md
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Tree-shaking & Modular Design

- The app uses Vite for fast builds and automatic tree-shaking, ensuring only used code is included in the final bundle.
- Code is organized by feature and responsibility, making it easy to import only what you need.
- UI components are split into reusable modules for optimal bundle size.

---

## Scaffolding

```

src/
 components/         # Layout, Header, UI elements
 pages/              # Step pages: PersonalInfo, FamilyFinancialInfo, SituationDescription
 store/              # Redux store & slices
 services/           # openaiService.ts (API integration)
 i18n/               # i18n config & translations
 validation/         # Zod schemas
 lib/                # Utilities, API factory
public/               # Static assets

```

---

## Multilingual Support

This project supports multiple languages using the `react-i18next` library. The translation files are located in the `src/i18n/locales` directory, with each language having its own JSON file.

To add a new language, you need to create a new JSON file in the `src/i18n/locales` directory with the language code as the filename (e.g., `fr.json` for French). You can then add the translations for the new language to this file, following the same structure as the existing translation files.

---

## Testing

This project uses Jest and React Testing Library for testing. The tests are located in the `src` directory, with each component having its own test file.

### Running Tests

To run all tests:

```bash
pnpm test
```

To run tests in watch mode:

```bash
pnpm test:watch
```

To run tests with coverage report:

```bash
pnpm test:coverage
```

### Code Coverage

The project maintains comprehensive test coverage for critical components and services. The coverage report is generated in the `coverage` directory after running tests with coverage.

#### Current Coverage Status

- **Overall Coverage**: ~57% statement coverage
- **Key Areas with High Coverage**:
  - `FamilyFinancialInfo.tsx`: 100% coverage
  - `PersonalInfo.tsx`: 95.45% coverage
  - `openaiService.ts`: 100% coverage
  - `App.tsx`: 100% coverage
  - `Layout.tsx`: 100% coverage

#### Viewing Coverage Reports

After running tests with coverage, you can:

1. View the terminal output for a summary
2. Open `coverage/lcov-report/index.html` in a browser for an interactive HTML report
3. Check `coverage/lcov.info` for detailed line-by-line coverage data

#### Test Structure

Tests are organized alongside their components:

```
src/
├── pages/
│   ├── PersonalInfo.tsx
│   ├── PersonalInfo.test.tsx
│   ├── FamilyFinancialInfo.tsx
│   └── FamilyFinancialInfo.test.tsx
├── components/
│   ├── Layout.tsx
│   ├── Layout.test.tsx
│   ├── Header.tsx
│   └── Header.test.tsx
├── services/
│   ├── openaiService.ts
│   └── openaiService.test.ts
```

#### Testing Best Practices

- Tests focus on user interactions and behavior
- Mock external dependencies (API calls, routing, etc.)
- Use React Testing Library queries for accessible testing
- Maintain test isolation - each test should be independent
- Test both success and error scenarios

---

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure OpenAI API Key

Create a `.env` file in the project root:

```env
VITE_OPENAI_API_KEY="your-openai-api-key"
```

You can get your API key from [OpenAI dashboard](https://platform.openai.com/api-keys). The app uses this key to generate AI suggestions in Step 3.

### 3. Run the app

```bash
pnpm dev
```

App will be available at `http://localhost:3000` (default Vite port).

---

## Usage

1. Fill out each step of the form. Progress is shown at the top.
2. In Step 3, use the "Help Me Write" button for AI-generated suggestions.
3. Data is saved in Redux and persists across refreshes.
4. Switch language using the top-right menu (English/Arabic).

---

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key for GPT integration.

---

## Tech Stack

- React + Vite
- Redux Toolkit + redux-persist
- Tailwind CSS + MUI
- React Hook Form + Zod
- Axios (API calls)
- React-i18next (i18n)

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a PR

---

## License

MIT
