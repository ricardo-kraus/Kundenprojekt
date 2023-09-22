document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const nameInput = document.getElementById("name-input");
    const addButton = document.getElementById("add-button");
    const daySelect = document.getElementById("day-select");

    // Füge den "Assign Task"-Button hinzu
    const assignButton = document.createElement("button");
    assignButton.id = "assign-button";
    assignButton.textContent = "Assign Task";
    document.body.appendChild(assignButton);

    addButton.addEventListener("click", addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        const nameText = nameInput.value.trim();
        const selectedDay = daySelect.value;

        if (taskText !== "" && nameText !== "") {
            const taskList = document.querySelector(`#${selectedDay}-tasks`);
            const taskBlock = document.createElement("div");
            taskBlock.classList.add("task-block");
            taskBlock.style.backgroundColor = getRandomColor(); // Zufällige Hintergrundfarbe
            taskBlock.innerHTML = `
                <p><strong>Aufgabe:</strong> ${taskText}</p>
                <p><strong>Name:</strong> ${nameText}</p>
                <button class="delete-button">Löschen</button>
                <button class="comment-button">Kommentar</button>
                <div class="comment-container" style="display: none;">
                    <input type="text" placeholder="Kommentar eingeben" class="comment-input">
                    <input type="text" placeholder="Dein Name" class "commenter-input">
                    <button class="save-comment-button">Speichern</button>
                    <button class="close-comment-button">Schließen</button>
                    <div class="comments"></div>
                </div>
            `;
            taskList.appendChild(taskBlock);
            taskInput.value = "";
            nameInput.value = "";

            const deleteButton = taskBlock.querySelector(".delete-button");
            deleteButton.addEventListener("click", function () {
                taskList.removeChild(taskBlock);
            });

            const commentButton = taskBlock.querySelector(".comment-button");
            const commentContainer = taskBlock.querySelector(".comment-container");
            const commentInput = taskBlock.querySelector(".comment-input");
            const commenterInput = taskBlock.querySelector(".commenter-input");
            const commentsContainer = taskBlock.querySelector(".comments");
            const saveCommentButton = taskBlock.querySelector(".save-comment-button");
            const closeCommentButton = taskBlock.querySelector(".close-comment-button");

            commentButton.addEventListener("click", function () {
                commentContainer.style.display = "block";
            });

            saveCommentButton.addEventListener("click", function () {
                const commentText = commentInput.value.trim();
                const commenterText = commenterInput.value.trim();

                if (commentText !== "" && commenterText !== "") {
                    const comment = document.createElement("div");
                    comment.className = "comment";
                    comment.innerHTML = `<strong>${commenterText}</strong> (${getCurrentTime()}): ${commentText}`;
                    commentsContainer.appendChild(comment);

                    commentInput.value = "";
                    commenterInput.value = "";
                }
            });

            closeCommentButton.addEventListener("click", function () {
                commentContainer.style.display = "none";
            });
        }
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    }
});
