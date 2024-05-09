document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.getElementById('navbarDropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownToggle.addEventListener('click', function(event) {
        event.preventDefault();
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        } else {
            dropdownMenu.style.display = 'block';
        }
    });

    document.addEventListener('click', function(event) {
        const targetElement = event.target;
        if (!dropdownToggle.contains(targetElement) && !dropdownMenu.contains(targetElement)) {
            dropdownMenu.style.display = 'none';
        }
    });
});