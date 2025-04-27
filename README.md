# Ansible Inventory Viewer

A client-side JavaScript application for visualizing Ansible inventory files. This tool provides an interactive web interface to explore and search through your Ansible inventory structure, making it easier to understand your infrastructure organization.

👉 **Live Demo**: [https://get-tony.github.io](https://get-tony.github.io)

## Features

- 📁 **Upload or paste** Ansible inventory JSON data
- 🔍 **Search** through hosts, groups, and variables
- 🌳 **Tree-view visualization** of inventory structure
- 👥 View **direct and inherited hosts** for each group
- 🔑 Display **host variables and group variables**
- 📱 **Responsive design** for desktop and mobile
- ⚡ **Client-side processing** (no server required)
- 🔒 **Privacy-focused** - your data never leaves your browser
- 🎨 Modern, clean user interface

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Ansible inventory in JSON format (output from `ansible-inventory --list`)

### Usage

1. Generate your Ansible inventory in JSON format:

   ```bash
   ansible-inventory -i your_inventory.ini --list > inventory.json
   ```

2. Visit [https://get-tony.github.io](https://get-tony.github.io) in your browser

3. Either:
   - Upload the generated JSON file using the file upload area
   - Or paste the JSON content directly into the text area

4. Click "Load Inventory" to visualize your infrastructure

### Features in Detail

- **Search Functionality**: Filter inventory by hosts, groups, or variables
- **Expand/Collapse**: Navigate through the inventory structure easily
- **Host Information**: View host variables and IP addresses
- **Group Hierarchy**: See how groups are organized and which hosts belong to them
- **Inherited Hosts**: Understand which hosts are inherited from child groups

## About This Project

This project is hosted on GitHub Pages, allowing for easy access without requiring server-side processing. All data processing happens directly in your browser, ensuring that your sensitive inventory data never leaves your computer.

## Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/Get-Tony/get-tony.github.io.git
   cd get-tony.github.io
   ```

2. Serve the files using a local web server:

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using Node.js
   npx serve
   ```

3. Open `http://localhost:8000` in your browser

### Project Structure

```bash
get-tony.github.io/
├── index.html          # Main application file
├── impressum.html      # Legal information
└── README.md           # This documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue on the [GitHub repository](https://github.com/Get-Tony/get-tony.github.io).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with vanilla JavaScript
- No external dependencies required
- Inspired by the need for better Ansible inventory visualization
