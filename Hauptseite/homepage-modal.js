// JavaScript code for generating cards and modals
const assignmentsJSON = localStorage.getItem("assignments");
const assignments = JSON.parse(assignmentsJSON);

// Initialize button counts
function initButtonCounts(day, index) {
    const assignmentName = document.getElementById(`greenButton${day}${index}`).getAttribute("data-name");
    localStorage.setItem(`${assignmentName}_green_count`, 0);
    localStorage.setItem(`${assignmentName}_red_count`, 0);
}

// Loop through your data and generate cards and modals
function generateCards(day, assignments) {
    let index = 1;

    for (const key in assignments[day]) {
        const assignmentName = key;
        const taskName = assignments[day][key];
        generateCardAndModal(day, assignmentName, taskName, index);
        initButtonCounts(day, index); // Initialize button counts for this assignment
        index++;
    }
}

function handleButtonSelection(button, color) {
    const assignmentName = button.getAttribute("data-name");
    const storageKey = `${assignmentName}_${color}_count`;
    const count = parseInt(localStorage.getItem(storageKey) || 0);

    if (count === 0) {
        // Increment the count
        localStorage.setItem(storageKey, 1);

        // Toggle the button color
        button.classList.add("active");

        // Update the total count of lit buttons
        updateTotalCount();
    }
}

function updateTotalCount() {
    let totalCount = 0;
    for (let day of ["monday", "tuesday", "wednesday", "thursday", "friday"]) {
        for (let index = 1; ; index++) {
            const greenCount = parseInt(localStorage.getItem(`${assignments[day][index]}_green_count`) || 0);
            const redCount = parseInt(localStorage.getItem(`${assignments[day][index]}_red_count`) || 0);

            if (greenCount === 0 && redCount === 0) {
                // No more buttons for this day and index
                break;
            }

            totalCount += greenCount;
            totalCount -= redCount;
        }
    }

    // Update the total count display
    document.getElementById("totalCount").textContent = totalCount;
}

function generateCardAndModal(day, assignmentName, taskName, index) {
    // Create a new card element
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
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <button
                        type="button"
                        class="btn btn-outline-primary btn-sm-custom"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal${day}${index}"
                        data-bs-whatever="@${day}${index}"
                    >
                        Comment
                    </button>
                </div>
                <label class="check mt-3">
                    Done
                    <input class="ms-1" type="checkbox" id="checkbox-${cardId}" />
                    <span class="checkmark"></span>
                </label>
            </div>
        </div>
    `;

    // Create a new modal element
    const modalId = `exampleModal${day}${index}`;
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = modalId;
    modal.tabIndex = -1;
    modal.setAttribute("aria-labelledby", "exampleModalLabel");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Comments</h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Comments:</label>
                            <input type="text" class="form-control" id="recipient-name" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" class="btn-check" name="btnradio-${day}-${index}" id="btnradio1-${day}-${index}" autocomplete="off" value="positive" checked>
                        <label class="btn btn-outline-success" for="btnradio1-${day}-${index}">Positive</label>

                        <input type="radio" class="btn-check" name="btnradio-${day}-${index}" id="btnradio2-${day}-${index}" autocomplete="off" value="negative">
                        <label class="btn btn-outline-danger" for="btnradio2-${day}-${index}">Negative</label>
                    </div>
                    <input type="hidden" id="rating-${day}-${index}" value="positive">
                    <button
                        type="button"
                        class="btn btn-outline-primary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;

    // Append the card and modal to their respective containers
    document.getElementById(`card${day}`).appendChild(card);
    document.body.appendChild(modal);

    // Event listeners for positive and negative buttons
    const positiveButton = document.getElementById(`btnradio1-${day}-${index}`);
    const negativeButton = document.getElementById(`btnradio2-${day}-${index}`);

    positiveButton.addEventListener("click", function () {
        handleButtonSelection(positiveButton, "green");
    });

    negativeButton.addEventListener("click", function () {
        handleButtonSelection(negativeButton, "red");
    });
}

// Loop through your data and generate cards and modals for each day
generateCards("monday", assignments);
generateCards("tuesday", assignments);
generateCards("wednesday", assignments);
generateCards("thursday", assignments);
generateCards("friday", assignments);
