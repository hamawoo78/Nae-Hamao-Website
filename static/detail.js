// Get the parameter value
const urlParams = new URLSearchParams(window.location.search);
const project_id = urlParams.get('id');
console.log(project_id); 

// Toggle mobile menu
function toggleMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuItems = document.getElementById('items');
    menuToggle.classList.toggle('active');
    menuItems.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('#items a').forEach(link => {
    link.addEventListener('click', () => {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const menuItems = document.getElementById('items');
        menuToggle.classList.remove('active');
        menuItems.classList.remove('active');
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProjects(project_id);
});

// Fetch and render projects from JSON
async function loadProjects(project_id = null) {
    try {
        const response = await fetch('../projects.json');
        const data = await response.json();
        
        // Filter projects by type if specified
        let projects = data.projects;
        console.log(typeof project_id);

        if (project_id) {
            let project = projects.filter(projects => projects.id === parseInt(project_id));

            // Render projects to the grid
            displayProjectCard(project[0])
        }
        

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}



function displayProjectCard(project) {
    console.log(project);

    document.getElementById('title').textContent = project.title;
    document.getElementById('screenshot').src = project.image;
    document.getElementById('overview').textContent = project.overview;
    document.getElementById('keyFeatures').textContent = project.keyFeatures;
    document.getElementById('howItWorks').textContent = project.howItWorks;
    document.getElementById('techStack').textContent = project.techStack;
    if (project.link){
        document.getElementById('sourceLinkBottom').href = project.link;
        document.getElementById('sourceLinkBottom').style.display = 'inline-block';
    }

    
    // Set additional link if it exists
    if (project.additionalLink) {
        const additionalLink = document.getElementById('additionalLinkBottom');
        additionalLink.href = project.additionalLink;
        additionalLink.textContent = project.additionalLinkText || 'Additional Link';
        additionalLink.style.display = 'inline-block';
    }
}
