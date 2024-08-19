const ucpContentTable = document.getElementById("ucpcontent");
const ucpContentDiv = document.createElement("div");

ucpContentDiv.appendChild(ucpContentTable.querySelector(".maintitle"));

if (ucpContentTable.querySelector("div.pformstrip") !== null) {
    ucpContentTable.querySelectorAll("div.pformstrip");
}









// messages control panel

document.querySelector("#ucpcontent td .row1").closest("[valign]").style = "display: none";
document.querySelector("th.titlemedium").closest("tr").style = "display: none";