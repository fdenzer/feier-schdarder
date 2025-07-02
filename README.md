# Dragonbane Character Generator (Vue.js Client-Side)

This project is a web-based character generator for the Dragonbane TTRPG, built using Vue.js. It runs entirely client-side, meaning no server process is needed at runtime.

## How to Use (Getting Started as a User)

This character generator is a client-side Vue.js application.

**To run locally (for development or direct use):**

1.  **Prerequisites:**
    *   Node.js and npm (or yarn) must be installed on your system. You can download Node.js from [https://nodejs.org/](https://nodejs.org/).
2.  **Clone the Repository (or Download Files):**
    If you have git, clone the repository:
    ```bash
    git clone <repository-url> # Replace <repository-url> with the actual URL
    cd dragonbane-char-gen
    ```
    Alternatively, download the project files (e.g., as a ZIP from GitHub) and extract them. Navigate into the `dragonbane-char-gen` directory.
3.  **Install Dependencies:**
    Navigate to the `dragonbane-char-gen` directory in your terminal and run:
    ```bash
    npm install
    ```
    (or `yarn install` if you prefer yarn)
4.  **Run the Development Server:**
    Once dependencies are installed, start the development server:
    ```bash
    npm run dev
    ```
    This will typically open the application in your default web browser at an address like `http://localhost:5173/`.
5.  **Use the Generator:**
    Interact with the form to create your Dragonbane character.

**To build for production (for deployment as static files):**

1.  **Build Command:**
    From the `dragonbane-char-gen` directory, run:
    ```bash
    npm run build
    ```
2.  **Output:**
    This command will create a `dist` folder inside `dragonbane-char-gen`. This folder contains all the static files (HTML, CSS, JavaScript) needed to run the application.
3.  **Deployment:**
    You can deploy the contents of the `dist` folder to any static web hosting service, such as GitHub Pages, Netlify, Vercel, or your own web server. For GitHub Pages, you would typically push the `dist` folder's contents to a `gh-pages` branch or configure GitHub Actions to do this for you.

## How to Develop

This project was scaffolded using `create-vue` (which uses Vite).

1.  **Setup:** Follow steps 1-3 from the "How to Run Locally" section above.
2.  **Development Server:** Use `npm run dev` to run a local development server with hot module replacement.
3.  **Project Structure:**
    *   `dragonbane-char-gen/src/App.vue`: The main Vue application component containing all the logic and template for the character generator.
    *   `dragonbane-char-gen/src/main.js`: The entry point for the Vue application.
    *   `dragonbane-char-gen/src/assets/`: Contains static assets like CSS (`main.css`) and images (`logo.svg`).
    *   `dragonbane-char-gen/public/`: Contains static assets that are copied directly to the build output (e.g., `favicon.ico`).
    *   `dragonbane-char-gen/index.html`: The main HTML page for the application.
    *   `vite.config.js`: Configuration for Vite.
    *   `package.json`: Project dependencies and scripts.
4.  **Making Changes:**
    *   Edit `App.vue` to modify the character generator's functionality, layout, or styling.
    *   The development server will automatically update the application in your browser as you save files.
5.  **Building:** Use `npm run build` to create a production-ready build in the `dist` folder.
6.  **Linting/Formatting:**
    *   The default `create-vue` setup includes ESLint. You can run `npm run lint` to check for linting errors (you might need to configure it first if not done by `create-vue` default template for this specific setup).

## Core Features (Development Tasks Reference)

This section references the initial plan for the generator's features.

1.  **Task 1: Basic Character Attribute Input & Display**
    *   **Description:** Implement input fields for the six core attributes (STR, CON, AGL, INT, WIL, CHA) with a 3-18 scale.
    *   **Status:** Implemented.

2.  **Task 2: Kin Selection and Innate Abilities**
    *   **Description:** Allow users to select Kin and display their innate abilities.
    *   **Status:** Implemented. (Data based on Quickstart PDF pre-gens; Dwarf is a placeholder).

3.  **Task 3: Derived Ratings Calculation and Display**
    *   **Description:** Automatically calculate and display HP, WP, Movement, and Damage Bonuses.
    *   **Status:** Implemented. (HP, WP directly from attributes. Movement is user-adjustable due to variability. Damage Bonuses use an approximated scale based on pre-gen examples).

4.  **Task 4: Character Details, Gear, and Presentation**
    *   **Description:** Sections for Profession, Weakness, Memento, Skills, Gear, and Encumbrance.
    *   **Status:** Implemented.

This `readme.md` provides guidance for users and developers of the Dragonbane Character Generator.
Further updates may include more detailed Kin/Profession data if available from the full rulebook.
