# ⚔️ React Advanced Lab 5 - RPG Theme

An immersive, animated RPG-themed React application demonstrating advanced React concepts including state management, performance optimization, design patterns, and testing strategies.

![React](https://img.shields.io/badge/React-18.2-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎮 Features

### Visual Effects
- **Custom Cursor** - Animated golden cursor with particle trails
- **Particle System** - Floating embers, sparkles, and magical orbs
- **Torch Light Effect** - Dynamic lighting that follows your cursor
- **Ambient Background** - Layered gradients, fog, and subtle animations

### Part 1: Complex State Management

#### Exercise 1.1: The Fetch Machine (useReducer)
- Finite State Machine pattern implementation
- Valid state transitions: `idle → loading → resolved/rejected`
- Prevents impossible states (e.g., loading + error simultaneously)

#### Exercise 1.2: The Global Store (Redux Toolkit)
- Shopping cart with `createSlice` for automatic action creators
- Memoized selectors using `createSelector`
- 10% tax calculation that only runs when `totalAmount` changes

### Part 2: Performance Engineering

#### Exercise 2.1 & 2.2: The Laggy List
- `useMemo` for expensive sorting/filtering operations
- `useCallback` for stable function references
- `React.memo` to prevent unnecessary re-renders
- Visual render counter on each list item

#### Exercise 2.3: Route-Based Code Splitting
- `React.lazy` for dynamic imports
- `Suspense` with custom loading spinner
- AdminPanel loaded on-demand, not in initial bundle

### Part 3: Advanced Design Patterns

#### Exercise 3.1: Compound Tabs Component
- Context-based state sharing between components
- Flexible API allowing custom markup between tabs
- `<Tabs.List>`, `<Tabs.Tab>`, and `<Tabs.Panel>` components

#### Exercise 3.2: Portal Modal
- `createPortal` to escape CSS stacking context
- Event bubbling demonstration through React's synthetic events
- Multiple modal sizes and configurations

### Part 4: Testing Strategies

#### Exercise 4.1: Integration Testing a Form
- React Testing Library best practices
- `userEvent` for realistic user interactions
- Testing async behavior with `findByText`
- Proper mocking strategies

#### Exercise 4.2: Error Boundary Testing
- Using `react-error-boundary` library
- "Bomb" component pattern for testing
- Silencing console errors during tests
- Reset functionality testing

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd react-rpg-lab5

# Install dependencies
npm install

# Start development server
npm start
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📁 Project Structure

```
src/
├── components/
│   ├── effects/           # Visual effect components
│   │   ├── CustomCursor.js
│   │   ├── ParticleSystem.js
│   │   ├── TorchLight.js
│   │   └── AmbientBackground.js
│   ├── common/            # Shared components
│   │   └── LoadingSpinner.js
│   ├── part1/             # State Management
│   │   ├── UserProfile.js
│   │   └── ShoppingCart.js
│   ├── part2/             # Performance
│   │   ├── Dashboard.js
│   │   └── AdminPanel.js
│   ├── part3/             # Design Patterns
│   │   ├── Tabs.js
│   │   ├── TabsDemo.js
│   │   ├── Modal.js
│   │   └── ModalDemo.js
│   └── part4/             # Testing
│       ├── LoginForm.js
│       └── ErrorBoundaryDemo.js
├── store/                 # Redux store
│   ├── store.js
│   └── cartSlice.js
├── styles/                # Global styles
│   ├── index.css
│   └── App.css
├── __tests__/             # Test files
│   ├── LoginForm.test.js
│   └── ErrorBoundary.test.js
├── App.js
└── index.js
```

## 🎨 Design Theme

The application features a **dark medieval/fantasy RPG theme** with:

- **Colors**: Deep purples, gold accents, magical cyan, fire orange
- **Typography**: Cinzel Decorative for titles, Cormorant Garamond for body
- **Animations**: Smooth transitions, floating particles, glowing effects
- **UI Elements**: Ornate panels, gold borders, medieval-inspired buttons

## 🔧 Technologies Used

- **React 18.2** - UI library
- **Redux Toolkit 2.0** - State management
- **React Router 6** - Navigation
- **React Error Boundary** - Error handling
- **React Testing Library** - Testing
- **Jest** - Test runner
- **CSS3** - Styling with custom properties

## 📚 Key Concepts Demonstrated

1. **useReducer with FSM** - Deterministic state transitions
2. **Redux Toolkit** - Modern Redux with less boilerplate
3. **createSelector** - Memoized derived state
4. **useMemo** - Expensive calculation caching
5. **useCallback** - Stable function references
6. **React.memo** - Component memoization
7. **React.lazy** - Code splitting
8. **Compound Components** - Flexible component APIs
9. **Portals** - Rendering outside DOM hierarchy
10. **Error Boundaries** - Graceful error handling
11. **Integration Testing** - User-focused tests

## 📝 License

MIT License - Feel free to use this project for learning purposes!

---

*Forged in the fires of knowledge* ⚔️✨
