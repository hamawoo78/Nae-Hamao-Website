// Fetch and render projects from JSON
async function loadProjects(filterType = null) {
    try {
        const response = await fetch('../projects.json');
        const data = await response.json();
        
        // Filter projects by type if specified
        let projects = data.projects;
        if (filterType) {
            projects = projects.filter(project => project.type === filterType);
        }
        
        // Render projects to the grid
        renderProjects(projects);
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
    link.href = project.link;
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
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'project-title';
    titleDiv.textContent = project.title;
    
    const descP = document.createElement('p');
    descP.style.color = '#f9eeeb';
    descP.style.marginTop = '10px';
    descP.style.fontSize = '15px';
    descP.textContent = project.description;
    
    contentDiv.appendChild(titleDiv);
    contentDiv.appendChild(descP);
    
    // Add additional link if it exists
    if (project.additionalLink) {
        const additionalLink = document.createElement('a');
        additionalLink.href = project.additionalLink;
        additionalLink.className = 'project-link';
        additionalLink.textContent = project.additionalLinkText || '→ View';
        additionalLink.onclick = (e) => e.stopPropagation(); // Prevent card link from triggering
        contentDiv.appendChild(additionalLink);
    }
    
    card.appendChild(imageDiv);
    card.appendChild(contentDiv);
    link.appendChild(card);
    
    return link;
}
