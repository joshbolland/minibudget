# minibudget 💸

A minimalist budget planner built with Next.js, TypeScript, Tailwind CSS, Zustand for state management, and AWS for backend services. Track your expenses, stay within budget, and learn modern fullstack development patterns.

## 🔧 Tech Stack

- **Frontend**: Next.js (React + TypeScript)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Auth**: AWS Cognito
- **Backend API**: AWS Lambda + API Gateway
- **Database**: AWS DynamoDB
- **Hosting**: Vercel (frontend) + AWS (backend)

## ✨ Features

- Add, edit, and delete expenses
- Track budget usage with summary and filtering
- Responsive UI built with accessible, semantic components
- Persist data using AWS serverless backend
- Optimistic UI updates with Zustand

## 📁 Project Structure

```plaintext
src/
  components/         → Reusable UI components
  pages/              → App routes and API handlers
  store/              → Zustand state store
  lib/                → AWS API clients/helpers
  types/              → Type definitions
```

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/minibudget.git
cd minibudget
npm install
```