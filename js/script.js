var hasClient = false;
var lastClient = 10;
var clientObj;
var matchingItems;
var selectedItem;

//declaración de variables
var title = document.getElementById("title");
var texttitle = document.getElementById("texttitle");
var box = document.getElementById("box");
var boxP = box.firstChild;
var boxContinueText = document.getElementById("continuetext");
var textbox = document.getElementById("textbox");
var screen = document.getElementById("screen");
var boxButtons = document.getElementById("boxButtons")

var bJardin = document.getElementById("bJardin");
var bMostrador = document.getElementById("bMostrador");
var bTrastienda = document.getElementById("bTrastienda");
var bRecetario = document.getElementById("bRecetario");
var bAjustes = document.getElementById("bAjustes");
var opt1button = document.getElementById("opt1");
var opt2button = document.getElementById("opt2");
var opt3button = document.getElementById("opt3");
var opt4button = document.getElementById("opt4");

//declaración de eventos
const botonJar = bJardin.addEventListener("click", function () { changeScreen(1); });
const botonMos = bMostrador.addEventListener("click", function () { changeScreen(2); });
const botonTra = bTrastienda.addEventListener("click", function () { changeScreen(3); });
const botonRec = bRecetario.addEventListener("click", function () { changeScreen(4); });
const botonAju = bAjustes.addEventListener("click", function () { changeScreen(5); });
const clientela = setInterval(summonClient, 5000);

//Start
changeScreen(2);

//Clientela
function summonClient() {
    if (!hasClient) {
        console.log("Trying to summon Client...");
        if (Math.random() > 0.5) {
            console.log("Summon Success!");
            var clientElement = createClient();
            screen.appendChild(clientElement);
            hasClient = true;
            texttitle.innerHTML = "Hay alguien en tu tienda";
            texttitle.classList.add("alert");
            setTimeout(function () {
                texttitle.classList.remove("alert");
            }, 500);
        } else {
            console.log("Summon failed.");
        }
    } else {
        console.log("There is a Client already.");
    }
}

function createClient() {
    //crear elemento
    var clientElement = document.createElement("Client");

    //classlist
    clientElement.classList.add("client");
    if (title.innerHTML != "Mostrador") {
        clientElement.classList.add("hidden");
    }
    //attributes
    clientElement.setAttribute("id", "currentClient");
    clientElement.setAttribute("onclick", "clientActions()");

    var randomint = lastClient;
    while (randomint == lastClient) {
        randomint = Math.floor(Math.random() * 20);
        console.log(randomint);
    }
    clientObj = townsfolk[randomint];
    lastClient = randomint;
    return clientElement;
}

async function clientActions() {
    var client = document.getElementById("currentClient");
    client.removeAttribute("onclick");

    texttitle.innerHTML = clientObj.name;
    boxP.innerHTML = clientObj.greeting;

    await waitForClick();

    clientPetition();

    await waitForClick();

    displayClientOptions();
}

function clientPetition() {
    //ver que objetos puede pedir por su tipo
    var objetosPedibles = items.filter(item => item.archetype.includes(clientObj.type));
    //
    objetosPedibles.forEach(element => {
        console.log("Objetos pedibles: " + element.item)
    });

    //pick random item
    var targetItem = objetosPedibles[Math.floor(Math.random() * objetosPedibles.length)];
    //
    console.log("Objeto seleccionado: " + targetItem.item);


    targetItem.petitions.forEach(element => {
        console.log("Peticiones: " + element)
    });

    //pick random petition
    var targetPetition = targetItem.petitions[Math.floor(Math.random() * targetItem.petitions.length)];
    boxP.innerHTML = targetPetition;

    //filter objects that can be given to client with that petition too
    matchingItems = items.filter(item => item.petitions.includes(targetPetition)).filter(item => item.archetype.includes(clientObj.type));
    matchingItems.forEach(element => {
        console.log("Objetos posibles: " + element.item)
    });
}

function displayClientOptions() {
    boxP.classList.add("hidden");
    boxButtons.classList.remove("hidden");

    listenOpt1 = opt1button.addEventListener("click", function () {
        openInv();
        opt1button.removeEventListener("click",listenOpt1);
        opt2button.removeEventListener("click",listenOpt2);
        opt3button.removeEventListener("click",listenOpt3);
    });
    listenOpt2 = opt2button.addEventListener("click", function () {
        talkToClient();
        opt1button.removeEventListener("click",listenOpt1);
        opt2button.removeEventListener("click",listenOpt2);
        opt3button.removeEventListener("click",listenOpt3);
    });
    listenOpt3 = opt3button.addEventListener("click", function () {
        deleteClient();
        opt1button.removeEventListener("click",listenOpt1);
        opt2button.removeEventListener("click",listenOpt2);
        opt3button.removeEventListener("click",listenOpt3);
    });
}

function waitForClick() {
    return new Promise(resolve => {
        function boxClicked() {
            box.removeEventListener('click', boxClicked)
            boxContinueText.classList.remove("pulsing");
            boxContinueText.classList.add("hidden");
            resolve();
        }
        boxContinueText.classList.remove("hidden");
        boxContinueText.classList.add("pulsing");
        box.addEventListener('click', boxClicked);
    });
}

function openInv() {
    changeScreen(6);
    boxP.classList.remove("hidden");
    boxP.innerHTML = "...";
    boxButtons.classList.add("hidden");
    screen.classList.add("screenalmacen");

    inventory = items.filter(item => {
        invItem = currentInv.find(invItem => invItem["item-id"] === item.id);
        return invItem && parseInt(invItem.quantity) > 0;
    });

    inventory.forEach(item => {
        var square = document.createElement('itemsquare');
        square.classList.add('itemsquare');
        square.setAttribute('item-id', item.id);
        //var squareimg = document.createElement('img');
        //squareimg.setAttribute('src',item.imgroute);
        //square.appendChild(squareimg);
        square.addEventListener('click', function () {
            selectItemFromInv(item.id);
        });
        screen.appendChild(square);
    });

}

function selectItemFromInv(id) {
    selectedItem = items.find(item => item.id === id);
    boxP.innerHTML = selectedItem.item + " <hr> " + selectedItem.desc;
    if (opt4button.classList.contains("hidden")) {
        opt4button.classList.remove("hidden");
    }
}


function sellItem(item) {
    //cambia a mostrador
    changeScreen(2);

    //quitar botones de todas clases y event listener
    opt4button.classList.add("hidden");
    boxButtons.classList.add("hidden");

    //quitar items
    itemsquares = document.getElementsByTagName("itemsquare");
    while (itemsquares[0]) itemsquares[0].parentNode.removeChild(itemsquares[0]);

    //comprobar si esta bien
    if (matchingItems.includes(item)) {
        console.log("Correcto.");
        deleteClient();
    } else {
        console.log("Incorrecto.");
        displayClientOptions();
    }
}

function deleteClient() {
    var client = document.getElementById("currentClient");
    client.remove();
    hasClient = false;
    if (!boxButtons.classList.contains("hidden")) {
        boxButtons.classList.add("hidden");
    }
    if (texttitle.classList.contains("hidden")) {
        texttitle.classList.remove("hidden");
    }
    if (boxP.classList.contains("hidden")) {
        boxP.classList.remove("hidden");
    }
    texttitle.innerHTML = "No hay nadie en tu tienda";
    boxP.innerHTML = "...";
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
        case 6:
            title.innerHTML = "Almacén";
            clearBackground();
            screen.classList.add("almacen");
            toggleTextbox("ON");
            toggleClient("OFF");
            break;
    }
}
function clearBackground() {
    screen.classList.remove("jardin");
    screen.classList.remove("mostrador");
    screen.classList.remove("trastienda");
    screen.classList.remove("almacen");
    screen.classList.remove("screenalmacen");
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
    if (hasClient) {
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

