# Personal Finance Manager - Full Stack Development Assignment

## Overview
Build a full-stack web application that helps users track their personal expenses, set budgets, and receive alerts when they're approaching or exceeding their spending limits. This project will test your understanding of React, Next.js, Express.js, MongoDB, and JavaScript fundamentals.

**Timeline:** 4 days (25-30 hours)  
**Stack:** Next.js (Frontend) + Express.js (Backend APIs) + MongoDB (Database)

---

## Project Objectives
This assignment is designed to evaluate:
- Your ability to design and implement RESTful APIs
- Full-stack integration skills (Frontend ↔ Backend ↔ Database)
- React component architecture and state management
- Authentication and authorization implementation
- Database schema design and relationships
- Code organization and best practices

---

## Core Features

### 1. User Authentication
Users should be able to:
- Sign up with name, email, and password
- Log in with email and password
- Access only their own data (protected routes)
- Log out from the application

**Requirements:**
- Passwords must be securely stored (never in plain text)
- Implement token-based authentication
- Protected routes should verify user identity
- Frontend should handle authentication state

---

### 2. Expense Management
Users should be able to:
- Add new expenses with the following information:
  - Amount (required)
  - Category (required) - Choose from: Food, Transport, Shopping, Bills, Entertainment, Healthcare, Education, Other
  - Description (optional)
  - Date (required)
- View all their expenses in a list
- Edit existing expenses
- Delete expenses
- Filter expenses by:
  - Category
  - Date range (this week, this month, custom range)
- Search expenses by description

**Requirements:**
- All expenses must be tied to the logged-in user
- Display expenses in a clean, organized manner
- Show loading states during API calls
- Handle errors gracefully with user-friendly messages

---

### 3. Budget Setting and Alerts
Users should be able to:
- Set monthly budget limits for each spending category
- View budget status for each category
- Receive visual alerts based on spending:
  - **Safe** (Green): Spent less than 70% of budget
  - **Warning** (Yellow): Spent 70-100% of budget
  - **Exceeded** (Red): Spent more than 100% of budget

**Requirements:**
- Calculate total spending per category within the current month
- Compare against set budget limits
- Display budget status prominently on the dashboard
- Show remaining budget amount
- Alert users when adding an expense would exceed their budget

**Budget Alert Logic:**
```
If (Total Spent / Budget Limit) < 0.70 → Safe (Green)
If (Total Spent / Budget Limit) >= 0.70 and <= 1.0 → Warning (Yellow)
If (Total Spent / Budget Limit) > 1.0 → Exceeded (Red)
```

---

### 4. Export to CSV
Users should be able to:
- Export their expense data to a CSV file
- Export options:
  - All expenses
  - Filtered expenses (respecting current filters)
  - Custom date range

**CSV Format:**
```
Date, Category, Amount, Description
2024-01-15, Food, 250.50, Grocery shopping
2024-01-16, Transport, 100.00, Metro card
```

**Requirements:**
- Generate downloadable CSV file
- Include proper headers
- Handle special characters in descriptions
- Provide download success feedback

---

### 5. Dashboard
Display an overview showing:
- Total expenses (current month)
- Spending breakdown by category
- Budget status with alerts
- Recent expenses (last 5-10)
- Quick statistics (average daily spending, etc.)

---

## Technical Requirements

### Backend (Express.js + MongoDB)
- Design and implement RESTful API endpoints
- Use MongoDB with Mongoose for data modeling
- Implement authentication middleware
- Handle errors properly with appropriate HTTP status codes
- Validate incoming data
- Structure your code logically (routes, models, middleware, utils)

**Database Design Considerations:**
- Think about what collections you'll need
- Define relationships between collections
- Add appropriate validations
- Consider indexing for frequently queried fields

**API Design Considerations:**
- Follow REST conventions
- Use appropriate HTTP methods (GET, POST, PUT, DELETE)
- Return consistent response structures
- Handle authentication in headers
- Support query parameters for filtering

---

### Frontend (Next.js + React)
- Create a clean, intuitive user interface
- Implement proper component structure
- Use React hooks for state management
- Handle loading and error states
- Implement client-side form validation
- Protect routes that require authentication
- Make efficient API calls

**Component Structure Considerations:**
- Break down UI into reusable components
- Separate concerns (presentation vs logic)
- Use proper prop passing
- Implement conditional rendering

---

### Full-Stack Integration
- Frontend should communicate with backend via API calls
- Store and manage authentication tokens
- Handle unauthorized access appropriately
- Ensure data consistency between frontend and backend
- Implement proper error handling across the stack

---

## Project Structure Suggestions

Consider organizing your project like this:
```
project-root/
├── backend/
│   ├── server.js (entry point)
│   ├── models/ (MongoDB schemas)
│   ├── routes/ (API endpoints)
│   ├── middleware/ (auth, validation, etc.)
│   ├── config/ (database connection)
│   └── utils/ (helper functions)
│
└── frontend/
    ├── pages/ (Next.js pages/routes)
    ├── components/ (React components)
    └── utils/ (API helpers, utilities)
```

---

## Deliverables

### Code
- Well-organized, clean code
- Proper folder structure
- Meaningful variable and function names
- Comments where necessary (not everywhere)

### Documentation
Create a README.md that includes:
- Project description
- Technologies used
- Setup instructions
  - Prerequisites
  - Installation steps
  - Environment variables needed
  - How to run the project
- API documentation (list of endpoints with brief description)
- Any assumptions or decisions you made

### Functionality
- All core features working as described
- No console errors
- Smooth user experience
- Proper error handling

---

## Evaluation Criteria

Your submission will be evaluated on:

1. **Functionality (40%)**
   - All features working correctly
   - Edge cases handled
   - User experience quality

2. **Code Quality (25%)**
   - Clean, readable code
   - Proper structure and organization
   - DRY principle
   - Error handling

3. **Technical Implementation (25%)**
   - API design
   - Database schema
   - Authentication security
   - Frontend-backend integration
   - Component architecture

4. **Problem Solving (10%)**
   - Approach to challenges
   - Design decisions
   - Use of appropriate patterns

---

## Hints & Tips

### Security
- Never store sensitive data in plain text
- Use environment variables for secrets
- Always verify user identity before allowing data access
- Sanitize user inputs

### Database
- Think about what queries you'll need to run frequently
- Use appropriate data types
- Consider using MongoDB aggregation for complex calculations (like budget statistics)

### API Best Practices
- Return appropriate status codes (200, 201, 400, 401, 404, 500)
- Use middleware for repetitive tasks
- Keep route handlers thin (move logic to services/utils)

### Frontend Best Practices
- Create an API utility file for making requests
- Store reusable logic in custom hooks or utilities
- Handle loading states for better UX
- Validate forms before submission

### Testing Your Work
- Test authentication flow thoroughly
- Try to access protected routes without logging in
- Test with empty data, invalid data
- Check if budget alerts update correctly
- Verify CSV export with different filters

---

## Getting Started

1. **Day 1:** Set up project structure, implement authentication
2. **Day 2:** Build expense APIs and budget system
3. **Day 3:** Create frontend components and integrate with backend
4. **Day 4:** Polish UI, test thoroughly, write documentation

---

## Prohibited Actions
- Do not copy-paste entire code from tutorials or GitHub repositories
- Do not use AI to generate entire components without understanding
- Do not hardcode sensitive information (API keys, passwords)
- You may use Stack Overflow, documentation, and references for syntax and concepts

---

## Questions?
If you have clarifying questions about requirements or face blocking issues:
1. First try to debug and research the solution
2. Document your approach and what you've tried
3. Then reach out with specific questions

---

## Submission Guidelines
- Share GitHub repository link OR zip file containing:
  - Complete source code
  - README.md with setup instructions
  - Any additional documentation
- Ensure the project can be run locally by following your README
- Include a .env.example file showing what environment variables are needed

---

## Good Luck!
Remember: We're evaluating your problem-solving approach, code quality, and understanding of full-stack concepts. It's okay if you don't implement every single feature perfectly - focus on demonstrating solid fundamentals and clean code.

**Pro tip:** Commit your code regularly with meaningful commit messages. This shows your development process and thinking.