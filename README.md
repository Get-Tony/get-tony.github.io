# Tony's Tools

A modern, modular web application for managing and accessing various tools and utilities.

## Overview

Tony's Tools is a clean, responsive web application that provides a unified interface for accessing multiple tools. The application features a card-based UI with tools organized by categories, making it easy to find and use the tools you need.

## Features

- **Modular Design**: Tools are loaded dynamically from a central configuration, including their HTML, CSS, and JS for modularity and performance
- **Dynamic Tool Loading**: Each tool's HTML, CSS, and JS are loaded on demand for modularity and performance
- **Responsive UI**: Works on desktop and mobile devices
- **Wide, Responsive Tool Views**: Tools use the full width of the browser on desktop, with a centered card for main content
- **Category Organization**: Tools are grouped by category for easy navigation
- **Hash-based Navigation**: URLs include tool IDs for direct access and bookmarking
- **Clean, Modern Interface**: Minimalist design with smooth transitions and hover effects
- **Sticky Footer**: Footer always stays at the bottom of the page for a polished look
- **Collapsible UI Sections**: Many tools feature collapsible instructions and input areas for a cleaner interface
- **Client-Side Processing**: All tools operate entirely in your browser for privacy

## Project Structure

```bash
get-tony.github.io/
├── index.html              # Main application entry point
├── src/
│   ├── styles/
│   │   └── main.css        # Main stylesheet
│   └── scripts/
│       └── tools.js        # Core application logic
├── tools/
│   ├── tools.json          # Tool configuration file
│   └── inventory-viewer/   # Tool directory
│       ├── index.html      # Tool-specific HTML (with collapsible sections)
│       ├── styles.css      # Tool-specific styles
│       └── script.js       # Tool-specific scripts
├── legal-notice.html       # Legal information
├── privacy-policy.html     # Privacy policy
├── LICENSE.md              # License information
└── README.md               # This file
```

## Tool Configuration

Tools are defined in the `tools/tools.json` file with the following structure:

```json
{
  "tools": [
    {
      "id": "tool-id",
      "name": "Tool Name",
      "description": "Tool description",
      "path": "tools/tool-directory/",
      "icon": "📦",
      "category": "category-name"
    }
  ]
}
```

### Tool Properties

- `id`: Unique identifier for the tool
- `name`: Display name of the tool
- `description`: Short description of the tool's functionality
- `path`: Path to the tool's directory
- `icon`: Emoji or icon representing the tool
- `category`: Category for grouping related tools

## Adding a New Tool

To add a new tool to the application:

1. Create a new directory in the `tools/` folder for your tool
2. Add the tool's HTML, CSS, and JavaScript files to this directory
3. Add a new entry to the `tools/tools.json` file with the tool's configuration

## Design System

The application uses a clean, modern design system with:

- **Color Scheme**: Blue-based palette with white backgrounds and subtle shadows
- **Typography**: Segoe UI font family for clean, readable text
- **Spacing**: Consistent padding and margins throughout
- **Components**: Card-based UI with hover effects and smooth transitions
- **Responsive Layout**: Grid-based layout that adapts to different screen sizes
- **Sticky Footer**: Footer always at the bottom for a polished look
- **Collapsible Sections**: Tool UIs may include collapsible instructions and input areas

## Browser Support

The application is designed to work in all modern browsers, including:

- Chrome
- Firefox
- Safari
- Edge

## Privacy

All tools on this site process data exclusively in your browser. No personal data is collected, stored, or transmitted to any server unless explicitly stated otherwise for a specific tool.

For more information, see the [Privacy Policy](privacy-policy.html).

## License

© 2025 Anthony Pagan. All rights reserved.

This project is available for viewing and using via GitHub Pages, with limited local testing permissions. See [LICENSE.md](LICENSE.md) for complete terms.

## Contact

For questions or issues, please use the GitHub Issues page:

- <https://github.com/Get-Tony/get-tony.github.io/issues>
- GitHub: [Get-Tony](https://github.com/Get-Tony)

## Notes

- Legacy files and unused code have been removed for clarity and maintainability.
- The application is designed for easy extension: just add a new tool directory and update `tools.json`.
