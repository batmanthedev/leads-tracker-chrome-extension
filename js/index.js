
const saveBtn = document.querySelector("#save-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");

let myLeads = [];

saveBtn.addEventListener("click", function(){save()});
inputEl.addEventListener("keypress", function(event){if(event.key == "Enter"){saveBtn.click()}});

function save()
{
    myLeads.push(inputEl.value);
    inputEl.value = "";
    displayLeads()
}

function displayLeads()
{
    ulEl.innerHTML = "";
    for(let x = 0; x < myLeads.length; x++)
    {
        if(myLeads[x].includes("www"))
        {
            ulEl.innerHTML += 
            `<li>
                <a href=https://${myLeads[x]} target='_blank'>${myLeads[x]}</a>
            </li>`;
        }
        else
        {
            ulEl.innerHTML += "<li>" + myLeads[x] + "</li>";
        }
        
    }
    inputEl.focus();
}

