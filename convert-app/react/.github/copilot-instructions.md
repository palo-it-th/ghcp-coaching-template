# Development Guidelines

## UI Component Requirements
- Use Material-UI (MUI) v5 or later for all UI components
- Follow MUI's theme system for consistent styling
- Ensure all components are responsive and mobile-friendly
- Use MUI's Grid system for layouts

## Form Handling
- Implement forms using React Hook Form library
- Required validation rules:
  - Text fields: Minimum/maximum length
  - Email fields: Valid email format
  - Number fields: Min/max values
  - Password fields: Minimum 8 characters, include numbers and special characters
- Display validation errors using MUI's error states

## API Integration
- Use Axios for all HTTP requests
- Implementation requirements:
  - Configure base URL in environment variables
  - Implement request/response interceptors
  - Handle API errors globally
  - Add request timeout (default: 5000ms)

## State Management
- Use React Context for global state
- Implement proper loading states
- Handle error states consistently

## Code Style
- Use TypeScript for type safety
- Follow functional component patterns
- Implement proper error boundaries
- Use proper naming conventions:
  - Components: PascalCase
  - Functions: camelCase
  - Constants: UPPER_SNAKE_CASE

## Testing Requirements
- Write unit tests for utility functions
- Write integration tests for forms
- Test error handling scenarios