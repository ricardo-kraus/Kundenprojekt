const darkModeButton = document.querySelector('.darkmode');

function toggleDarkMode() {
    document.body.classList.toggle('darkmode');
}

if (localStorage.getItem('darkModeEnabled') === 'true') {
    toggleDarkMode();
}

darkModeButton.addEventListener('click', () => {
    toggleDarkMode();
    if (document.body.classList.contains('darkmode')) {
        localStorage.setItem('darkModeEnabled', 'true');
    } else {
        localStorage.setItem('darkModeEnabled', 'false');
    }
});