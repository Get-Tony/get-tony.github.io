// Inventory Viewer Tool Logic (modularized for v2)
(function () {
  // DOM elements
  const inputSection = document.getElementById("inputSection");
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const browseButton = document.getElementById("browseButton");
  const fileSizeWarning = document.getElementById("fileSizeWarning");
  const jsonInput = document.getElementById("jsonInput");
  const loadButton = document.getElementById("loadButton");
  const clearButton = document.getElementById("clearButton");
  const searchSection = document.getElementById("searchSection");
  const searchInput = document.getElementById("searchInput");
  const clearSearchButton = document.getElementById("clearSearchButton");
  const searchTypeSelect = document.getElementById("searchTypeSelect");
  const expandAllButton = document.getElementById("expandAllButton");
  const shrinkAllButton = document.getElementById("shrinkAllButton");
  const emptyState = document.getElementById("emptyState");
  const inventoryTree = document.getElementById("inventoryTree");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const progressBar = document.getElementById("progressBar");
  const loadDemoButton = document.getElementById("loadDemoButton");

  // Directly attach the event listener to the loadDemoButton
  if (loadDemoButton) {
    loadDemoButton.onclick = function () {
      loadDemoInventory();
    };
  }

  const jsonError = document.createElement("div");
  jsonError.className = "json-error";
  inputSection.insertBefore(jsonError, inputSection.firstChild);
  const showInputButton = document.getElementById("showInputButton");

  let currentInventory = null;

  // Demo inventory data
  const demoInventory = {
    "all": {
      "children": [
        "production",
        "staging",
        "ungrouped"
      ],
      "vars": {
        "ansible_user": "deploy",
        "ansible_ssh_private_key_file": "~/.ssh/id_rsa",
        "inventory_name": "Full Feature Inventory",
        "version": 2.0,
        "description": "Shows every static INI feature."
      }
    },
    "production": {
      "children": [
        "webservers",
        "dbservers",
        "appservers"
      ],
      "vars": {
        "env": "production",
        "logging_enabled": true
      }
    },
    "webservers": {
      "hosts": [
        "web1.example.com",
        "web2.example.com"
      ],
      "vars": {
        "max_clients": 200,
        "request_timeout": 300
      }
    },
    "dbservers": {
      "hosts": [
        "db1.example.com",
        "db2.example.com"
      ],
      "vars": {
        "max_connections": 1000,
        "maintenance_window": "Sun 02:00-03:00"
      }
    },
    "appservers": {
      "hosts": [
        "app01.example.com",
        "app02.example.com",
        "app03.example.com"
      ],
      "vars": {
        "worker_processes": 4,
        "memory_limit": "8G"
      }
    },
    "staging": {
      "children": [
        "webservers",
        "dbservers",
        "appservers"
      ],
      "vars": {
        "env": "staging",
        "logging_enabled": false,
        "ansible_port": 2222
      }
    },
    "ungrouped": {
      "hosts": [
        "legacy.example.com"
      ],
      "vars": {}
    },
    "_meta": {
      "hostvars": {
        "web1.example.com": {
          "ansible_host": "192.0.2.10",
          "http_port": 80,
          "role": "frontend",
          "ssl_certificate": "/etc/ssl/web1.crt",
          "ntp_server": "ntp1.example.com",
          "ansible_user": "deploy",
          "ansible_ssh_private_key_file": "~/.ssh/id_rsa",
          "inventory_name": "Full Feature Inventory",
          "version": 2.0,
          "description": "Shows every static INI feature.",
          "env": "production",
          "logging_enabled": true
        },
        "web2.example.com": {
          "ansible_host": "192.0.2.11",
          "http_port": 8080,
          "role": "frontend",
          "ansible_user": "deploy",
          "ansible_ssh_private_key_file": "~/.ssh/id_rsa",
          "inventory_name": "Full Feature Inventory",
          "version": 2.0,
          "description": "Shows every static INI feature.",
          "env": "production",
          "logging_enabled": true
        },
        "db1.example.com": {
          "ansible_host": "db1.internal.example.com",
          "db_port": 5432,
          "replication": true,
          "backup_schedule": "daily",
          "ansible_user": "deploy",
          "ansible_ssh_private_key_file": "~/.ssh/id_rsa",
          "inventory_name": "Full Feature Inventory",
          "version": 2.0,
          "description": "Shows every static INI feature.",
          "env": "production",
          "logging_enabled": true
        },
        "db2.example.com": {
          "ansible_host": "db2.internal.example.com",
          "db_port": 5432,
          "ansible_user": "deploy",
          "ansible_ssh_private_key_file": "~/.ssh/id_rsa",
          "inventory_name": "Full Feature Inventory",
          "version": 2.0,
          "description": "Shows every static INI feature.",
          "env": "production",
          "logging_enabled": true
        },
        "app01.example.com": {
          "ansible_host": "10.0.0.101",
          "app_role": "worker",
          "ansible_user": "deploy",
          "ansible_ssh_private_key_file": "~/.ssh/id_rsa",
          "inventory_name": "Full Feature Inventory",
          "version": 2.0,
          "description": "Shows every static INI feature.",
          "worker_processes": 4,
          "memory_limit": "8G",
          "env": "production",
          "logging_enabled": true
        },
        "app02.example.com": {
          "ansible_host": "10.0.0.102",
          "app_role": "worker",
          "ansible_user": "deploy",
          "ansible_ssh_private_key_file": "~/.ssh/id_rsa",
          "inventory_name": "Full Feature Inventory",
          "version": 2.0,
          "description": "Shows every static INI feature.",
          "worker_processes": 4,
          "memory_limit": "8G",
          "env": "production",
          "logging_enabled": true
        },
        "app03.example.com": {
          "ansible_host": "10.0.0.103",
          "app_role": "worker",
          "ansible_user": "deploy",
          "ansible_ssh_private_key_file": "~/.ssh/id_rsa",
          "inventory_name": "Full Feature Inventory",
          "version": 2.0,
          "description": "Shows every static INI feature.",
          "worker_processes": 4,
          "memory_limit": "8G",
          "env": "production",
          "logging_enabled": true
        },
        "legacy.example.com": {
          "ansible_host": "198.51.100.5",
          "role": "legacy_app",
          "support_contact": "legacy-team@example.com",
          "ansible_user": "deploy",
          "ansible_ssh_private_key_file": "~/.ssh/id_rsa",
          "inventory_name": "Full Feature Inventory",
          "version": 2.0,
          "description": "Shows every static INI feature.",
          "env": "staging",
          "logging_enabled": false,
          "ansible_port": 2222
        }
      }
    }
  };


  // Load demo inventory
  function loadDemoInventory() {
    jsonInput.value = JSON.stringify(demoInventory, null, 2);
    try {
      currentInventory = JSON.parse(jsonInput.value);
      hideError();
      renderInventory(currentInventory);
      searchSection.style.display = "flex";
      emptyState.style.display = "none";
      inventoryTree.style.display = "block";
    } catch (e) {
      showError("Invalid JSON format: " + e.message);
    }
  }

  // --- Inventory Rendering and Helpers ---
  function renderInventory(data) {
    inventoryTree.innerHTML = "";
    if (data && typeof data === "object") {
      preprocessInventoryData(data);
      if (data._meta) {
        renderMetadata(data._meta);
      }
      if (data.all) {
        const allGroup = createTreeItem("all", "group", true);
        inventoryTree.appendChild(allGroup);
        const allContent = allGroup.querySelector(".tree-item-content");
        if (data.all.vars && Object.keys(data.all.vars).length > 0) {
          const varsItem = createTreeItem("vars", "subsection", true);
          allContent.appendChild(varsItem);
          const varsContent = varsItem.querySelector(".tree-item-content");
          renderVariables(data.all.vars, varsContent);
        }
        if (data.all.children && Array.isArray(data.all.children) && data.all.children.length > 0) {
          const childrenItem = createTreeItem("children", "subsection", true);
          allContent.appendChild(childrenItem);
          const childrenContent = childrenItem.querySelector(".tree-item-content");
          data.all.children.forEach((childName) => {
            if (data[childName]) {
              renderGroup(childName, data, childrenContent);
            }
          });
        }
      }
      const groupsSection = createTreeItem("Groups", "section", true);
      inventoryTree.appendChild(groupsSection);
      const groupsContent = groupsSection.querySelector(".tree-item-content");
      const topGroups = getTopLevelGroups(data);
      topGroups.sort().forEach((groupName) => {
        renderGroup(groupName, data, groupsContent);
      });
    } else {
      showError("Invalid inventory format");
    }
  }
  function preprocessInventoryData(data) {
    if (data && data._meta && data._meta.hostvars) {
      if (data.all && data.all.vars) {
        Object.keys(data._meta.hostvars).forEach((hostname) => {
          let hostVars = data._meta.hostvars[hostname];
          if (!hostVars) {
            data._meta.hostvars[hostname] = {};
            hostVars = data._meta.hostvars[hostname];
          }
          Object.keys(data.all.vars).forEach((varName) => {
            if (hostVars[varName] === undefined) {
              hostVars[varName] = data.all.vars[varName];
            }
          });
        });
      }
    }
  }
  function getTopLevelGroups(inventory) {
    const allGroups = Object.keys(inventory).filter((key) => key !== "_meta" && key !== "all");
    const childGroups = new Set();
    for (const groupName of allGroups) {
      const group = inventory[groupName];
      if (group && group.children) {
        group.children.forEach((child) => childGroups.add(child));
      }
    }
    return allGroups.filter((g) => !childGroups.has(g));
  }
  function renderGroup(groupName, inventory, container) {
    const group = inventory[groupName];
    if (!group) return;
    const groupItem = createTreeItem(groupName, "group", true);
    container.appendChild(groupItem);
    const groupContent = groupItem.querySelector(".tree-item-content");
    const directHosts = group.hosts || [];
    if (directHosts.length > 0) {
      const hostsItem = createTreeItem("Direct Hosts", "subsection", true);
      groupContent.appendChild(hostsItem);
      const hostsContent = hostsItem.querySelector(".tree-item-content");
      directHosts.forEach((host) => {
        let ipAddress = "";
        if (inventory._meta && inventory._meta.hostvars && inventory._meta.hostvars[host]) {
          ipAddress = inventory._meta.hostvars[host].ansible_host || "";
        }
        const hostItem = createHostItem(host, ipAddress);
        hostsContent.appendChild(hostItem);
      });
    }
    const inheritedHosts = getInheritedHosts(groupName, inventory);
    if (inheritedHosts.length > 0) {
      const inhItem = createTreeItem("Inherited Hosts", "subsection", true);
      groupContent.appendChild(inhItem);
      const inhContent = inhItem.querySelector(".tree-item-content");
      inheritedHosts.forEach(({ host, from }) => {
        let ipAddress = "";
        if (inventory._meta && inventory._meta.hostvars && inventory._meta.hostvars[host]) {
          ipAddress = inventory._meta.hostvars[host].ansible_host || "";
        }
        const hostItem = createHostItem(host, ipAddress, from);
        inhContent.appendChild(hostItem);
      });
    }
    if (group.children && Array.isArray(group.children) && group.children.length > 0) {
      group.children.sort().forEach((childName) => {
        renderGroup(childName, inventory, groupContent);
      });
    }
    if (group.vars && typeof group.vars === "object") {
      const varsItem = createTreeItem("vars", "subsection", true);
      groupContent.appendChild(varsItem);
      const varsContent = varsItem.querySelector(".tree-item-content");
      renderVariables(group.vars, varsContent);
    }
  }
  function getInheritedHosts(groupName, inventory) {
    const group = inventory[groupName];
    if (!group || !group.children) return [];
    let inherited = [];
    for (const child of group.children) {
      const childHosts = getAllGroupHosts(child, inventory);
      const directHosts = group.hosts || [];
      for (const host of childHosts) {
        if (!directHosts.includes(host)) {
          inherited.push({ host, from: child });
        }
      }
    }
    return inherited;
  }
  function getAllGroupHosts(groupName, inventory, visited = new Set()) {
    if (visited.has(groupName)) return [];
    visited.add(groupName);
    const group = inventory[groupName];
    if (!group) return [];
    let allHosts = [];
    if (group.hosts && Array.isArray(group.hosts)) {
      allHosts = [...group.hosts];
    }
    if (group.children && Array.isArray(group.children)) {
      for (const childName of group.children) {
        const childHosts = getAllGroupHosts(childName, inventory, new Set([...visited]));
        allHosts = [...allHosts, ...childHosts];
      }
    }
    return allHosts;
  }
  function createTreeItem(label, type, expanded) {
    const item = document.createElement("div");
    item.className = "tree-item";
    item.setAttribute("data-label", label.toLowerCase());
    item.setAttribute("data-type", type);
    const header = document.createElement("div");
    header.className = "tree-item-header";
    let labelClass = "";
    if (type === "group") labelClass = "tree-item-group";
    if (type === "host") labelClass = "tree-item-host";
    if (type === "variable") labelClass = "tree-item-key";
    header.innerHTML = `<span class="tree-item-icon">${expanded ? "▼" : "▶"}</span> <span class="${labelClass}">${escapeHtml(label)}</span>`;
    const content = document.createElement("div");
    content.className = "tree-item-content";
    if (expanded) content.classList.add("expanded");
    item.appendChild(header);
    item.appendChild(content);
    header.addEventListener("click", function () {
      const icon = header.querySelector(".tree-item-icon");
      if (content.classList.contains("expanded")) {
        content.classList.remove("expanded");
        icon.textContent = "▶";
      } else {
        content.classList.add("expanded");
        icon.textContent = "▼";
      }
    });
    return item;
  }
  function createHostItem(hostname, ipAddress, sourceGroup = "") {
    const item = document.createElement("div");
    item.className = "tree-item";
    item.setAttribute("data-label", hostname.toLowerCase());
    item.setAttribute("data-type", "host");
    item.setAttribute("data-hostname", hostname);
    const header = document.createElement("div");
    header.className = "tree-item-header";
    header.setAttribute("role", "button");
    header.setAttribute("tabindex", "0");
    header.setAttribute("aria-label", `Host ${hostname}${ipAddress ? ` (${ipAddress})` : ""}`);
    let displayHTML = `<span class="tree-item-icon" aria-hidden="true">▶</span> <span class="tree-item-host">${escapeHtml(hostname)}</span>`;
    if (ipAddress) displayHTML += `<span class="host-ip">(${escapeHtml(ipAddress)})</span>`;
    if (sourceGroup) displayHTML += `<span class="host-ip"> - inherited from ${escapeHtml(sourceGroup)}</span>`;
    displayHTML += `<span class="tooltip-text">Click to view host variables</span>`;
    header.innerHTML = displayHTML;
    item.appendChild(header);
    const content = document.createElement("div");
    content.className = "tree-item-content";
    item.appendChild(content);
    if (currentInventory && currentInventory._meta && currentInventory._meta.hostvars && currentInventory._meta.hostvars[hostname]) {
      const hostVars = currentInventory._meta.hostvars[hostname];
      const varLabel = document.createElement("div");
      varLabel.className = "tree-item host-vars";
      varLabel.innerHTML = `<span class="tree-item-key">Host Variables</span>`;
      content.appendChild(varLabel);
      const varsContainer = document.createElement("div");
      varsContainer.className = "host-vars";
      content.appendChild(varsContainer);
      renderVariables(hostVars, varsContainer);
    }
    function renderHostVars() {
      if (content.childElementCount === 0) {
        content.innerHTML = `<div class="tree-item host-vars"><span class="tree-item-key">Loading variables</span><span class="host-vars-loading" aria-label="Loading variables"></span></div>`;
        setTimeout(() => {
          content.innerHTML = "";
          if (currentInventory && currentInventory._meta && currentInventory._meta.hostvars && currentInventory._meta.hostvars[hostname]) {
            const hostVars = currentInventory._meta.hostvars[hostname];
            const varLabel = document.createElement("div");
            varLabel.className = "tree-item host-vars";
            varLabel.innerHTML = `<span class="tree-item-key">Host Variables</span>`;
            content.appendChild(varLabel);
            const varsContainer = document.createElement("div");
            varsContainer.className = "host-vars";
            content.appendChild(varsContainer);
            renderVariables(hostVars, varsContainer);
          }
        }, 10);
      }
    }
    function expandHostNode() {
      if (content.childElementCount === 0) {
        renderHostVars();
      }
      content.classList.add("expanded");
      const icon = header.querySelector(".tree-item-icon");
      if (icon) icon.textContent = "▼";
    }
    item.expandHostNode = expandHostNode;
    header.addEventListener("click", function (e) {
      const icon = this.querySelector(".tree-item-icon");
      if (content.classList.contains("expanded")) {
        content.classList.remove("expanded");
        icon.textContent = "▶";
      } else {
        expandHostNode();
      }
    });
    header.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
    return item;
  }
  function renderVariables(vars, container) {
    if (!vars || typeof vars !== "object") return;
    Object.keys(vars).forEach((key) => {
      const value = vars[key];
      const varItem = document.createElement("div");
      varItem.className = "tree-item";
      varItem.setAttribute("data-label", key.toLowerCase());
      varItem.setAttribute("data-type", "variable");
      if (typeof value === "object" && value !== null) {
        varItem.innerHTML = `<div class="tree-item-header"><span class="tree-item-icon">▶</span> <span class="tree-item-key">${escapeHtml(key)}</span></div><div class="tree-item-content">${renderObjectValue(value)}</div>`;
        const header = varItem.querySelector(".tree-item-header");
        const content = varItem.querySelector(".tree-item-content");
        const icon = header.querySelector(".tree-item-icon");
        header.addEventListener("click", function () {
          if (content.classList.contains("expanded")) {
            content.classList.remove("expanded");
            icon.textContent = "▶";
          } else {
            content.classList.add("expanded");
            icon.textContent = "▼";
          }
        });
      } else {
        varItem.innerHTML = `<span class="tree-item-key">${escapeHtml(key)}</span>: <span class="tree-item-value">${escapeHtml(JSON.stringify(value))}</span>`;
      }
      container.appendChild(varItem);
    });
  }
  function renderObjectValue(obj) {
    if (Array.isArray(obj)) {
      return obj.map(item => {
        if (typeof item === "object" && item !== null) {
          return `<div class="tree-item">${renderObjectValue(item)}</div>`;
        }
        return `<div class="tree-item"><span class="tree-item-value">${escapeHtml(JSON.stringify(item))}</span></div>`;
      }).join("");
    }
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return `<div class="tree-item"><span class="tree-item-key">${escapeHtml(key)}</span>: ${renderObjectValue(value)}</div>`;
      }
      return `<div class="tree-item"><span class="tree-item-key">${escapeHtml(key)}</span>: <span class="tree-item-value">${escapeHtml(JSON.stringify(value))}</span></div>`;
    }).join("");
  }
  function renderMetadata(meta) {
    if (!meta) return;
    const metaSection = createTreeItem("Inventory Metadata", "section", true);
    inventoryTree.appendChild(metaSection);
    const metaContent = metaSection.querySelector(".tree-item-content");
    const allHosts = new Set();
    function collectHosts(inventory) {
      for (const [key, value] of Object.entries(inventory)) {
        if (key === "_meta") continue;
        if (value.hosts) {
          if (Array.isArray(value.hosts)) {
            value.hosts.forEach((host) => allHosts.add(host));
          } else if (typeof value.hosts === "object") {
            Object.keys(value.hosts).forEach((host) => allHosts.add(host));
          }
        }
        if (value.children && Array.isArray(value.children)) {
          value.children.forEach((child) => {
            if (inventory[child]) {
              collectHosts({ [child]: inventory[child] });
            }
          });
        }
      }
    }
    collectHosts(currentInventory);
    const metaInfo = document.createElement("div");
    metaInfo.className = "tree-item";
    metaInfo.innerHTML = `<span class="tree-item-key">Total Hosts</span>: <span class="tree-item-value">${allHosts.size}</span>`;
    metaContent.appendChild(metaInfo);
    const timestamp = new Date().toISOString();
    const timeInfo = document.createElement("div");
    timeInfo.className = "tree-item";
    timeInfo.innerHTML = `<span class="tree-item-key">Loaded At</span>: <span class="tree-item-value">${timestamp}</span>`;
    metaContent.appendChild(timeInfo);
  }
  function escapeHtml(unsafe) {
    if (typeof unsafe !== "string") return unsafe;
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  // Attach to window for use by other functions
  window.renderInventory = renderInventory;

  // --- File Upload and UI Event Listeners ---
  // File upload: drag-and-drop
  uploadArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.add("drag-over");
  });
  uploadArea.addEventListener("dragleave", function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.remove("drag-over");
  });
  uploadArea.addEventListener("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.remove("drag-over");
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  });
  // File upload: browse
  browseButton.addEventListener("click", function () {
    fileInput.click();
  });
  fileInput.addEventListener("change", function () {
    if (this.files.length > 0) {
      handleFileUpload(this.files[0]);
    }
  });
  // Load inventory from textarea
  loadButton.addEventListener("click", function () {
    loadInventoryFromInput(true);
  });
  // Clear data
  clearButton.addEventListener("click", function () {
    jsonInput.value = "";
    currentInventory = null;
    hideError();
    searchSection.style.display = "none";
    emptyState.style.display = "block";
    inventoryTree.style.display = "none";
    inventoryTree.innerHTML = "";
    searchInput.value = "";
    fileInput.value = "";
    inputSection.classList.remove("collapsed");
  });

  // --- Additional UI Event Listeners ---
  // File size warning
  fileInput.addEventListener("change", function () {
    if (this.files.length > 0) {
      const file = this.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB
        fileSizeWarning.style.display = "block";
      } else {
        fileSizeWarning.style.display = "none";
      }
    }
  });

  // Expand all nodes
  expandAllButton.addEventListener("click", function () {
    const allItems = inventoryTree.querySelectorAll(".tree-item");
    allItems.forEach(item => {
      const content = item.querySelector(".tree-item-content");
      const icon = item.querySelector(".tree-item-icon");
      if (content && icon) {
        content.classList.add("expanded");
        icon.textContent = "▼";
      }
    });
  });

  // Shrink all nodes
  shrinkAllButton.addEventListener("click", function () {
    const allItems = inventoryTree.querySelectorAll(".tree-item");
    allItems.forEach(item => {
      const content = item.querySelector(".tree-item-content");
      const icon = item.querySelector(".tree-item-icon");
      if (content && icon) {
        content.classList.remove("expanded");
        icon.textContent = "▶";
      }
    });
  });

  // Loading overlay and progress bar
  function showLoading() {
    loadingOverlay.style.display = "flex";
    progressBar.style.width = "0%";
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      progressBar.style.width = progress + "%";
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loadingOverlay.style.display = "none";
        }, 500);
      }
    }, 100);
  }

  // Helper: handle file upload
  function handleFileUpload(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      jsonInput.value = e.target.result;
      loadInventoryFromInput(true);
    };
    reader.onerror = function () {
      showError("Error reading the file");
    };
    reader.readAsText(file);
  }
  // Helper: show/hide error
  function showError(message) {
    jsonError.textContent = message;
    jsonError.style.display = "block";
  }
  function hideError() {
    jsonError.style.display = "none";
  }
  // Helper: load inventory from textarea
  function loadInventoryFromInput(autoHide) {
    const jsonData = jsonInput.value.trim();
    if (!jsonData) {
      showError("Please provide JSON inventory data");
      return;
    }
    try {
      currentInventory = JSON.parse(jsonData);
      hideError();
      if (window.renderInventory) {
        window.renderInventory(currentInventory);
      } else {
        renderInventory(currentInventory);
      }
      searchSection.style.display = "flex";
      emptyState.style.display = "none";
      inventoryTree.style.display = "block";
    } catch (e) {
      showError("Invalid JSON format: " + e.message);
    }
  }

  // --- Search Functionality ---
  searchInput.addEventListener("input", function () {
    clearSearchButton.style.display = this.value ? "block" : "none";
    if (currentInventory) {
      const searchTerm = this.value.toLowerCase();
      const searchType = searchTypeSelect.value;
      if (searchTerm && (searchType === "all" || searchType === "vars")) {
        expandHostNodesForSearch();
      }
      filterInventory(searchTerm, searchType);
    }
  });
  searchTypeSelect.addEventListener("change", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const searchType = this.value;
    filterInventory(searchTerm, searchType);
  });
  clearSearchButton.addEventListener("click", function () {
    searchInput.value = "";
    clearSearchButton.style.display = "none";
    if (currentInventory) {
      filterInventory("", searchTypeSelect.value);
    }
  });

  // Helper: highlight text in element
  function highlightTextInElement(element, searchTerm) {
    if (!element || !element.textContent) return;
    const text = element.textContent;
    const lowerText = text.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();
    if (!lowerText.includes(lowerSearchTerm)) return;
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    let currentIndex = 0;
    let match;
    while ((match = lowerText.indexOf(lowerSearchTerm, currentIndex)) !== -1) {
      if (match > currentIndex) {
        element.appendChild(document.createTextNode(text.substring(currentIndex, match)));
      }
      const highlightSpan = document.createElement("span");
      highlightSpan.className = "text-highlight";
      highlightSpan.textContent = text.substring(match, match + searchTerm.length);
      element.appendChild(highlightSpan);
      currentIndex = match + searchTerm.length;
    }
    if (currentIndex < text.length) {
      element.appendChild(document.createTextNode(text.substring(currentIndex)));
    }
  }

  // Helper: show item and all parents
  function showItemAndParents(item) {
    item.style.display = "";
    let parent = item.parentElement;
    while (parent) {
      if (parent.classList.contains("tree-item") || parent.classList.contains("tree-item-content")) {
        parent.style.display = "";
        if (parent.classList.contains("tree-item-content")) {
          const parentItem = parent.parentElement;
          if (parentItem) parentItem.style.display = "";
        }
      }
      parent = parent.parentElement;
    }
  }

  // Helper: expand host nodes for variable search
  function expandHostNodesForSearch() {
    const allHostItems = inventoryTree.querySelectorAll('.tree-item[data-type="host"]');
    allHostItems.forEach(item => {
      if (typeof item.expandHostNode === "function") {
        item.expandHostNode();
      }
    });
  }

  // Main filterInventory logic from original
  function filterInventory(searchTerm, searchType) {
    const allItems = inventoryTree.querySelectorAll(".tree-item");
    if (!searchTerm) {
      allItems.forEach((item) => {
        item.style.display = "";
        item.classList.remove("highlight");
        item.classList.remove("contains-match");
      });
      // Remove text highlights
      const highlightedText = inventoryTree.querySelectorAll(".text-highlight");
      highlightedText.forEach((el) => {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize();
      });
      // Collapse all except top-level
      inventoryTree.querySelectorAll('.tree-item:not([data-type="section"]) .tree-item-content.expanded').forEach((content) => {
        content.classList.remove("expanded");
        const icon = content.parentElement.querySelector(".tree-item-icon");
        if (icon) icon.textContent = "▶";
      });
      return;
    }
    // Make all items visible
    allItems.forEach((item) => {
      item.style.display = "";
      item.classList.remove("highlight");
      item.classList.remove("contains-match");
    });
    // Remove existing highlights
    const existingHighlights = inventoryTree.querySelectorAll(".text-highlight");
    existingHighlights.forEach((el) => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
    let matchedItems = [];
    if (searchType === "all" || searchType === "hosts") {
      const hostItems = inventoryTree.querySelectorAll('.tree-item[data-type="host"]');
      hostItems.forEach((item) => {
        const label = item.getAttribute("data-label");
        const hostText = item.textContent.toLowerCase();
        if (label.includes(searchTerm) || hostText.includes(searchTerm)) {
          matchedItems.push(item);
          const hostnameElement = item.querySelector(".tree-item-host");
          if (hostnameElement) highlightTextInElement(hostnameElement, searchTerm);
        }
      });
    }
    if (searchType === "all" || searchType === "groups") {
      const groupItems = inventoryTree.querySelectorAll('.tree-item[data-type="group"]');
      groupItems.forEach((item) => {
        const label = item.getAttribute("data-label");
        if (label.includes(searchTerm)) {
          matchedItems.push(item);
          const groupElement = item.querySelector(".tree-item-group");
          if (groupElement) highlightTextInElement(groupElement, searchTerm);
        }
      });
    }
    if (searchType === "all" || searchType === "vars") {
      // Search variable keys and values
      const keyItems = inventoryTree.querySelectorAll(".tree-item-key");
      keyItems.forEach((item) => {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
          const treeItem = item.closest(".tree-item");
          if (treeItem && !matchedItems.includes(treeItem)) matchedItems.push(treeItem);
          highlightTextInElement(item, searchTerm);
        }
      });
      const valueItems = inventoryTree.querySelectorAll(".tree-item-value");
      valueItems.forEach((item) => {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
          const treeItem = item.closest(".tree-item");
          if (treeItem && !matchedItems.includes(treeItem)) matchedItems.push(treeItem);
          highlightTextInElement(item, searchTerm);
        }
      });
    }
    // Hide non-matched items
    if (matchedItems.length > 0) {
      allItems.forEach((item) => {
        item.style.display = "none";
      });
      matchedItems.forEach((item) => {
        item.classList.add("contains-match");
        showItemAndParents(item);
        // Expand parent containers
        let parent = item.parentElement;
        while (parent) {
          if (parent.classList.contains("tree-item-content")) {
            parent.classList.add("expanded");
            const header = parent.parentElement.querySelector(".tree-item-header");
            if (header) {
              const icon = header.querySelector(".tree-item-icon");
              if (icon) icon.textContent = "▼";
            }
          }
          parent = parent.parentElement;
        }
      });
    }
  }

  // Event Listeners
  document.addEventListener("DOMContentLoaded", function () {
    // Try to attach the event listener again during DOMContentLoaded
    const demoButton = document.getElementById("loadDemoButton");
    if (demoButton) {
      demoButton.addEventListener("click", function () {
        loadDemoInventory();
      });
    }
    // Clear demo when pasting or browsing
    jsonInput.addEventListener("paste", function () {
      if (jsonInput.value === JSON.stringify(demoInventory, null, 2)) {
        jsonInput.value = "";
      }
    });
    browseButton.addEventListener("click", function () {
      if (jsonInput.value === JSON.stringify(demoInventory, null, 2)) {
        jsonInput.value = "";
      }
    });
  });

  // Also try to attach the event listener when the window is fully loaded
  window.addEventListener("load", function () {
    const demoButton = document.getElementById("loadDemoButton");
    if (demoButton) {
      demoButton.addEventListener("click", function () {
        loadDemoInventory();
      });
    }
  });
})();

// Collapsible sections logic (run after DOMContentLoaded, outside IIFE)
function setupCollapsibles() {
  // Instructions
  const toggleInstructions = document.getElementById('toggleInstructions');
  const instructionsContent = document.getElementById('instructionsContent');
  if (toggleInstructions && instructionsContent) {
    toggleInstructions.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      instructionsContent.classList.toggle('collapsed-content', expanded);
      // Update arrow
      const arrow = this.querySelector('.arrow');
      if (arrow) arrow.textContent = expanded ? '▼' : '▲';
    });
  }
  // Input
  const toggleInput = document.getElementById('toggleInput');
  const inputSection = document.getElementById('inputSection');
  if (toggleInput && inputSection) {
    toggleInput.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      inputSection.classList.toggle('collapsed-content', expanded);
      // Update arrow
      const arrow = this.querySelector('.arrow');
      if (arrow) arrow.textContent = expanded ? '▼' : '▲';
    });
  }
}

// Instead of only using DOMContentLoaded, run setupCollapsibles immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupCollapsibles);
} else {
  setupCollapsibles();
}
