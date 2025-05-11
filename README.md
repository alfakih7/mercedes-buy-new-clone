# Gargash AI Agentic CVM & Sales Solution

Developed by the **AI Heroes Team**, this project is an advanced AI-powered platform designed to enhance Customer Value Management (CVM) and streamline sales processes and operations for Gargash Enterprises.

## Key Features

*   **Interactive Car Showroom:** Browse and filter a comprehensive catalog of Mercedes-Benz vehicles.
*   **Dynamic Search & Filtering:** Users can easily find cars by name, model, keywords, and other criteria.
*   **Detailed Car Information:** View car specifications, pricing, availability, and image galleries.
*   **User Profile Management:** Personalized user dashboards displaying preferences, interaction history, purchase history, and service records.
*   **AI-Powered Email Crafter:** Sales agents can generate personalized customer emails (follow-ups, promotions, service reminders, etc.) using AI, based on customer profiles and interaction history.
*   **AI Interaction Summary:** AI-generated summaries of customer interactions and recommended next actions for sales staff.
*   **An AI Voice Sales Assistant that can interact with customers and provide a good user experience.**
*   **Admin CVM Dashboard:** A comprehensive dashboard for administrators to monitor key sales metrics, customer activity, vehicle performance, and manage customer data.
*   **Secure Admin Login:** Authenticated access to the admin portal.
*   **Responsive Design:** User interface designed for a seamless experience across devices.

## Tech Stack

*   **Frontend:** React, TypeScript, Vite
*   **Styling:** Inline styles, CSS (potentially with a framework like Tailwind CSS if used, though not explicitly seen in all files)
*   **Routing:** React Router DOM
*   **State Management:** React Context API, `useState`, `useEffect` hooks
*   **AI Integration:** OpenAI API (GPT-4o Mini) for email generation and interaction summaries.
*   **Version Control:** Git

## Getting Started

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm or yarn (or bun, as seen in `package.json` scripts)
*   Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Install dependencies:**
    Choose one of the following based on your preferred package manager:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
    or (if using bun)
    ```bash
    bun install
    ```

### Environment Variables

Ensure you have a `.env` file at the project root if API keys or other environment-specific configurations are required. For example, the OpenAI API key is used in `UserProfile.tsx`.

Example `.env` content:
```
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```
*Note: The current implementation in `UserProfile.tsx` hardcodes the OpenAI API key. It is highly recommended to move this to an environment variable for security and best practices.*

### Running the Application

```bash
 bun dev
```
This will start the Vite development server, typically at `http://localhost:5173` (or the port specified in your Vite config/scripts).

## Available Scripts

In the project directory, you can run the following scripts (defined in `package.json`):

*   `bun dev`: Starts the development server.
*   `bun build`: Builds the app for production to the `dist` folder.
*   `bun lint`: Lints the codebase using Biome and runs TypeScript checks.
*   `bun format`: Formats the code using Biome.
*   `bun preview`: Serves the production build locally for preview.

## Folder Structure (Simplified)

```
/mercedes-buy-new-clone
|-- public/
|   |-- _redirects
|   |-- various_static_assets_like_images_if_any...
|-- src/
|   |-- components/         # Reusable UI components (CarCard, Layout, UserAvatar, etc.)
|   |-- contexts/           # React Context for global state (UserContext)
|   |-- pages/              # Page-level components (HomePage, UserProfile, etc.)
|   |-- assets/             # Static assets like images, logos (if structured this way)
|   |-- styles/             # Global styles or CSS modules (if used)
|   |-- utils/              # Utility functions
|   |-- Admin.tsx           # Admin dashboard component
|   |-- App.tsx             # Main application component, router setup
|   |-- main.tsx            # Entry point of the React application
|   |-- vite-env.d.ts       # Vite environment type definitions
|   |-- cars.json           # Static car data (can be replaced with API)
|   |-- AM001-no.txt        # Example customer interaction data
|   |-- glogo.jpeg          # Gargash logo image
|   |-- gragsh-logo.png     # Another Gargash logo variant (potentially unused)
|-- .env.example          # Example environment variables file
|-- .eslintrc.cjs         # ESLint configuration (if used)
|-- .gitignore
|-- biome.json            # Biome (linter/formatter) configuration
|-- index.html            # Main HTML file for Vite
|-- package.json          # Project dependencies and scripts
|-- README.md             # This file
|-- tsconfig.json         # TypeScript configuration
|-- tsconfig.node.json    # TypeScript configuration for Node.js environment
|-- vite.config.ts        # Vite configuration
```

## Contribution

This project was developed by the **AI Heroes Team**.

---

This README provides a general overview. Specific setup steps or configurations might vary based on the project's evolution.
