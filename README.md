# Color Palette Generator

## Overview

The **Color Palette Generator** is a Vue.js application that allows users to search for random images using the Unsplash API, extract the dominant colors from the image using ColorThief, and view the colors in a CSS format with the option to export them as PNG or CSS/SCSS files.

## Features

-   Search images from Unsplash based on a query.
-   Extract dominant colors from images.
-   Display extracted colors in a CSS variable format with color previews.
-   Export color palettes as a PNG image.
-   Export color palettes as CSS or SCSS variables.

## Setup

### Prerequisites

-   **Node.js**: Ensure that you have Node.js installed on your system.
-   **Vercel account**: For deployment (optional).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/color-palette-generator.git
    cd color-palette-generator
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    - Create a `.env` file in the root directory and add your Unsplash API key:
        ```bash
        VITE_API_KEY=your_unsplash_api_key
        ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and visit `http://localhost:5173` to view the application.

### Deployment on Vercel

1. Push the repository to GitHub.
2. In your Vercel dashboard, import the project from GitHub.
3. Add your environment variable in Vercel:
    - `VITE_API_KEY`: Set this to your Unsplash API key.
4. Deploy the project.

## Tech Stack

-   **Vue.js**: Front-end framework for building user interfaces.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **Vite**: Build tool that provides fast, hot-reloading development environments.
-   **Axios**: Promise-based HTTP client used for API calls to Unsplash.
-   **ColorThief**: Library used for extracting the dominant colors from an image.
-   **html2canvas**: Library used for converting the color palette to a downloadable PNG image.
-   **Prism.js**: Syntax highlighting library for displaying CSS code with color previews.

## Environment Variables

The following environment variables need to be configured:

-   `VITE_API_KEY`: Your Unsplash API key.

## Legal and License

-   This project is licensed under the MIT License. Feel free to use, modify, and distribute it. The full license is available in the `LICENSE` file.
-   **Unsplash API Usage**: Make sure to comply with the [Unsplash API Terms of Use](https://unsplash.com/documentation#terms).

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Author

-   **Peter Benoit**

## Contact

If you have any questions, feel free to reach out to me via GitHub or other platforms.
