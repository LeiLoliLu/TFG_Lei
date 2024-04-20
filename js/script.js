var hasClient = false;
var lastClient = 10;
var clientObj;
var matchingItems;
var selectedItem;
var gold = progress.gold;
var polentype = 1; //1 active, 2 dormant
var aurorapart = 1; //1 hojas, 2 fruto

var listenerjardin = function () {
    changeScreen(1);
};
var listenermostrador = function () {
    changeScreen(2);
};
var listenertrastienda = function () {
    changeScreen(3);
};
var listenerrecetario = function () {
    changeScreen(4);
};
var listenerajustes = function () {
    changeScreen(5);
};

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
var goldmeter = document.getElementById("goldmeter");
var opt1button = document.getElementById("opt1");
var opt2button = document.getElementById("opt2");
var opt3button = document.getElementById("opt3");
var opt4button = document.getElementById("opt4");

//declaración de eventos
const clientela = setInterval(summonClient, 5000);

//Start
changeScreen(2);
activarMenuLateral();
goldmeter.innerHTML = "Oro: " + gold;

//CLIENT FUNCTIONS - TODO TALKING AND DIALOGUE
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

    desactivarMenuLateral();
    var client = document.getElementById("currentClient");
    client.removeAttribute("onclick");

    texttitle.innerHTML = clientObj.name;
    boxP.innerHTML = clientObj.greeting;

    await waitForClick();
    clientPetition();
    await waitForClick();
    toggleClientOptions();
}

function clientPetition() {
    //ver que objetos puede pedir por su tipo
    var objetosPedibles = items.filter(item => item.archetype.includes(clientObj.type));

    //pick random item
    var targetItem = objetosPedibles[Math.floor(Math.random() * objetosPedibles.length)];

    //pick random petition
    var targetPetition = targetItem.petitions[Math.floor(Math.random() * targetItem.petitions.length)];
    boxP.innerHTML = targetPetition;

    //filter objects that can be given to client with that petition too
    matchingItems = items.filter(item => item.petitions.includes(targetPetition)).filter(item => item.archetype.includes(clientObj.type));

}

function toggleClientOptions() {
    boxP.classList.add("hidden");
    boxButtons.classList.remove("hidden");
}

function openInvFromClient() {
    changeScreen(6);
    boxP.classList.remove("hidden");
    boxP.innerHTML = "...";
    boxButtons.classList.add("hidden");
    screen.classList.add("screenalmacen");

    inventory = items.filter(item => {
        //invItem = currentInv.find(invItem => invItem["item-id"] === item.id);
        //return invItem && parseInt(invItem.quantity) > 0;
        if(currentInv[item.id]>0){
            return item;
        }
    });

    inventory.forEach(item => {
        var square = document.createElement('itemsquare');
        square.classList.add('itemsquare');
        square.setAttribute('item-id', item.id);
        square.innerHTML = item.item + "<br> Cantidad: " + currentInv[item.id];
        //var squareimg = document.createElement('img');
        //squareimg.setAttribute('src',item.imgroute);
        //square.appendChild(squareimg);
        square.addEventListener('click', function () {
            selectItemFromInvClient(item.id);
        });
        screen.appendChild(square);
    });

}

function selectItemFromInvClient(id) {
    selectedItem = items.find(item => item.id === id);
    boxP.innerHTML = selectedItem.item + " - Precio: " + selectedItem.price + " de oro." + " <hr> " + selectedItem.desc;
    if (opt4button.classList.contains("hidden")) {
        opt4button.classList.remove("hidden");
    }
}

async function sellItem(item) {
    // Cambia a mostrador
    changeScreen(2);

    // Quitar botones de todas clases y event listener
    opt4button.classList.add("hidden");
    boxButtons.classList.add("hidden");

    // Quitar items
    itemsquares = document.getElementsByTagName("itemsquare");
    while (itemsquares[0]) itemsquares[0].parentNode.removeChild(itemsquares[0]);

    if (boxP.classList.contains("hidden")) {
        boxP.classList.remove("hidden");
    }

    // Comprobar si está bien
    if (matchingItems.includes(item)) {
        // Sumar oro
        gold += item.price;
        goldmeter.innerHTML = "Oro: " + gold;

        //Eliminar poción del inventario
        currentInv[item.id]-=1;

        // Responder
        respuestas = [
            "¡Perfecto! Justo lo que necesito. ¡Hasta luego!",
            "¡Muchas gracias! Ya nos veremos.",
            "Muchas gracias, nos vemos pronto.",
            "¡Genial! Aquí tienes tu pago. ¡Adiós!",
            "¡Estupendo! Es lo que buscaba. ¡Ten un buen día!"
        ];
        int = indiceAleatorio = Math.floor(Math.random() * respuestas.length);
        boxP.innerHTML = respuestas[int];

        await waitForClick();
    } else {
        // Responder
        respuestas = [
            "Creo que esto no me sirve... Ya volveré en otro momento.",
            "No, creo que no es lo que te he pedido. Bueno, pasa un buen día.",
            "¿Esto? Pero esto no sirve... Me voy, hasta más ver.",
            "Creo que te has equivocado... Lo siento, tengo que irme.",
            "Es una broma, ¿no? Tengo prisa, ya volveré."
        ];
        int = indiceAleatorio = Math.floor(Math.random() * respuestas.length);
        boxP.innerHTML = respuestas[int];

        await waitForClick();
    }

    await waitForClick();
    // Se va
    deleteClient();
}

function deleteClient() {
    var client = document.getElementById("currentClient");
    if (client != null) {
        client.remove();
    }
    hasClient = false;
    if (!boxButtons.classList.contains("hidden")) {
        boxButtons.classList.add("hidden");
    }
    if (boxP.classList.contains("hidden")) {
        boxP.classList.remove("hidden");
    }
    texttitle.innerHTML = "No hay nadie en tu tienda";
    boxP.innerHTML = "...";
    activarMenuLateral();
}

//GARDEN FUNCTIONS
/*
TODO:
- Load Plants based on if they are unlocked or not
- Onclick -> Collect crop -> quantity +1
- Figure out cooldowns?
- aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
- polen polarity
- aurora switch hojas/fruto
*/
function loadGarden() {
    var crop1 = document.createElement('crop');
    crop1.classList.add('crop');
    crop1.setAttribute('onclick', "harvest('i1')");
    screen.appendChild(crop1);
    if (progress.hasPetalos) {
        var crop = document.createElement('crop');
        crop.classList.add('crop');
        crop.setAttribute('onclick', "harvest('i2')");
        screen.appendChild(crop);
    }
    if (progress.hasRaices) {
        var crop = document.createElement('crop');
        crop.classList.add('crop');
        crop.setAttribute('onclick', "harvest('i3')");
        screen.appendChild(crop);
    }
    if (progress.hasPolen) {
        var crop = document.createElement('crop');
        crop.classList.add('crop');
        if (polentype == 1) {
            crop.setAttribute('onclick', "harvest('i4a')");
        } else {
            crop.setAttribute('onclick', "harvest('i4b')");
        }
        screen.appendChild(crop);
    }
    if (progress.hasAurora) {
        var crop = document.createElement('crop');
        crop.classList.add('crop');
        if (aurorapart == 1) {
            crop.setAttribute('onclick', "harvest('i5')");
        } else {
            crop.setAttribute('onclick', "harvest('i6')");
        }
        screen.appendChild(crop);
    }
}

function clearGarden() {
    crops = document.getElementsByTagName("crop");
    while (crops[0]) crops[0].parentNode.removeChild(crops[0]);
}

function harvest(id) {
    currentInv[id]++;
}


//CHANGE SCREEN FUNCTIONS
function changeScreen(option) {
    clearGarden();
    clearBackground();
    toggleClient("OFF");
    switch (option) {
        case 1:
            title.innerHTML = "Jardin";
            screen.classList.add("jardin");
            loadGarden();
            break;
        case 2:
            title.innerHTML = "Mostrador";
            screen.classList.add("mostrador");
            toggleClient("ON");
            break;
        case 3:
            title.innerHTML = "Trastienda";
            screen.classList.add("trastienda");
            break;
        case 4:
            title.innerHTML = "Recetario";
            break;
        case 5:
            title.innerHTML = "Ajustes";
            break;
        case 6:
            title.innerHTML = "Almacén";
            screen.classList.add("almacen");
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

//UTILITY FUNCTIONS
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

function desactivarMenuLateral() {
    bJardin.removeEventListener("click", listenerjardin);
    bMostrador.removeEventListener("click", listenermostrador);
    bTrastienda.removeEventListener("click", listenertrastienda);
    bRecetario.removeEventListener("click", listenerrecetario);
    bAjustes.removeEventListener("click", listenerajustes);
}

function activarMenuLateral() {
    bJardin.addEventListener("click", listenerjardin);
    bMostrador.addEventListener("click", listenermostrador);
    bTrastienda.addEventListener("click", listenertrastienda);
    bRecetario.addEventListener("click", listenerrecetario);
    bAjustes.addEventListener("click", listenerajustes);
}
