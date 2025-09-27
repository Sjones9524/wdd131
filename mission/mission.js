const themeSelector = document.getElementById('theme-selector');
themeSelector.addEventListener('change', changeTheme);
function changeTheme() {
    const body = document.body;
    const logo = document.getElementById('logo');
    const selectedTheme = themeSelector.value;

    if (selectedTheme === 'dark') {
        body.classList.add('dark');
        logo.src = 'images/byui-logo_white.png';
    } else {
    body.classList.remove('dark');
    logo.src = 'images/byui-logo_blue.webp';
    }
}