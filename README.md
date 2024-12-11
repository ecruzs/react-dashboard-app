# React Dashboard Application

A modern, responsive dashboard application built with React, TypeScript, and Vite. This application demonstrates best practices in React development, including state management, form handling, data visualization, and responsive design.

## 🚀 Features

- **Data Management**
  - Local state management using React Context API
  - Real-time filtering and sorting capabilities
  - CRUD operations for items

- **Interactive Dashboard**
  - Data visualization using Recharts
  - Bar chart showing value distribution by category
  - Pie chart displaying item status distribution
  - Responsive data table with sorting functionality

- **Responsive Design**
  - Mobile-first approach using Tailwind CSS
  - Adaptive layouts for different screen sizes
  - Consistent UI across devices

- **Form Handling**
  - Form validation using Zod and React Hook Form
  - Real-time error feedback
  - Type-safe form submissions

- **Navigation**
  - React Router integration
  - Three main routes:
    - Dashboard: Overview and statistics
    - Details: Individual item information
    - Add Item: New item creation form

## 🏗️ Project Architecture

The project follows a combination of Clean Architecture principles with a Feature-based organization.

### Key Architectural Decisions

1. **Clean Architecture Principles**
   - Clear separation of concerns
   - Domain-driven design approach
   - Independent feature modules
   - Core business logic isolation

2. **Feature-based Organization**
   - Features are self-contained
   - Each feature has its own components
   - Reduced coupling between features
   - Easier to maintain and scale

3. **State Management Strategy**
   - Global state using Context API
   - Feature-specific state when needed
   - Custom hooks for state access
   - Centralized actions and reducers

## 🛠️ Technologies

- React 18.3
- TypeScript 5.6
- Vite 6.0
- Tailwind CSS 3.4
- React Router DOM 7.0
- React Hook Form 7.54
- Zod 3.23
- Recharts 2.14
- Lucide React (for icons)

## 🛠️ System Requirements
- Node.js >= 18.0.0
- npm >= 9.0.0

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/ecruzs/react-dashboard-app.git
cd react-dashboard-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Vitest

## 🧪 Testing

The application includes unit tests using Vitest and React Testing Library, focusing on:
- Component rendering
- User interactions
- Form validation
- State management
- Data filtering and sorting

To run tests:
```bash
npm run test
```

## 📱 Responsive Design

The application is fully responsive and tested across:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktops (1024px and up)
- Large screens (1280px and up)

## 👤 Author

Esteban Cruz

ecruz.icc@gmail.com