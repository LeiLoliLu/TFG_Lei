var townsfolk = 

//declaración de variables
var title = document.getElementById("title");
var texttitle = document.getElementById("texttitle");
var box = document.getElementById("box");
var textbox = document.getElementById("textbox");
var screen = document.getElementById("screen");
var hasClient = false;

var bJardin = document.getElementById("bJardin");
var bMostrador = document.getElementById("bMostrador");
var bTrastienda = document.getElementById("bTrastienda");
var bRecetario = document.getElementById("bRecetario");
var bAjustes = document.getElementById("bAjustes");

//declaración de eventos
const botonJar = bJardin.addEventListener("click", function () { changeScreen(1); });
const botonMos = bMostrador.addEventListener("click", function () { changeScreen(2); });
const botonTra = bTrastienda.addEventListener("click", function () { changeScreen(3); });
const botonRec = bRecetario.addEventListener("click", function () { changeScreen(4); });
const botonAju = bAjustes.addEventListener("click", function () { changeScreen(5); });
const clientela = setInterval(summonClient,5000);

//start
changeScreen(2);


function summonClient(){
    if(!hasClient){
        if (Math.random() > 0.5) {
            var client = document.createElement("Cliente");
            client.classList.add("client");
            client.setAttribute("id","currentClient");
            client.setAttribute("onclick","deleteClient()");
            if(title.innerHTML!="Mostrador"){
                client.classList.add("hidden");
            }
            screen.appendChild(client);
            hasClient=true;
            texttitle.innerHTML="Hay alguien en tu tienda";
            texttitle.classList.add("alert");
            setTimeout(function(){
                texttitle.classList.remove("alert");
            }, 500);
        }
    }else{
        console.log("There is a Client already.");
    }
}

function deleteClient(){
    var client = document.getElementById("currentClient");
    client.remove();
    hasClient=false;
    texttitle.innerHTML="No hay nadie en tu tienda";
}

function changeScreen(option) {
    switch (option) {
        case 1:
            title.innerHTML = "Jardin";
            clearBackground();
            screen.classList.add("jardin");
            toggleTextbox("ON");
            toggleClient("OFF");
            break;
        case 2:
            title.innerHTML = "Mostrador";
            clearBackground();
            screen.classList.add("mostrador");
            toggleTextbox("ON");
            toggleClient("ON");
            break;
        case 3:
            title.innerHTML = "Trastienda";
            clearBackground();
            screen.classList.add("trastienda");
            toggleTextbox("ON");
            toggleClient("OFF");
            break;
        case 4:
            title.innerHTML = "Recetario";
            clearBackground();
            toggleTextbox("ON");
            toggleClient("OFF");
            break;
        case 5:
            title.innerHTML = "Ajustes";
            clearBackground();
            toggleTextbox("ON");
            toggleClient("OFF");
            break;
    }
}

function toggleTextbox(option) {
    switch (option) {
        case "ON":
            textbox.classList.remove("hidden");
            screen.classList.remove("long");
            break;
        case "OFF":
            textbox.classList.add("hidden");
            screen.classList.add("long");
    }
}

function toggleClient(option) {
    if(hasClient){
        var client = document.getElementById("currentClient");
    switch (option) {
        case "ON":
            client.classList.remove("hidden");
            break;
        case "OFF":
            client.classList.add("hidden");

    }
}
}

function clearBackground() {
    screen.classList.remove("jardin");
    screen.classList.remove("mostrador");
    screen.classList.remove("trastienda");
}