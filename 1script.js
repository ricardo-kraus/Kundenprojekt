document.addEventListener("DOMContentLoaded", function () {
    const datenEingabe = document.getElementById("datenEingabe");
    const datenHinzufuegen = document.getElementById("datenHinzufuegen");
    const personenStatistik = document.getElementById("personenStatistik");

    // Laden von gespeicherten Namen aus dem Local Storage
    const names = JSON.parse(localStorage.getItem("names")) || [];

    // Anzeigen der Namen in der Statistik
    function displayNames() {
        personenStatistik.innerHTML = "";
        for (const name of names) {
            const listItem = document.createElement("li");
            listItem.textContent = name;
            personenStatistik.appendChild(listItem);
        }
    }

    // Hinzufügen eines Namens zum Local Storage und zur Anzeige
    datenHinzufuegen.addEventListener("click", function () {
        const newName = datenEingabe.value;
        if (newName.trim() !== "") {
            names.push(newName);
            localStorage.setItem("names", JSON.stringify(names));
            datenEingabe.value = "";
            displayNames();
        }
    });

    // Initialanzeige der Namen
    displayNames();
});
