const townsfolk = [ 
    {"name":"Shyam", "greeting":"Hola, Soy Shyam"},  
    {"name":"Bob", "greeting":"Hola, Soy Bob"},  
    {"name":"Jai", "greeting":"Hola, Soy Jai"},
    {"name":"Miriam", "greeting":"Hola, Soy Miriam"},
    {"name":"Reuben", "greeting":"Hola, Soy Reuben"},  
    {"name":"Macie", "greeting":"Hola, Soy Macie"},  
    {"name":"Zackery", "greeting":"Hola, Soy Zackery"},
    {"name":"Brielle", "greeting":"Hola, Soy Brielle"},
    {"name":"Cale", "greeting":"Hola, Soy Cale"},  
    {"name":"Angelique", "greeting":"Hola, Soy Angelique"}];
var hasClient = false;
var lastClient = 10;

//declaración de variables
var title = document.getElementById("title");
var texttitle = document.getElementById("texttitle");
var box = document.getElementById("box");
var textbox = document.getElementById("textbox");
var screen = document.getElementById("screen");

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

//Start
changeScreen(2);

//Clientela
function summonClient(){
    if(!hasClient){
        console.log("Trying to summon Client...");
        if (Math.random() > 0.5) {
            console.log("Summon Success!");
            var client = createClient(); 
            screen.appendChild(client);
            hasClient=true;
            texttitle.innerHTML="Hay alguien en tu tienda";
            texttitle.classList.add("alert");
            setTimeout(function(){
                texttitle.classList.remove("alert");
            }, 500);
        }else{
            console.log("Summon failed.");
        }
    }else{
        console.log("There is a Client already.");
    }
}
function createClient(){
    //crear elemento
    var client = document.createElement("Client");

    //classlist
    client.classList.add("client");
    if(title.innerHTML!="Mostrador"){
        client.classList.add("hidden");
    }
    //attributes
    client.setAttribute("id","currentClient");
    client.setAttribute("onclick","showClient()");

    var randomint=lastClient;
    while(randomint==lastClient){
        randomint = Math.floor(Math.random()*10);
    }
    client.setAttribute("name",townsfolk[randomint].name);
    client.setAttribute("greeting",townsfolk[randomint].greeting);
            
    return client;
}
function showClient(){
    var client = document.getElementById("currentClient");
    texttitle.innerHTML=client.getAttribute("name");
    box.firstChild.innerHTML=client.getAttribute("greeting");
    clickToContinue("Delete Client");
}
function deleteClient(){
    var client = document.getElementById("currentClient");
    client.remove();
    hasClient=false;
    texttitle.innerHTML="No hay nadie en tu tienda";
    box.firstChild.innerHTML="...";
    box.removeEventListener("click",clickToDeleteClient);
}

//Click TO
function clickToContinue(action){
    box.lastChild.classList.remove("hidden");
    box.lastChild.classList.add("pulsing");
    switch(action){
        case "Delete Client": //Comes from "Show Client"
            clickevent = box.addEventListener("click",clickToDeleteClient);
            break;
        default: 
            console.log("Click to Default");
            box.lastChild.classList.remove("hidden");
            box.lastChild.classList.add("pulsing");
            break;
    }

}
function clickToDeleteClient(){
    deleteClient();
    box.lastChild.classList.remove("pulsing");
    box.lastChild.classList.add("hidden");
}


//CHANGE SCREEN
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
function clearBackground() {
    screen.classList.remove("jardin");
    screen.classList.remove("mostrador");
    screen.classList.remove("trastienda");
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

