const darkModeButton = document.getElementById('darkModeButton');
const body = document.body;
let isDarkMode = false;

darkModeButton.addEventListener('click', () => {
    if (isDarkMode) {
    body.style.backgroundColor = '#fff';
    body.style.color = '#000';
    } else {
    body.style.backgroundColor = '#111';
    body.style.color = '#fff';
    }

    //It toggles the dark-light mode
    isDarkMode = !isDarkMode;
});
