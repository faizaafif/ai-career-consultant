# AI Career Consultant

## Project Overview

The AI Career Consultant is a full-stack application designed to provide personalized career recommendations based on a user's background, skills, interests, personality, and constraints. It leverages an AI service to process user input and generate suitable career paths and next steps.

## Features

-   **Interactive Consultation:** Guides users through a series of questions about their profile.
-   **Personalized Recommendations:** Provides career path suggestions tailored to individual user data.
-   **Detailed Analysis:** Offers insights into how recommendations are formed based on various factors.
-   **Actionable Next Steps:** Suggests practical steps for users to pursue their recommended careers.
-   **Responsive User Interface:** A modern and accessible design that works across different devices.

## Technologies Used

This project is composed of three main services: a Frontend, a Backend API, and an AI Service.

### Frontend
-   **Angular**: A platform and framework for building single-page client applications using HTML and TypeScript.

### Backend (Node.js API)
-   **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
-   **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.

### AI Service (Python)
-   **Python**: A high-level, interpreted programming language.
-   **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
-   **uvicorn**: An ASGI web server implementation for Python.

## Folder Structure

The project is organized into the following main directories:

-   `ai-service/`: Contains the Python-based AI service with its models, schemas, and service logic.
-   `backend/`: Contains the Node.js Express.js backend API with its controllers and routes.
-   `frontend/`: Contains the Angular client application.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

-   Node.js (LTS version recommended) & npm
-   Python 3.8+ & pip
-   Angular CLI (`npm install -g @angular/cli`)

### 1. AI Service Setup

Navigate to the `ai-service` directory, install dependencies, and start the service.

```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
The AI service will run on `http://localhost:8000`.

### 2. Backend API Setup

Navigate to the `backend` directory, install dependencies, and start the API.

```bash
cd backend
npm install
npm run dev
```
The Backend API will run on `http://localhost:5000` (or another port specified in its configuration).

### 3. Frontend Application Setup

Navigate to the `frontend` directory, install dependencies, and start the Angular development server.

```bash
cd frontend
npm install
ng serve
```
The Frontend application will be accessible at `http://localhost:4200`.

## Usage

1.  Ensure all three services (AI Service, Backend API, and Frontend) are running.
2.  Open your web browser and navigate to `http://localhost:4200`.
3.  Follow the on-screen prompts to provide your background, skills, interests, personality, and constraints.
4.  After submitting your information, the AI Consultant will provide a personalized career recommendation and next steps.

## Contributing

Please contact the project maintainer for contribution guidelines.

## License

MIT © [Faiza](https://github.com/faizaafif/ai-career-consultant/blob/master/LICENSE) 
