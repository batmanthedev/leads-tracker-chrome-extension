
const saveBtn = document.querySelector("#save-btn");
const inputEl = document.querySelector("#input-el");
const deleteBtn = document.querySelector("#delete-btn");
const saveTabBtn = document.querySelector("#save-tab-btn");
const ulEl = document.querySelector("#ul-el");

let myLeads = [];

saveBtn.addEventListener("click", function () { save(inputEl.value) });
inputEl.addEventListener("keypress", function (event) { if (event.key == "Enter") { saveBtn.click() } });
deleteBtn.addEventListener("dblclick", function(){deleteAll()});
saveTabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    save(tabs[0].url);
})});

pullLeadsFromLocalStorage();
display(myLeads);

function save(s) {
    console.log("Saving lead..");
    myLeads.push(s);
    localStorage.setItem("lkv", JSON.stringify(myLeads));
    inputEl.value = "";
    console.log("Lead saved succesfully");
    display(myLeads);
    inputEl.focus();
}

function display(leads) {
    console.log("Displaying leads..");
    if (leads.length) {
        ulEl.innerHTML = "";
        for (let x = 0; x < leads.length; x++) {
            if (leads[x].includes("www")) {
                ulEl.innerHTML +=
                    `<li>
                <a href=https://${leads[x]} target='_blank'>${leads[x]}</a>
            </li>`;
            }
            else {
                ulEl.innerHTML += "<li>" + leads[x] + "</li>";
            }
        }
        console.log("Leads displayed successfully.");
    }
    else {
        console.log("There are no leads to display.");
    }
}

function pullLeadsFromLocalStorage() {
    if(localStorage.getItem("lkv"))
    {
        console.log("Getting all leads..");
        myLeads = JSON.parse(localStorage.getItem("lkv"));
        console.log("All leads retrieved successfully");
    };
}

function deleteAll()
{
    console.log("Deleting all leads..");
    for(let s in localStorage)
    {
        if(s == "lkv")
        {
            localStorage.removeItem("lkv");
        }
    }
    ulEl.innerHTML ="";
    myLeads = [];
    console.log("All leads have been cleared from local storage!");
    inputEl.focus();
}

