
const saveBtn = document.querySelector("#save-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");

let myLeads = [];

saveBtn.addEventListener("click", function () { save() });
inputEl.addEventListener("keypress", function (event) { if (event.key == "Enter") { saveBtn.click() } });

pullLeadsFromLocalStorage();
displayLeads();

function save() {
    myLeads.push(inputEl.value);
    localStorage.setItem("leadsKeyValue" + Date.now(),inputEl.value);
    inputEl.value = "";
    displayLeads()
}

function displayLeads() {
    if (myLeads.length > 0) {
        ulEl.innerHTML = "";
        for (let x = 0; x < myLeads.length; x++) {
            if (myLeads[x].includes("www")) {
                ulEl.innerHTML +=
                    `<li>
                <a href=https://${myLeads[x]} target='_blank'>${myLeads[x]}</a>
            </li>`;
            }
            else {
                ulEl.innerHTML += "<li>" + myLeads[x] + "</li>";
            }
        }
        inputEl.focus();

        console.log("Leads displayed successfully.");
    }
    else {
        console.log("There are no leads to display.");
    }
}

function pullLeadsFromLocalStorage(x) {

        for(let i = 0; i < localStorage.length; i++)
        {
            if(localStorage.key(i).includes("leadsKeyValue"))
            {
                myLeads.push(localStorage.getItem(localStorage.key(i)));
            }
        }
}

