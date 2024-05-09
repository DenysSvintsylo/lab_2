function sendGetRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}

function displayUsers(users) {
    const usersListDiv = document.getElementById('users-list');
    usersListDiv.innerHTML = '';
    if (users.length > 0) {
        const ul = document.createElement('ul');
        ul.className = 'list-group';
        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <div>
                    <strong>Назва:</strong> ${user.name}<br>
                    <strong>ID:</strong> ${user.id}
                </div>
                
            `;
            ul.appendChild(li);
        });
        usersListDiv.appendChild(ul);
    } else {
        usersListDiv.innerHTML = '<p class="text-muted">Користувачів не знайдено</p>';
    }
}

const requestUrl = "http://127.0.0.1:8000/api/cities/?format=json";

const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('query').value.trim().toLowerCase();
    sendGetRequest(requestUrl)
        .then(users => {
            const filteredUsers = users.filter(user =>
                user.name.toLowerCase().includes(query) ||
                user.id.toString().includes(query)
            );
            displayUsers(filteredUsers);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('users-list').innerHTML = '<p class="text-danger">Помилка завантаження даних</p>';
        });
});

window.addEventListener('load', function() {
    sendGetRequest(requestUrl)
        .then(displayUsers)
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('users-list').innerHTML = '<p class="text-danger">Помилка завантаження даних</p>';
        });
});

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