# Mobile Application Project Structure

## Project Structure Overview

```
mobile-application/
├── src/
│   ├── screens/                 # Screen components
│   │   ├── auth/               # Authentication screens (Login, Signup, etc.)
│   │   └── core/               # Core feature screens
│   ├── components/             # Reusable components
│   │   └── common/             # Common UI components
│   ├── services/               # Business logic and API integration
│   │   ├── api/                # API client and requests
│   │   ├── auth/               # Authentication services
│   │   └── notifications/      # Push/Local notifications service
│   ├── store/                  # State management (Zustand)
│   │   ├── authStore.js        # Authentication state
│   │   └── index.js            # Root store
│   ├── navigation/             # Navigation setup (React Navigation)
│   ├── viewmodels/             # ViewModels (MVVM pattern)
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Utility functions
│   ├── constants/              # App constants
│   └── assets/                 # Images, fonts, etc.
│       ├── images/
│       └── fonts/
├── tests/                      # Testing
│   ├── unit/                   # Unit tests
│   ├── integration/            # Integration tests
│   └── setup.js                # Test setup
├── config/                     # Configuration files
├── App.js                      # Root component
├── index.js                    # Entry point
├── app.json                    # App metadata
├── package.json                # Dependencies
├── .babelrc                    # Babel configuration
├── .eslintrc.json             # ESLint configuration
├── jest.config.js             # Jest testing configuration
├── .gitignore                 # Git ignore rules
├── .env.example               # Environment variables template
└── README.md                  # Project documentation
```

## Clean Architecture Pattern (MVVM)

- **Views**: Screen components in `src/screens/`
- **ViewModels**: Logic layer in `src/viewmodels/`
- **Models**: Store state in `src/store/`
- **Services**: Business logic and API integration in `src/services/`

## Next Steps

Ready to implement core features:
1. User Authentication Module
2. Core Feature Set (3+ modules)
3. API Integration
4. Notifications Service
5. Testing
