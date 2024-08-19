function displayLythra() {
    document.getElementById("cat-5").style.display = "block";
    document.getElementById("cat-6").style.display = "none";
    document.getElementById("cat-7").style.display = "none";
    document.getElementById("cat-8").style.display = "none";
}

function displayCallitris() {
    document.getElementById("cat-6").style.display = "block";
    document.getElementById("cat-5").style.display = "none";
    document.getElementById("cat-7").style.display = "none";
    document.getElementById("cat-8").style.display = "none";
}

function displayParrya() {
    document.getElementById("cat-7").style.display = "block";
    document.getElementById("cat-6").style.display = "none";
    document.getElementById("cat-5").style.display = "none";
    document.getElementById("cat-8").style.display = "none";
}

function displayIlex() {
    document.getElementById("cat-8").style.display = "block";
    document.getElementById("cat-6").style.display = "none";
    document.getElementById("cat-7").style.display = "none";
    document.getElementById("cat-5").style.display = "none";
}

if (document.cookie)

document.getElementById("cat-4").innerHTML += `
    <div class="subregions">
        <h4 class="subregions-styling" onclick="displayLythra()">Lythra</h4>
        <h4 class="subregions-styling" onclick="displayCallitris()">Callitris</h4>
        <h4 class="subregions-styling" onclick="displayParrya()">Parrya</h4>
        <h4 class="subregions-styling" onclick="displayIlex()">Ilex</h4>
    </div>`;