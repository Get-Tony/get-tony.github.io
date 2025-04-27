# Tony's Tools - Platform Documentation

This document provides an overview of the Tony's Tools platform, its architecture, and guidelines for adding new tools.

## Platform Overview

Tony's Tools is a collection of web-based utilities designed to run entirely client-side. The platform provides a common design language, navigation system, and privacy policy across all tools.

## Architecture

### Directory Structure

```bash
/
├── index.html             # Main landing page (unlicensed)
├── LICENSE-TOOLS.md       # MIT license for tool code
├── LICENSE-PLATFORM.md    # All rights reserved for platform code
├── legal-notice.html      # Legal information (unlicensed)
├── privacy-policy.html    # Privacy policy (unlicensed)
├── docs/                  # Platform documentation (unlicensed)
│   └── README.md          # This file - platform documentation
├── tools/                 # Directory containing all tools (MIT)
│   └── inventory-viewer/  # Inventory Viewer tool
│       ├── index.html     # Tool interface
│       └── docs/          # Tool-specific documentation
│           └── README.md  # Tool documentation
└── README.md              # Main project README (unlicensed)
```

### Styling and Components

The platform uses a consistent styling approach across all pages:

- Color scheme: Blue primary colors (#0f2b76, #1d4ed8)
- Typography: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif
- Components: Cards, navigation bars, and sections follow the same design language
- Responsive design: All pages are responsive and work on mobile devices

### Navigation Structure

All pages include:

- A top navigation bar with the platform name and links
- Consistent footer with copyright information and links to legal pages
- Clear paths to return to the home page from any tool

## Adding New Tools

### Guidelines for New Tools

1. Create a new directory under `/tools/` with your tool name
2. Make your tool self-contained with all necessary files:
   - `index.html` - The main tool interface
   - `/docs/` - Documentation for your tool
   - Include any CSS, JavaScript, and assets needed
3. Add a card on the main page to link to your tool

### Self-Contained Design

Each tool should:

- Include all necessary styling and scripts within its directory
- Function independently if copied to another location
- Include complete documentation within its own directory
- Process all data client-side for privacy

### Code Requirements

- Tools must run client-side only (unless explicitly stated otherwise)
- Include clear documentation in the tool's `/docs/` directory
- Follow accessibility best practices
- Maintain responsive design principles

## Licensing

The project uses a dual licensing approach that makes a clear distinction between the platform framework and the individual tools:

### Platform Framework (All Rights Reserved)

The Tony's Tools platform design, framework, styling, navigation, structure, and all non-tool content are **not licensed** and all rights are reserved. This means:

- No permission is granted to use, copy, modify, or distribute the platform framework
- The platform design, layout, styling, and overall website structure remain proprietary
- No one may reuse the platform framework without explicit permission

### Individual Tools (MIT)

Each tool in the `/tools/` directory is licensed under the MIT License and is completely self-contained, including:

- The tool's code
- The tool's documentation
- All styling and assets needed for the tool to function

This ensures that users can freely use, modify, and distribute each tool independently of the platform.

See the [LICENSE-TOOLS.md](../LICENSE-TOOLS.md) file for the MIT license terms applying to tool code.

## Contact

For questions or issues related to the platform, please open an issue on the [GitHub repository](https://github.com/Get-Tony/get-tony.github.io/issues) or contact Anthony Pagan at <get-tony@outlook.com>.
