# Inventory Viewer Documentation

The Inventory Viewer is a client-side JavaScript application for visualizing Ansible inventory files in JSON format. It provides an interactive web interface to explore and search through your Ansible inventory structure.

## Features

- **Upload or paste** Ansible inventory JSON data
- **Advanced search** with filtering by hosts, groups, or variables
- **Text highlighting** of search matches for easy identification
- **Automatic expansion** of parent containers to show search results
- **Tree-view visualization** of inventory structure
- **Direct and inherited hosts** display for each group
- **Host variables and group variables** visibility
- **Responsive design** for desktop and mobile use
- **Client-side processing** (no server required)
- **Privacy-focused** - data never leaves your browser
- **Intuitive UI** with toggleable input area

## Usage Guide

### Generating Inventory JSON

Before using the Inventory Viewer, you need to generate a JSON representation of your Ansible inventory. You can do this with the Ansible command-line tool:

```bash
ansible-inventory -i your_inventory.ini --list > inventory.json
```

This command reads your inventory file and outputs the JSON representation to `inventory.json`.

### Loading Inventory Data

1. Visit the [Inventory Viewer](https://get-tony.github.io/tools/inventory-viewer/) in your browser
2. Choose one of these methods to load your inventory:
   - **Upload file**: Click "Browse Files" and select your JSON file
   - **Paste data**: Copy your JSON data and paste it into the text area
3. Click "Load Inventory" to visualize your data

### Navigating the Inventory

Once loaded, your inventory will be displayed as a collapsible tree structure:

- **Inventory Metadata**: Shows total host count and load timestamp
- **All Group**: The top-level "all" group if present in your inventory
- **Groups**: All top-level groups in your inventory

Click on items with a "▶" icon to expand them and view their contents.

### Search Functionality

Use the search bar to filter your inventory:

1. Type your search term in the input field
2. Select the search type from the dropdown:
   - **All**: Search everything
   - **Hosts**: Search only host names and IP addresses
   - **Groups**: Search only group names
   - **Variables**: Search variable names and values

The search results will:

- Highlight matching text in yellow for easy identification
- Automatically expand parent containers to show matching items
- Hide non-matching items to focus on results
- Show a clear button (×) to reset the search

When searching for variables, the tool will automatically expand host nodes to make their variables searchable.

### Understanding the Display

The inventory view organizes information into several key sections:

- **Direct Hosts**: Hosts explicitly assigned to a group
- **Inherited Hosts**: Hosts inherited from child groups
- **Host Variables**: Variables assigned to specific hosts
- **Group Variables**: Variables assigned to groups

For hosts with IP addresses (ansible_host variable), these are displayed in parentheses next to the hostname.

### Controls

- **Expand All**: Expands all nodes in the tree view
- **Shrink All**: Collapses all nodes in the tree view
- **Hide/Show Input Area**: Toggles the visibility of the input section (button text changes based on current state)
- **Clear**: Clears all data and returns to the initial state
- **Copy JSON**: Copies the entire inventory data to your clipboard
- **Download**: Available on group items to download a specific group as a JSON file
  - Hover over a group name to see the download button
  - Click the download icon (⬇️) next to the group name
  - The downloaded file will contain the selected group's data in JSON format

## Technical Details

### Data Processing

The Inventory Viewer processes all data entirely client-side:

1. When you upload or paste JSON data, it's parsed in your browser
2. The JSON structure is transformed into a visual tree representation
3. No data is sent to any server or stored beyond your current session

### Browser Compatibility

The tool is designed to work in modern browsers:

- Chrome/Edge (latest versions)
- Firefox (latest versions)
- Safari (latest versions)

### Performance Considerations

Large inventory files (>2MB) may take longer to process. The application includes:

- A warning message for large files
- A loading overlay with progress indicator for large files
- Automatic progress updates during processing
- Optimized rendering for better performance with large inventories

## Privacy

The Inventory Viewer adheres to the platform's [Privacy Policy](https://get-tony.github.io/privacy-policy.html), including:

- No data collection
- No cookies or tracking
- All processing happens in your browser
- No data is transmitted to any servers

## Standalone Usage

This tool is designed to be fully self-contained and can function independently of the Tony's Tools platform. You can:

1. Copy the entire `inventory-viewer` directory to your own server or project
2. Use it locally by opening the `index.html` file directly in a browser
3. Integrate it into your own tools or workflows

## Licensing

The Inventory Viewer tool (including all code, documentation, and assets in this directory) is released under the MIT License, which means:

- You are free to use, modify, and distribute the tool
- You can use the tool in your own projects, whether commercial or non-commercial
- You must include the original MIT license notice with any substantial portions of the code you use

To access the source code or report issues, visit the [GitHub repository](https://github.com/Get-Tony/get-tony.github.io).

## Support

For issues, feedback, or contributions related to the Inventory Viewer tool, please [open an issue](https://github.com/Get-Tony/get-tony.github.io/issues) on GitHub.
