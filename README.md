# Inventory Viewer

A client-side JavaScript application for visualizing Ansible inventory files. This tool provides an interactive web interface to explore and search through your Ansible inventory structure, making it easier to understand your infrastructure organization.

## Features

- 📁 Upload or paste Ansible inventory JSON data
- 🔍 Search through hosts, groups, and variables
- 🌳 Tree-view visualization of inventory structure
- 👥 View direct and inherited hosts for each group
- 🔑 Display host variables and group variables
- 📱 Responsive design for desktop and mobile
- ⚡ Client-side processing (no server required)
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

2. Open the Ansible Inventory Viewer in your browser

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

## Deployment

### GitLab Pages Setup

1. Create a new repository in GitLab

2. Push your code to the repository:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-gitlab-repo-url>
   git push -u origin main
   ```

3. Enable GitLab Pages:
   - Go to your repository's Settings > Pages
   - Under "Source", select your main branch
   - Click "Save"

4. Your site will be available at: `https://<username>.gitlab.io/<repository-name>/`

## Development

### Local Development

1. Clone the repository:

   ```bash
   git clone <your-gitlab-repo-url>
   cd ansible-inventory-viewer
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

```
ansible-inventory-viewer/
├── index.html          # Main application file
├── README.md          # This documentation
└── .gitlab-ci.yml     # GitLab CI configuration (optional)
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Anthony Pagan

## Acknowledgments

- Built with vanilla JavaScript
- No external dependencies required
- Inspired by the need for better Ansible inventory visualization
