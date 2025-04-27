// Function to load HTML components
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(`Error loading component ${componentPath}:`, error);
  }
}

// Load all components when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('nav-component', 'src/components/nav.html');
  loadComponent('footer-component', 'src/components/footer.html');
});
