document.addEventListener("DOMContentLoaded", function () {
  const peopleList = document.getElementById("people-list");
  const tasksList = document.getElementById("tasks-list");
  const addPersonForm = document.getElementById("add-person-form");
  const addTaskForm = document.getElementById("add-task-form");
  const assignButton = document.getElementById("assign-button");
  const taskAssignment = document.getElementById("task-assignment");

  let people = [];
  let tasks = [];
  let assignments = {};

  addPersonForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const personNameInput = document.getElementById("person-name");
      const personName = personNameInput.value.trim();
      if (personName !== "") {
          people.push(personName);
          createListItem(personName, peopleList);
          personNameInput.value = "";
      }
  });

  addTaskForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const taskNameInput = document.getElementById("task-name");
      const taskName = taskNameInput.value.trim();
      if (taskName !== "") {
          tasks.push(taskName);
          createListItem(taskName, tasksList);
          taskNameInput.value = "";
      }
  });

  assignButton.addEventListener("click", function () {
      assignments = assignTasks(people, tasks);
      displayAssignments(assignments, taskAssignment);
  });

  function createListItem(text, parentElement) {
    const listItem = document.createElement("li");
    listItem.textContent = text;
    parentElement.appendChild(listItem);
}

  function assignTasks(people, tasks) {
      const assignments = {};

      const shuffledTasks = [...tasks];


      for (let i = shuffledTasks.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledTasks[i], shuffledTasks[j]] = [shuffledTasks[j], shuffledTasks[i]];
      }

  
      for (const person of people) {
          assignments[person] = [];
      }

      let taskIndex = 0;

      for (let i = 0; i < shuffledTasks.length; i++) {
          const person = people[i % people.length]; 
          assignments[person].push(shuffledTasks[i]);
      }


      for (const person of people) {
          if (assignments[person].length === 0) {
              assignments[person].push("No task");
          }
      }

      return assignments;
  }

  function displayAssignments(assignments, targetElement) {
      targetElement.innerHTML = "";
      for (const person in assignments) {
          if (assignments.hasOwnProperty(person)) {
              const personTasks = assignments[person];
              const assignmentString = `${person}: ${personTasks.join(", ")}`;
              createListItem(assignmentString, targetElement);
          }
      }
  }
});
