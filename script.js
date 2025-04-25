// Initial data to populate the portfolio
let weekData = [
    {
        id: 1,
        title: "SEMANA 01",
        subtitle: "Diagrama y Practica",
        icon: "code",
        links: [
            { text: "Ver Miro", url: "#" },
            { text: "Ver Canva", url: "#" }
        ]
    },
    {
        id: 2,
        title: "Modelo Relacional",
        subtitle: "Semana 02",
        icon: "db",
        links: [
            { text: "Enunciado 1", url: "#" },
            { text: "Enunciado 2", url: "#" }
        ]
    },
    {
        id: 3,
        title: "Semana 03",
        subtitle: "Programación",
        icon: "code",
        links: [
            { text: "Ver", url: "#" }
        ]
    }
];

// Security code for deletion
const SECURITY_CODE = "76760219";

// DOM Elements
const weeksContainer = document.getElementById('weeks-container');
const addContentButton = document.getElementById('addContentButton');
const addContentModal = document.getElementById('addContentModal');
const closeButton = document.querySelector('.close-button');
const contentForm = document.getElementById('contentForm');
const addLinkButton = document.getElementById('addLinkButton');

// Load data from localStorage if available
function loadData() {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
        weekData = JSON.parse(savedData);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('portfolioData', JSON.stringify(weekData));
}

// Render all week cards
function renderWeekCards() {
    weeksContainer.innerHTML = '';
    
    weekData.forEach(week => {
        const card = createWeekCard(week);
        weeksContainer.appendChild(card);
    });
}

// Create a single week card
function createWeekCard(weekData) {
    const card = document.createElement('div');
    card.className = 'week-card';
    card.setAttribute('data-id', weekData.id);
    
    // Icon
    const iconDiv = document.createElement('div');
    iconDiv.className = 'week-icon';
    
    const iconElement = document.createElement('div');
    iconElement.className = `icon-${weekData.icon}`;
    
    iconDiv.appendChild(iconElement);
    card.appendChild(iconDiv);
    
    // Title
    const title = document.createElement('h2');
    title.className = 'week-title';
    title.textContent = weekData.title;
    card.appendChild(title);
    
    // Subtitle
    const subtitle = document.createElement('p');
    subtitle.className = 'week-subtitle';
    subtitle.textContent = weekData.subtitle;
    card.appendChild(subtitle);
    
    // Links
    const linksDiv = document.createElement('div');
    linksDiv.className = 'week-links';
    
    if (weekData.links && weekData.links.length > 0) {
        weekData.links.forEach(link => {
            const linkBtn = document.createElement('a');
            linkBtn.href = link.url;
            linkBtn.className = 'btn';
            linkBtn.textContent = link.text;
            linksDiv.appendChild(linkBtn);
        });
    }
    
    card.appendChild(linksDiv);
    
    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', () => deleteWeek(weekData.id));
    card.appendChild(deleteBtn);
    
    return card;
}

// Delete a week with security code
function deleteWeek(id) {
    const inputCode = prompt('Ingrese el código de seguridad para eliminar esta semana:');
    
    if (inputCode === SECURITY_CODE) {
        // Filter out the week with the matching id
        weekData = weekData.filter(week => week.id !== id);
        
        // Save and re-render
        saveData();
        renderWeekCards();
        
        alert('Semana eliminada correctamente.');
    } else if (inputCode !== null) { // Only show error if user didn't press Cancel
        alert('Código incorrecto. No se pudo eliminar la semana.');
    }
}

// Add new link input fields
function addLinkInputs(container, linkData = { text: '', url: '' }) {
    const linkInputsDiv = document.createElement('div');
    linkInputsDiv.className = 'link-inputs';
    
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.className = 'link-text';
    textInput.placeholder = 'Texto del enlace';
    textInput.value = linkData.text;
    
    const urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.className = 'link-url';
    urlInput.placeholder = 'URL';
    urlInput.value = linkData.url;
    
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = '×';
    removeButton.style.backgroundColor = '#e74c3c';
    removeButton.style.color = 'white';
    removeButton.style.border = 'none';
    removeButton.style.borderRadius = '50%';
    removeButton.style.width = '25px';
    removeButton.style.height = '25px';
    removeButton.style.cursor = 'pointer';
    removeButton.style.marginLeft = '5px';
    removeButton.onclick = function() {
        linkInputsDiv.remove();
    };
    
    linkInputsDiv.appendChild(textInput);
    linkInputsDiv.appendChild(urlInput);
    linkInputsDiv.appendChild(removeButton);
    
    container.appendChild(linkInputsDiv);
}

// Open modal
function openModal() {
    // Reset form
    contentForm.reset();
    
    // Clear existing link inputs except the first one
    const linksContainer = document.getElementById('linksContainer');
    const linkInputs = linksContainer.querySelectorAll('.link-inputs');
    
    linkInputs.forEach((input, index) => {
        if (index > 0) {
            input.remove();
        } else {
            // Clear first input values
            input.querySelector('.link-text').value = '';
            input.querySelector('.link-url').value = '';
        }
    });
    
    addContentModal.style.display = 'block';
}

// Close modal
function closeModal() {
    addContentModal.style.display = 'none';
}

// Add new week to the data
function addNewWeek(event) {
    event.preventDefault();
    
    const weekNumber = document.getElementById('weekNumber').value;
    const weekTitle = document.getElementById('weekTitle').value;
    const weekSubtitle = document.getElementById('weekSubtitle').value;
    const iconType = document.getElementById('iconType').value;
    
    // Collect links
    const links = [];
    const linkTexts = document.querySelectorAll('.link-text');
    const linkUrls = document.querySelectorAll('.link-url');
    
    for (let i = 0; i < linkTexts.length; i++) {
        const text = linkTexts[i].value.trim();
        const url = linkUrls[i].value.trim();
        
        if (text && url) {
            links.push({ text, url });
        }
    }
    
    // Generate a unique ID (use timestamp)
    const newId = Date.now();
    
    // Create new week data
    const newWeek = {
        id: newId,
        title: weekTitle,
        subtitle: weekSubtitle || `Semana ${weekNumber}`,
        icon: iconType,
        links: links
    };
    
    // Add to data and save
    weekData.push(newWeek);
    saveData();
    
    // Re-render all cards
    renderWeekCards();
    
    // Close modal
    closeModal();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderWeekCards();
    
    addContentButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
    contentForm.addEventListener('submit', addNewWeek);
    
    addLinkButton.addEventListener('click', () => {
        const linksContainer = document.getElementById('linksContainer');
        addLinkInputs(linksContainer);
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === addContentModal) {
            closeModal();
        }
    });
});