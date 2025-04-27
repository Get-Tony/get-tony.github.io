# Tony's Tools

This repository hosts my personal tools site where I share various utilities and projects.

👉 **Website**: [https://get-tony.github.io](https://get-tony.github.io)

## Available Tools

### Inventory Viewer

A client-side JavaScript application for visualizing Ansible inventory files. This tool provides an interactive web interface to explore and search through your Ansible inventory structure, making it easier to understand your infrastructure organization.

**Access the tool here**: [https://get-tony.github.io/tools/inventory-viewer/](https://get-tony.github.io/tools/inventory-viewer/)

**Documentation**: [Inventory Viewer Documentation](tools/inventory-viewer/docs/README.md)

#### Features

- 📁 **Upload or paste** Ansible inventory JSON data
- 🔍 **Search** through hosts, groups, and variables
- 🌳 **Tree-view visualization** of inventory structure
- 👥 View **direct and inherited hosts** for each group
- 🔑 Display **host variables and group variables**
- 📱 **Responsive design** for desktop and mobile
- ⚡ **Client-side processing** (no server required)
- 🔒 **Privacy-focused** - your data never leaves your browser
- 🎨 Modern, clean user interface

#### Getting Started with Inventory Viewer

1. Generate your Ansible inventory in JSON format:

   ```bash
   ansible-inventory -i your_inventory.ini --list > inventory.json
   ```

2. Visit [https://get-tony.github.io/tools/inventory-viewer/](https://get-tony.github.io/tools/inventory-viewer/) in your browser

3. Either:
   - Upload the generated JSON file using the file upload area
   - Or paste the JSON content directly into the text area

4. Click "Load Inventory" to visualize your infrastructure

## Documentation

- [Platform Documentation](docs/README.md) - Overview of the platform architecture and guidelines
- Tool documentation is included within each tool's directory in `/tools/[tool-name]/docs/`

## Licensing

This repository uses a dual licensing approach:

- **Platform Framework**: All platform code and files outside the `/tools/` directory are proprietary and confidential. All rights reserved. See [LICENSE-PLATFORM.md](LICENSE-PLATFORM.md) for details.

- **Tools**: The tools contained in the `/tools/` directory (including their code, documentation, and assets) are available under the MIT License. See [LICENSE-TOOLS.md](LICENSE-TOOLS.md) for details.

## Usage Rights

- You may freely use, modify, and distribute the tools in the `/tools/` directory according to the MIT License terms. Each tool is self-contained and can function independently.
- All other content is proprietary. Unauthorized copying, modification, or distribution is strictly prohibited.

## Privacy Policy

All tools on this site process data exclusively in your browser. No personal data is collected, stored, or transmitted to any server unless explicitly stated otherwise for a specific tool.

Read the complete [Privacy Policy](https://get-tony.github.io/privacy-policy.html).

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

## Project Structure

```bash
/
├── index.html                      # Main landing page (unlicensed)
├── LICENSE-TOOLS.md                # MIT license for tool code only
├── LICENSE-PLATFORM.md             # All rights reserved for platform code
├── impressum.html                  # Legal information (unlicensed)
├── privacy-policy.html             # Privacy policy (unlicensed)
├── docs/                           # Platform documentation (unlicensed)
│   └── README.md                   # Platform documentation
├── tools/                          # Tools directory (MIT licensed)
│   └── inventory-viewer/           # Ansible inventory visualization tool
│       ├── index.html              # Tool interface
│       └── docs/                   # Tool-specific documentation
│           └── README.md           # Tool documentation
└── README.md                       # This file (unlicensed)
```

## Attribution and Trademarks

This project utilizes [Ansible](https://www.ansible.com/), an open-source automation tool. Ansible® is a registered trademark of Red Hat, Inc. in the United States and other countries.

- Ansible project: [https://github.com/ansible/ansible](https://github.com/ansible/ansible)
- Ansible documentation: [https://docs.ansible.com/](https://docs.ansible.com/)
- Ansible is licensed under the GNU General Public License v3.0 (GPLv3)

This project is not affiliated with, endorsed by, or sponsored by Red Hat, Inc. or the Ansible project.

## Contributing

Contributions to individual tools are welcome under the terms of the MIT license. Please feel free to submit a Pull Request or open an issue.

Note that contributions to the platform framework itself will require explicit agreement as the framework is not open-source licensed.

## Contact

For questions, issues, or contributions, please open an issue on this repository or contact me at <get-tony@outlook.com>.

## Acknowledgments

- Built with vanilla JavaScript
- No external dependencies required
- Inspired by the need for better Ansible inventory visualization
- Uses the format generated by Ansible's inventory tool
