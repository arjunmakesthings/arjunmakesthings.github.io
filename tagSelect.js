let project = document.querySelectorAll("#project");
let experiment = document.querySelectorAll("#experiment");
let film = document.querySelectorAll("#film");

let tagButtons = document.querySelectorAll(".taggers h5");  // Select all h5 elements inside .taggers

// Set default underline for 'All' tag when the page loads
window.onload = function () {
    toggleUnderline("all-tog");
    showAll(); // You might also want to show all projects by default, adjust as needed
};

function showAll() {
    toggleUnderline("all-tog");
    for (let i = 0; i < experiment.length; i++) {
        experiment[i].style.display = 'flex';
    }
    for (let i = 0; i < project.length; i++) {
        project[i].style.display = 'flex';
    }
    for (let i = 0; i < film.length; i++) {
        film[i].style.display = 'flex';
    }
}

function showOnlyProjects() {
    toggleUnderline("projects-tog");
    for (let i = 0; i < project.length; i++) {
        project[i].style.display = 'flex';
    }
    for (let i = 0; i < experiment.length; i++) {
        experiment[i].style.display = 'none';
    }
    for (let i = 0; i < film.length; i++) {
        film[i].style.display = 'none';
    }
}

function showOnlyExperiments() {
    toggleUnderline("experiments-tog");
    for (let i = 0; i < experiment.length; i++) {
        experiment[i].style.display = 'flex';
    }
    for (let i = 0; i < project.length; i++) {
        project[i].style.display = 'none';
    }
    for (let i = 0; i < film.length; i++) {
        film[i].style.display = 'none';
    }
}

function showOnlyFilms() {
    toggleUnderline("films-tog");
    for (let i = 0; i < film.length; i++) {
        film[i].style.display = 'flex';
    }
    for (let i = 0; i < experiment.length; i++) {
        experiment[i].style.display = 'none';
    }
    for (let i = 0; i < project.length; i++) {
        project[i].style.display = 'none';
    }
}

function toggleUnderline(clickedTag) {
    tagButtons.forEach(button => {
        if (button.classList.contains(clickedTag)) {
            button.style.textDecoration = 'underline';
        } else {
            button.style.textDecoration = 'none';
        }
    });
}
