# Testing Guide

This document explains how to test the DocMagic application using `npm test` and other testing commands.

## Prerequisites

Make sure you have all dependencies installed:

```bash
npm install
```

## Available Test Commands

### Basic Testing

```bash
# Run tests once
npm test

# Run tests in watch mode (recommended for development)
npm run test:watch

# Run tests once and exit
npm run test:run

# Run tests with coverage report
npm run test:coverage

# Run tests with UI (interactive)
npm run test:ui
```

### What Each Command Does

- `npm test` - Runs Vitest in watch mode by default
- `npm run test:watch` - Runs tests in watch mode, automatically re-running when files change
- `npm run test:run` - Runs tests once and exits (useful for CI/CD)
- `npm run test:coverage` - Runs tests and generates coverage reports
- `npm run test:ui` - Opens Vitest UI for interactive testing

## Test Structure

Tests are organized in the `__tests__` directory:

```
__tests__/
├── components/          # Component tests
│   └── Button.test.tsx
└── utils.test.ts       # Utility function tests
```

## Writing Tests

### Component Tests

Use React Testing Library for component tests:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '../../components/ui/button'

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })
})
```

### Utility Tests

For utility functions, import and test directly:

```tsx
import { describe, it, expect } from 'vitest'
import { cn } from '../lib/utils'

describe('Utility Functions', () => {
  it('combines class names correctly', () => {
    const result = cn('class1', 'class2')
    expect(result).toBe('class1 class2')
  })
})
```

## Test Configuration

The test configuration is in `vitest.config.ts`:

- Uses `jsdom` environment for DOM testing
- Includes coverage reporting
- Excludes build artifacts and config files
- Supports TypeScript and JSX

## Coverage Reports

When running `npm run test:coverage`, coverage reports are generated in:

- `coverage/` directory
- HTML report: `coverage/index.html`
- LCOV report: `coverage/lcov.info`

## CI/CD Integration

Tests are automatically run in GitHub Actions:

1. **Dependency Check Workflow** (`.github/workflows/dependency_check.yml`)
   - Runs on schedule and PRs
   - Checks for outdated dependencies
   - Runs security audits
   - Executes tests

2. **Test Suite Workflow** (`.github/workflows/test.yml`)
   - Runs on push and PRs
   - Tests on multiple Node.js versions
   - Generates coverage reports
   - Uploads coverage to Codecov

## Troubleshooting

### No Tests Found

If you see "No test files found", ensure:

1. Test files end with `.test.ts`, `.test.tsx`, `.spec.ts`, or `.spec.tsx`
2. Test files are in the `__tests__` directory or alongside source files
3. Test files are not excluded by the configuration

### Test Failures

Common issues and solutions:

1. **Import errors**: Check that all dependencies are installed
2. **DOM errors**: Ensure `jsdom` is properly configured
3. **Mock errors**: Verify that mocks are set up correctly in `vitest.setup.ts`

### Performance Issues

For large test suites:

1. Use `npm run test:run` instead of watch mode
2. Run specific test files: `npm test Button.test.tsx`
3. Use `--reporter=verbose` for detailed output

## Best Practices

1. **Write descriptive test names** that explain what is being tested
2. **Test behavior, not implementation** - focus on what the component does, not how it does it
3. **Use data-testid sparingly** - prefer semantic queries like `getByRole`
4. **Keep tests simple** - each test should test one thing
5. **Use setup and teardown** for common test requirements
6. **Mock external dependencies** to isolate the code being tested

## Dependabot Integration

Dependabot is configured to:

- Check for updates weekly
- Create PRs for dependency updates
- Run tests automatically on PRs
- Group related updates together
- Ignore major version updates for critical packages

The workflow ensures that dependency updates don't break the build or tests. 