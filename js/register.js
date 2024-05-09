
function getCitiesMap() {
    return {
        'Львів': 1,
        'Луцьк': 2,
    };
}

document.getElementById("registrationForm").addEventListener("submit", function (event) {

    event.preventDefault();

    const First_name = document.getElementById("First_name").value;
    const Last_name = document.getElementById("Last_name").value;
    const Username = document.getElementById("Username").value;
    const City = document.getElementById("City").value;

    const userData = {
        username: Username,
        first_name: First_name,
        last_name: Last_name,
        city: getCitiesMap()[City],
    };

    fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("User registered successfully:", data);
            alert("User registered successfully!");
            window.location.href = "home.html";
        })
        .catch(error => {
            console.error("There was an error registering the user:", error.message);
            alert("There was an error registering the user. Please try again later.");
        });
});