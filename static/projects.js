// Get the parameter value
const urlParams = new URLSearchParams(window.location.search);
const filterType = urlParams.get('type');
console.log(filterType); 

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
    loadProjects(filterType);
});

// Fetch and render projects from JSON
async function loadProjects(filterType = null) {
    try {
        const response = await fetch('../projects.json');
        const data = await response.json();
        
        // Filter projects by type if specified
        let projects = data.projects;
        let type = data.page_type;
        // console.log(type); 

        if (filterType) {
            projects = projects.filter(project => project.type === filterType);
            page_type = type.filter(type => type.type === filterType);
            // console.log(page_type);
        }
        
        // Render projects to the grid
        renderProjects(projects);
        displayProjectTitle(page_type[0])
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function renderProjects(projects) {
    const projectGrid = document.querySelector('.project-grid');
    
    if (!projectGrid) {
        console.error('Project grid not found');
        return;
    }
    
    // Clear existing content
    projectGrid.innerHTML = '';
    
    // Create and append project cards
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const link = document.createElement('a');
    link.href = 'detail.html?id=' + project.id;
    link.className = 'project-card-link';
    
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const imageDiv = document.createElement('div');
    imageDiv.className = 'project-image';
    
    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.title;
    imageDiv.appendChild(img);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'project-content';
    contentDiv.style.backgroundColor = '#174441';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'project-title';
    titleDiv.textContent = project.title;
    titleDiv.style.color = '#f5b8a8';

    const dateP = document.createElement('p');
    dateP.style.color = '#f9eeeb';
    dateP.style.marginTop = '10px';
    dateP.style.fontSize = '15px';
    dateP.textContent = 'Created ' + project.date;
    
    // const descP = document.createElement('p');
    // descP.style.color = '#f9eeeb';
    // descP.style.marginTop = '10px';
    // descP.style.fontSize = '15px';
    // descP.textContent = project.description;
    
    contentDiv.appendChild(titleDiv);
    contentDiv.appendChild(dateP);
    // contentDiv.appendChild(descP);
    

    
    card.appendChild(imageDiv);
    card.appendChild(contentDiv);
    link.appendChild(card);
    
    return link;
}

function displayProjectTitle(project) {
    console.log(project.title);
    document.getElementById('page_tittle').textContent = project.title;
    document.getElementById('page_description').textContent = project.description;
}