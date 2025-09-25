# Social Support App Flow Diagram

## Application Flow

```mermaid
graph TD
    Start([Start]) --> Root[Root Path /]
    Root --> AutoRedirect[Auto-redirect to /step1]
    AutoRedirect --> PersonalInfo[Personal Information Form]

    PersonalInfo --> ValidatePersonal{Validate with Zod Schema}
    ValidatePersonal -->|Invalid| ShowErrors[Display Validation Errors]
    ShowErrors --> PersonalInfo
    ValidatePersonal -->|Valid| SavePersonal[Save to Redux Store + Persist]
    SavePersonal --> NavigateFamily[Navigate to /step2]
    NavigateFamily --> FamilyFinancial[Family & Financial Form]

    FamilyFinancial --> ValidateFamily{Validate with Zod Schema}
    ValidateFamily -->|Invalid| ShowFamilyErrors[Display Validation Errors]
    ShowFamilyErrors --> FamilyFinancial
    ValidateFamily -->|Valid| SaveFamily[Save to Redux Store + Persist]
    SaveFamily --> NavigateSituation[Navigate to /step3]
    NavigateSituation --> SituationDesc[Situation Description]

    SituationDesc --> AIHelp{Click 'Help Me Write'?}
    AIHelp -->|Yes| OpenAIAPI[Call OpenAI GPT-3.5]
    OpenAIAPI --> HandleAPIResponse{API Response}
    HandleAPIResponse -->|Success| DisplaySuggestion[Display AI Suggestion]
    HandleAPIResponse -->|Error| ShowAPIError[Show Error Toast]
    ShowAPIError --> SituationDesc

    DisplaySuggestion --> UserAction{User Action}
    UserAction -->|Accept| FillField[Fill Form Field]
    UserAction -->|Regenerate| OpenAIAPI
    UserAction -->|Cancel| SituationDesc
    FillField --> SituationDesc

    AIHelp -->|No| ValidateSituation{Validate with Zod Schema}
    ValidateSituation -->|Invalid| ShowSituationErrors[Display Validation Errors]
    ShowSituationErrors --> SituationDesc
    ValidateSituation -->|Valid| SaveSituation[Save to Redux Store + Persist]
    SaveSituation --> SubmitForm[Submit Form]
    SubmitForm --> ShowToast[Show Success Toast]
    ShowToast --> ResetForm{Reset All Forms?}
    ResetForm -->|Yes| ClearRedux[Dispatch resetAllForms]
    ClearRedux --> Root
    ResetForm -->|No| End([Stay on Page])
```

## Data Flow

```mermaid
graph LR
    Forms[Form Components] --> ReactHookForm[React Hook Form]
    ReactHookForm --> ZodValidation[Zod Schema Validation]
    ZodValidation --> ReduxActions[Redux Actions]

    ReduxActions --> Slices[Redux Slices]
    Slices --> ReduxStore[(Redux Store)]
    ReduxStore --> ReduxPersist[Redux Persist]
    ReduxPersist --> LocalStorage[(localStorage)]

    ReduxStore --> UIComponents[UI Components]
    UIComponents --> CompletionStats[Completion Stats Component]
    UIComponents --> Stepper[Progress Stepper]
    UIComponents --> FormPrefill[Form Field Prefill]
```

## Component Architecture

```mermaid
graph TD
    Root[main.tsx] --> StrictMode[React.StrictMode]
    StrictMode --> ErrorBoundary[ErrorBoundary Component]
    ErrorBoundary --> Provider[Redux Provider]
    Provider --> PersistGate[Redux PersistGate]
    PersistGate --> BrowserRouter[React Router BrowserRouter]
    BrowserRouter --> App[App Component]

    App --> Toaster[Sonner Toaster]
    App --> Layout[Layout Component]

    Layout --> Header[Header Component]
    Header --> LanguageSwitcher[Language Switcher]
    Header --> ThemeToggle[Theme Toggle]

    Layout --> MuiTheme[MUI ThemeProvider]
    MuiTheme --> Stepper[MUI Stepper - 3 Steps]
    MuiTheme --> Container[MUI Container]
    Container --> AppRouter[AppRouter Component]

    AppRouter --> Routes{React Router Routes}
    Routes --> Step1[/step1: PersonalInfo]
    Routes --> Step2[/step2: FamilyFinancialInfo]
    Routes --> Step3[/step3: SituationDescription]
    Routes --> ErrorPages[Error Pages]

    ErrorPages --> NotFound[404 NotFound]
    ErrorPages --> Unauthorized[401 Unauthorized]
    ErrorPages --> Forbidden[403 Forbidden]
    ErrorPages --> ServerError[500 ServerError]

    Step1 --> PersonalForm[React Hook Form + Zod]
    Step2 --> FamilyForm[React Hook Form + Zod]
    Step3 --> SituationForm[React Hook Form + Zod + AI]

    SituationForm --> OpenAIService[OpenAI Service]
    OpenAIService --> APIFactory[API Factory with Axios]
```

## Navigation Flow

```mermaid
stateDiagram-v2
    [*] --> Root: User visits /
    Root --> Step1: Auto-redirect to /step1

    Step1 --> Step2: Click Next (valid form)
    Step1 --> Step1: Validation Error

    Step2 --> Step1: Click Back
    Step2 --> Step3: Click Next (valid form)
    Step2 --> Step2: Validation Error

    Step3 --> Step2: Click Back
    Step3 --> Success: Submit (valid form)
    Step3 --> Step3: Validation Error
    Step3 --> Step3: AI Help Dialog

    Success --> Reset: Click Reset
    Reset --> Step1: Clear all data
    Success --> [*]: Close/Exit

    note right of Step1
        Personal Information:
        - Name, National ID
        - Date of Birth
        - Phone, Address
    end note

    note right of Step2
        Family & Financial:
        - Marital Status
        - Income, Expenses
        - Dependents
    end note

    note right of Step3
        Situation Description:
        - Current Situation
        - Reason for Request
        - AI Writing Assistant
    end note
```


## Internationalization (i18n) Flow

```mermaid
graph LR
    User[User] --> LanguageSelector[Language Selector in Header]
    LanguageSelector --> i18next[i18next Library]

    i18next --> Detection{Language Detection}
    Detection --> LocalStorage[Check localStorage]
    Detection --> Navigator[Check Browser Language]
    Detection --> Default[Fallback to English]

    i18next --> LoadTranslations[Load Translation Files]
    LoadTranslations --> EnglishJSON[en/translation.json]
    LoadTranslations --> ArabicJSON[ar/translation.json]

    i18next --> UpdateDOM[Update DOM]
    UpdateDOM --> Direction[Set dir='rtl' or 'ltr']
    UpdateDOM --> Lang[Set lang attribute]
    UpdateDOM --> Font[Update Font Family]

    i18next --> Components[React Components]
    Components --> useTranslation[useTranslation Hook]
    useTranslation --> TranslatedText[Display Translated Text]
```
