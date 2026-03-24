# 💻 Dev Clientes (Customer Management System)

A sleek, fast, and local-first customer management desktop application. Built from the ground up with a modern web stack to provide a seamless native experience on Windows, macOS, and Linux.

## ✨ Features

- **Full CRUD Operations:** Seamlessly create, read, update, and delete customer records.
- **Local-First Database:** Uses PouchDB for instant, offline-capable data storage without the need for an external server.
- **Smart Form Validation:** Real-time input masking and robust schema validation using React Hook Form and Zod.
- **Optimized State Management:** Blazing fast data fetching and UI caching powered by TanStack Query (React Query).
- **4K Ready & Responsive:** Fluid layout that automatically scales and adapts from standard laptops to ultra-wide 4K monitors using Tailwind CSS Grid/Flexbox.
- **Modern UI/UX:** Clean, dark-mode focused interface with subtle animations and Radix UI accessible primitives.

## 🛠️ Tech Stack

- **Core:** [Electron](https://www.electronjs.org/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [Phosphor Icons](https://phosphoricons.com/)
- **Data & State:** [TanStack Query v5](https://tanstack.com/query/latest) + [PouchDB](https://pouchdb.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/) + [Electron Router DOM](https://github.com/vitorsantanna/electron-router-dom)

## 🚀 Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## 📦 Project Setup & Installation

### Install Dependencies

```bash
$ yarn
```

### Development Mode

Runs the app in the development mode with hot-reload.

```bash
$ yarn dev
```

### Build Executables

Packages the application for production. The output will be located in the dist folder.

```bash
# For Windows (.exe)
$ yarn build:win

# For macOS (.dmg)
$ yarn build:mac

# For Linux (.AppImage / .deb)
$ yarn build:linux
```

### 👨‍💻 Author

Developed by Walace - Project created during the @sujeitoprogramador course.
