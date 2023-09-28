const darkModeButton = document.getElementById('darkModeButton');
const lightModeButton = document.getElementById('lightModeButton');
const body = document.body;

darkModeButton.addEventListener('click', () => {
    body.style.backgroundColor = '#111'; // Dark mode background color
    body.style.color = '#fff'; // Dark mode text color
});

lightModeButton.addEventListener('click', () => {
    body.style.backgroundColor = '#0074D9'; // Light mode background color
    body.style.color = '#fff'; // Light mode text color
});
