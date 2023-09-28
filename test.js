document.addEventListener("DOMContentLoaded", () => {
    const darkModeButton = document.getElementById("darkModeButton");
    const lightModeButton = document.getElementById("lightModeButton");
    const body = document.body;

    darkModeButton.addEventListener("click", () => {
        body.style.backgroundColor = "#111"; // Dark mode background color
        body.style.color = "#fff"; // Dark mode text color
    });

    lightModeButton.addEventListener("click", () => {
        body.style.backgroundColor = "#0074D9"; // Light mode background color
        body.style.color = "#fff"; // Light mode text color
    });

    // Function to generate cards
    function generateCards(day) {
        const assignmentsJSON = localStorage.getItem("assignments");
        const assignments = JSON.parse(assignmentsJSON);

        if (assignments && assignments[day]) {
            const container = document.getElementById(day);

            for (const [index, [assignmentName, taskName]] of Object.entries(
                Object.entries(assignments[day])
            )) {
                const cardId = `card${day}${index}`;
                const card = document.createElement("div");
                card.className = "card mx-auto mb-5";
                card.innerHTML = `
                    <div class="card-body">
                        <div class="card-title fs-5 fw-semibold" id="${cardId}">
                            ${taskName}
                        </div>
                        <div class="card-text" id="cardname${day}${index}">
                            ${assignmentName}
                        </div>
                        <!-- Add the rest of your card content here -->
                    </div>
                `;

                container.appendChild(card);
            }
        }
    }

    // Call generateCards for each day
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    for (const day of days) {
        generateCards(day);
    }
});
