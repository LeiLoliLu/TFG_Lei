//#region VARIABLES
var hasClient = false;
var lastClient = 10;
var clientObj;
var matchingItems;
var selectedItem;
var polentype = 1; //1 active, 2 dormant
var cooldownPolen = false;
var cooldownAurora = false;
var aurorapart = 1; //1 hojas, 2 fruto
var lastHarvestTime = {};
const cooldowns = {
    'i1': 0.1,  // No cooldown for i1
    'i2': 5,
    'i3': 15,
    'i4a': 30,
    'i4b': 30,
    'i5': 45,
    'i6': 60
};

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
var togglerPolen = document.getElementById("togglerpolen");
var togglerAurora = document.getElementById("toggleraurora");
var crop1 = document.getElementById("i1");
var crop2 = document.getElementById("i2");
var crop3 = document.getElementById("i3");
var crop4 = document.getElementById("i4");
var crop56 = document.getElementById("i56");
var backshop1 = document.getElementById("backshop1");
var backshop2 = document.getElementById("backshop2");
var backshop3 = document.getElementById("backshop3");
var opt1button = document.getElementById("opt1");
var opt2button = document.getElementById("opt2");
var opt3button = document.getElementById("opt3");
var opt4button = document.getElementById("opt4");

const clientela = setInterval(summonClient, 5000);

changeScreen(2);
activarMenuLateral();
goldmeter.innerHTML = "Oro: " + gold;
//#endregion

//#region CLIENT FUNCTIONS
/** 
 * summonClient : Si no hay un cliente ya, tiene un 50% de posibilidades de generar un cliente. Si se genera, se redirige a CreateClient y se aplica el efecto de alarma.
 * createClient : Crea y devuelve un elemento client con la clase Client, id "currentClient" y onclick que lleva a clientActions.
 *                Si el jugador no está en el mostrador se muestra oculto. Se le da el id "CurrentClient".
 *                Se selecciona un número aleatorio para dar la información de la lista de townsfolk mientras no sea el último que ha venido.
 * clientActions : Llama a desactivarMenuLateral y elimina el onclick del cliente, carga el nombre de el cliente y su saludo.
 *                 Espera a que el usuario haga click para continuar.
 *                 Llama a clientPetition y vuelve a esperar, para luego llamar a toggleClientOptions.
 * clientPetition: Obtiene que objetos puede pedir un cliente por su tipo de cliente en la lista items.
 *                 Selecciona de forma aleatoria uno de esos objetos.
 *                 Selecciona de forma aleatoria una de las posibles formas de pedir dicho objeto.
 *                 Guarda en matching items los items que pueden responder a la petición seleccionada.
 * toggleClientOptions: Oculta BoxP y muestra los botones de acción, que llevan a openInvFromClient, TalkToClient y deleteClient respectivamente.
 * openInvFromClient: Cambia la pantalla usando changeScreen a el almacen, muestra BoxP de nuevo y oculta los botones de toggleClientOptions. Se le añade la clase screenalmacen a la pantalla.
 *                    Se filtran los Items cuya cantidad sea mayor que cero.
 *                    Se crea un cuadrado con la info de cada item que se ha filtrado y se acopla a la pantalla.
 *                    Cada cuadrado manda a selectItemFromInvClient.
 * selectItemFromInvClient: Muestra la información del objeto seleccionado en la caja de texto y muestra el botón que va a sellItem.
 * sellItem: Cambia al mostrador, oculta botones de cliente y de continuar, y elimina los elementos square creados en openInvFromClient.
 *           Comprueba si el item seleccionado se encuentra en los matchingitems de clientPetition. Si está, se suma el oro al jugador y se resta el objeto del inventario.
 *           Si no, no se suma el oro ni se resta. Llamada a DeleteItem despues de esperar a click.
 * deleteClient: Elimina el cliente de la tienda y reinicia la caja de texto.
*/
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
        if (currentInv[item.id] > 0) {
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
        currentInv[item.id] -= 1;

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
//#endregion

//#region GARDEN FUNCTIONS
function loadGarden() {
    if (progress.hasPolen) { togglerPolen.classList.remove("hidden"); }
    if (progress.hasAurora) { togglerAurora.classList.remove("hidden"); }

    crop1.classList.remove("hiddencrops");
    crop1.setAttribute('onclick', "harvest('i1','i1')");
    if (progress.hasPetalos) {
        crop2.classList.remove("hiddencrops");
        crop2.setAttribute('onclick', "harvest('i2','i2')");
    }
    if (progress.hasRaices) {
        crop3.classList.remove("hiddencrops");
        crop3.setAttribute('onclick', "harvest('i3','i3')");
    }
    if (progress.hasPolen) {
        crop4.classList.remove("hiddencrops");
        if (polentype == 1) {
            crop4.setAttribute('onclick', "harvest('i4a','i4')");
        } else {
            crop4.setAttribute('onclick', "harvest('i4b','i4')");
        }
    }
    if (progress.hasAurora) {
        crop56.classList.remove("hiddencrops");
        if (aurorapart == 1) {
            crop56.setAttribute('onclick', "harvest('i5','i56')");
        } else {
            crop56.setAttribute('onclick', "harvest('i6','i56')");
        }
    }
}


function harvest(id, elemid) {
    var currentTime = new Date().getTime();
    var cooldown = cooldowns[id];

    if (cooldown && lastHarvestTime[id] && (currentTime - lastHarvestTime[id]) < cooldown * 1000) {
        console.log("This item is still on cooldown. Please wait before harvesting again.");
        return;
    }
    if (elemid == "i4") {
        cooldownPolen = true;
    }
    if (elemid == "i56") {
        cooldownAurora = true;
    }


    currentInv[id]++;
    lastHarvestTime[id] = currentTime;

    var cropElement = document.getElementById(elemid);
    if (elemid == "i1") {
        cropElement.classList.add('cooldown1');
        cropElement.style.animationDuration = 0.5 + 's';
    } else {
        cropElement.classList.add('cooldown');
        cropElement.style.animationDuration = cooldown + 's';
    }

    var elemClick = cropElement.getAttribute('onclick');
    cropElement.removeAttribute('onclick');
    setTimeout(() => {

        if (elemid == "i4") {
            cooldownPolen = false;
        }
        if (elemid == "i56") {
            cooldownAurora = false;
        }
        cropElement.classList.remove('cooldown1');
        cropElement.classList.remove('cooldown');
        cropElement.setAttribute('onclick', elemClick);
    }, cooldown * 1000);
}

function togglePolen() {
    if (cooldownPolen) {
        return;
    }
    if (polentype === 1) {
        polentype = 2;
        togglerPolen.style.backgroundPosition = 'right';
        togglerPolen.innerHTML = "Recogiendo Polen Vulcano Durmiente"
        crop4.removeAttribute('onclick');
        crop4.setAttribute('onclick', "harvest('i4b','i4')");
    } else {
        polentype = 1;
        togglerPolen.style.backgroundPosition = 'left';
        togglerPolen.innerHTML = "Recogiendo Polen Vulcano Activo"
        crop4.removeAttribute('onclick');
        crop4.setAttribute('onclick', "harvest('i4a','i4')");
    }
}

function toggleAurora() {
    if (cooldownAurora) {
        return;
    }
    if (aurorapart === 1) {
        aurorapart = 2;
        togglerAurora.style.backgroundPosition = 'right';
        togglerAurora.innerHTML = "Recogiendo Frutos de Aurora";
        crop56.removeAttribute('onclick');
        crop56.setAttribute('onclick', "harvest('i6','i56')");
    } else {
        aurorapart = 1;
        togglerAurora.style.backgroundPosition = 'left';
        togglerAurora.innerHTML = "Recogiendo Hojas de Aurora"
        crop56.removeAttribute('onclick');
        crop56.setAttribute('onclick', "harvest('i5','i56')");
    }
}

function clearGarden() {
    togglerAurora.classList.add("hidden");
    togglerPolen.classList.add("hidden");
    crop1.classList.add('hiddencrops');
    crop2.classList.add('hiddencrops');
    crop3.classList.add('hiddencrops');
    crop4.classList.add('hiddencrops');
    crop56.classList.add('hiddencrops');
}
//#endregion

//#region BACKSHOP FUNCTIONS
/**TODO:
 * backshop2 - upgradeboard -> openUpgrades() -> vista nueva, listado de mejoras, modificar progress 
 * backshop3 - magicpot-> openMagicPot() -> vista nueva, mostrar solo ingredientes, seleccionar 3 ingredientes, crear pocion por esos ingredientes, sumar pocion a inv, restar ingredientes
 *          Si receta no descubierta, descubrir recetas.
 * 
 * recetario: listar recetas descubiertas, if click -> instant potion at magic pot
 */
function loadBackshop() {
    backshop1.classList.remove("hidden");
    backshop2.classList.remove("hidden");
    backshop3.classList.remove("hidden");
    backshop3.parentElement.classList.remove("hidden");
}
function clearBackshop() {
    backshop1.classList.add("hidden");
    backshop2.classList.add("hidden");
    backshop3.classList.add("hidden");
    backshop3.parentElement.classList.add("hidden");
}

function openInvFromBackshop() {
    changeScreen(6);

    inventory = items.filter(item => {
        if (currentInv[item.id] > 0) {
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
            selectItemFromInvBackdrop(item.id);
        });
        screen.appendChild(square);
    });
}

function selectItemFromInvBackdrop(id) {
    selectedItem = items.find(item => item.id === id);
    boxP.innerHTML = selectedItem.item + " - Precio: " + selectedItem.price + " de oro." + " <hr> " + selectedItem.desc;
}

function openUpgrades(){
    changeScreen(7);
    upgradesData.forEach(function(upgrade) {
        if (!progress[upgrade.id]) {
          var upgradesquare = document.createElement('upgradesquare');
          upgradesquare.classList.add('upgrade');
  
          var squareimg = document.createElement('img');
          squareimg.setAttribute('src', upgrade.imgroute);
          upgradesquare.appendChild(squareimg);
  
          var textDiv = document.createElement('div');

          var pTitulo = document.createElement('p');
          pTitulo.innerHTML = upgrade.title;
          pTitulo.classList.add("upgradeTitle");

          var pText = document.createElement('p');
          pText.innerHTML = upgrade.text;

          textDiv.appendChild(pTitulo);
          textDiv.appendChild(pText);
          textDiv.classList.add('upgradeText');
          upgradesquare.appendChild(textDiv);
  
          var pPrice = document.createElement('p');
          pPrice.innerHTML = 'Price: ' + upgrade.price;
          upgradesquare.appendChild(pPrice);
  
          screen.appendChild(upgradesquare);
        }
      });
    
}



//#endregion

//#region CHANGE SCREEN FUNCTIONS
function changeScreen(option) {
    itemsquares = document.getElementsByTagName("itemsquare");
    while (itemsquares[0]) itemsquares[0].parentNode.removeChild(itemsquares[0]);
    upgradesquares = document.getElementsByTagName("upgradesquare");
    while (upgradesquares[0]) upgradesquares[0].parentNode.removeChild(upgradesquares[0]);
    boxP.innerHTML="...";
    clearBackshop();
    clearGarden();
    clearBackground();
    toggleClient("OFF");
    switch (option) {
        case 1:
            title.innerHTML = "Jardín";
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
            loadBackshop();
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
            screen.classList.add("screenalmacen");
            break;
        case 7:
            title.innerHTML = "Tablón de Mejoras";
            screen.classList.add("almacen");
            screen.classList.add("screenalmacen");
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
//#endregion

//#region UTILITY FUNCTIONS
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
//#endregion
