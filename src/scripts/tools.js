// Tool Manager - handles tool loading and rendering
class ToolManager {
  constructor() {
    this.currentTool = null;
    this.loadedResources = new Set();
    this.toolCardsContainer = document.getElementById("tool-cards");
    this.tools = [];

    // Use event delegation for tool links
    this.toolCardsContainer.addEventListener("click", (e) => {
      const toolLink = e.target.closest(".tool-link");
      if (toolLink) {
        e.preventDefault();
        this.loadTool(toolLink.dataset.tool);
      }
    });
  }

  // Load tools from JSON file
  async loadTools() {
    try {
      const response = await fetch('/tools/tools.json');
      const data = await response.json();
      this.tools = data.tools;
      this.renderToolCards();

      // Check for hash in URL and load the appropriate tool
      const hash = window.location.hash.substring(1); // Remove the # character
      if (hash) {
        this.loadTool(hash);
      }
    } catch (error) {
      console.error('Failed to load tools:', error);
      this.showErrorMessage('Failed to load tools configuration');
    }
  }

  // Render all tool cards
  renderToolCards() {
    const mainContent = document.getElementById("main-content");
    mainContent.classList.remove("tool-view-active");
    this.toolCardsContainer.innerHTML = "";

    // Group tools by category
    const categorizedTools = this.groupToolsByCategory();

    // Always render category headers, even for a single category
    Object.entries(categorizedTools).forEach(
      ([category, categoryTools]) => {
        // Always add category header
        const categoryHeader = document.createElement("div");
        categoryHeader.className = "category-header";
        categoryHeader.textContent = this.capitalizeFirstLetter(category);
        this.toolCardsContainer.appendChild(categoryHeader);

        // Create container for this category
        const categoryContainer = document.createElement("div");
        categoryContainer.className = "tool-category";

        // Add tool cards for this category
        categoryTools.forEach((tool) => {
          categoryContainer.appendChild(this.createToolCard(tool));
        });

        this.toolCardsContainer.appendChild(categoryContainer);
      }
    );
  }

  // Group tools by their category
  groupToolsByCategory() {
    return this.tools.reduce((acc, tool) => {
      const category = tool.category || "uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(tool);
      return acc;
    }, {});
  }

  // Create a tool card element
  createToolCard(tool) {
    const card = document.createElement("div");
    card.className = "tool-card";

    // Add icon if available
    if (tool.icon) {
      const iconDiv = document.createElement("div");
      iconDiv.className = "tool-icon";
      iconDiv.textContent = tool.icon;
      card.appendChild(iconDiv);
    }

    // Add title
    const title = document.createElement("h3");
    title.textContent = tool.name;
    card.appendChild(title);

    // Add description
    const description = document.createElement("p");
    description.textContent = tool.description;
    card.appendChild(description);

    // Add link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "tool-link";
    link.dataset.tool = tool.id;
    link.textContent = "Open Tool";
    card.appendChild(link);

    return card;
  }

  // Load a specific tool
  async loadTool(toolId) {
    const tool = this.tools.find((t) => t.id === toolId);
    if (!tool) return;

    // Clean up previous tool
    await this.cleanupCurrentTool();

    // Update URL hash
    window.location.hash = `#${toolId}`;

    try {
      // Load tool HTML
      const res = await fetch(tool.path + "index.html");
      const toolContent = await res.text();

      // Create a temporary container to parse the tool's HTML
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = toolContent;

      // Get the main content from the tool's HTML
      const toolMainContent =
        tempContainer.querySelector(".inventory-viewer");

      // Create a new main content structure
      const mainContent = document.getElementById("main-content");
      mainContent.classList.add("tool-view-active");
      mainContent.innerHTML = `
        <div class="tool-container">
          ${toolMainContent ? toolMainContent.outerHTML : toolContent}
        </div>
      `;

      // Ensure the navigation header is visible and functional
      const header = document.getElementById("main-header");
      if (header) {
        header.style.display = "block";
        header.style.position = "fixed";
        header.style.top = "0";
        header.style.left = "0";
        header.style.right = "0";
        header.style.zIndex = "1000";
      }

      // Load tool resources
      await Promise.all([
        this.loadResource("stylesheet", tool.path + "styles.css"),
        this.loadResource("script", tool.path + "script.js"),
      ]);

      // Add a style to override any tool-specific footer styles
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        /* Override tool-specific footer styles to maintain site consistency */
        .footer {
          background: #f8f9fa !important;
          padding: 2rem 0 !important;
          text-align: center !important;
          margin-top: 3rem !important;
          font-size: 1rem !important;
          color: #888 !important;
          border-top: none !important;
        }
        .footer-links a {
          color: #666 !important;
          margin: 0 1rem !important;
          text-decoration: none !important;
          transition: color 0.2s !important;
        }
        .footer-links a:hover {
          color: #007bff !important;
        }
      `;
      document.head.appendChild(styleElement);

      this.currentTool = tool;
    } catch (error) {
      console.error(`Failed to load tool ${toolId}:`, error);
      this.showErrorMessage(tool.name);
    }
  }

  // Show error message when tool loading fails
  showErrorMessage(message) {
    document.getElementById("main-content").innerHTML = `
      <div class="error-message">
        <h2>Error</h2>
        <p>${message}</p>
      </div>
    `;
  }

  // Load a resource (CSS or JS)
  async loadResource(type, url) {
    if (this.loadedResources.has(url)) return;

    return new Promise((resolve, reject) => {
      const element = document.createElement(
        type === "stylesheet" ? "link" : "script"
      );

      if (type === "stylesheet") {
        element.rel = "stylesheet";
        element.href = url;
      } else {
        element.src = url;
      }

      element.onload = () => {
        this.loadedResources.add(url);
        resolve();
      };
      element.onerror = reject;

      document.head.appendChild(element);
    });
  }

  // Clean up resources from the current tool
  async cleanupCurrentTool() {
    if (!this.currentTool) return;

    // Remove tool-specific styles
    const toolStyles = document.querySelectorAll(
      `link[href^="${this.currentTool.path}"]`
    );
    toolStyles.forEach((style) => style.remove());

    // Remove tool-specific scripts
    const toolScripts = document.querySelectorAll(
      `script[src^="${this.currentTool.path}"]`
    );
    toolScripts.forEach((script) => script.remove());

    // Remove any override styles we added
    const overrideStyles = document.querySelectorAll('style');
    overrideStyles.forEach(style => {
      if (style.textContent.includes('/* Override tool-specific footer styles')) {
        style.remove();
      }
    });

    this.currentTool = null;
  }

  // Helper to capitalize first letter
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

// Initialize tool manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const toolManager = new ToolManager();
  toolManager.loadTools();
});
