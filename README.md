# 🎨 Front-end — Vue 3 + Vuetify + TypeScript

This repository contains the **front-end of a user management system**, developed to **consume a REST API based on Clean Architecture** (Java + Spring Boot).

The project focuses on **front-end best practices**, code organization, automated tests, and API integration, without coupling to backend implementation details.

---

## 🏗 Technologies

## Front-end
* **Vue.js 3**
* **TypeScript**
* **Vite**
* **Vuetify**
* **Vue Router**
* **Pinia**
* **Axios**

## Forms & Utils
* **Vee-Validate**
* **Yup**

## Testing
* **Vitest**
* **MSW (Mock Service Worker)**

## Tooling & Infrastructure
* **ESLint**
* **Docker**
* **Docker Compose**
* **Nginx (production)**

---

## 📁 Project Structure

### `src/`

```bash
src/
 ├─ components/          → Reusable components
 ├─ router/              → Route configuration
 ├─ stores/              → State management (Pinia)
 ├─ services/            → API communication layer (Axios)
 ├─ assets/              → Images and static assets
 ├─ composables/         → Reusable logic (Composition API)
 ├─ constants/           → Global constants
 ├─ dtos/                → DTOs / typings
 ├─ layouts/             → Application layouts
 ├─ pages/               → Pages (views)
 ├─ plugins/             → Plugins (Vuetify, etc.)
 ├─ styles/              → Global styles
 ├─ App.vue
 └─  setupTests.ts        → Global test configuration
```

---

### `tests/`

```bash
tests/
 ├─ helper/
 │   └─ mockResponse.ts        → Mocked API responses
 └─ tests/impl/
           ├─ editUser/
           ├─ generateUser/
           ├─ getUser/
           ├─ removeUser/
           └─ userApi.test.ts        → API service tests
```

**Testing approach:**

* Tests focused on the **services layer**
* **MSW** used to mock HTTP requests
* Clear separation between **mock data** and **test cases**

---

## 🔗 Backend Integration

This front-end consumes an API developed using **Clean Architecture**:

👉 **Backend repository:**
[Diego-godoi/Clean_Architecture](https://github.com/Diego-godoi/Clean_Architecture)

---

## ▶️ Running the Project

You have **two simple ways** to run the project.

---

### ✅ Option 1 — Using Docker (recommended)

With the backend already configured:

```bash
git clone https://github.com/Diego-godoi/Front_end_project.git
cd Front_end_project
docker-compose up --build
```

This will:

* Build the front-end
* Serve the application via **Nginx**
* Make the project ready to access

---

### ✅ Option 2 — Running API + Front-end manually

#### 1️⃣ Start the API

Clone and run the backend:

```bash
git clone https://github.com/Diego-godoi/Clean_Architecture.git
cd Clean_Architecture
docker-compose up -d
```

The API will be available at:

```
http://localhost:8080
```

---

#### 2️⃣ Run the front-end

```bash
git clone https://github.com/Diego-godoi/Front_end_project.git
cd Front_end_project
npm install
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## 🧪 Running Tests

```bash
npm run test
```

Tests use:

* **Vitest**
* **MSW**
* Mocked responses via `mockResponse.ts`

---

## 📦 Production Build

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

---

## 🎯 Project Goals

This project was developed to:

* Study **Vue 3 + Vuetify**
* Apply **real-world front-end project organization**
* Work with **TypeScript**
* Consume a **Clean Architecture–based API**
* Implement **automated tests**
* Prepare the front-end for **production environments**

---

## 🧠 Architectural Notes

* UI layer focused only on rendering and user interaction
* API communication isolated in the `services` layer
* Global state centralized in `stores`
* Extensive use of the **Composition API**
* Easily scalable project structure

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Diego Godoi**

- GitHub: [@Diego-godoi](https://github.com/Diego-godoi)
- Docker Hub: [diegos01](https://hub.docker.com/u/diegos01)
- Instagram: [@_.godoi_](https://www.instagram.com/_.godoi_/)

---
**⭐ If you found this project helpful, please consider giving it a star!**
