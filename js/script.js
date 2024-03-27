
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
    
    const botonJar = bJardin.addEventListener("click", function() { changeScreen(1); });
    const botonMos = bMostrador.addEventListener("click", function() { changeScreen(2); });
    const botonTra = bTrastienda.addEventListener("click", function() { changeScreen(3); });
    const botonRec = bRecetario.addEventListener("click", function() { changeScreen(4); });
    const botonAju = bAjustes.addEventListener("click", function() { changeScreen(5); });

    changeScreen(2);

function changeScreen(option){
    switch(option){
        case 1:
            title.innerHTML="Jardin";
            clearBackground();
            screen.classList.add("jardin");
            toggleTextbox("ON");
            break;
        case 2:
            title.innerHTML="Mostrador";
            clearBackground();
            screen.classList.add("mostrador");
            toggleTextbox("ON");
            break;
        case 3:
            title.innerHTML="Trastienda";
            clearBackground();
            screen.classList.add("trastienda");
            toggleTextbox("ON");
            break;
        case 4:
            title.innerHTML="Recetario";
            clearBackground();
            toggleTextbox("ON");
            break; 
        case 5:
            title.innerHTML="Ajustes";
            clearBackground();
            toggleTextbox("OFF");
            break;   
    }
}

function toggleTextbox(option){
    switch(option){
        case "ON":
            textbox.classList.remove("hidden");
            screen.classList.remove("long");
            break;
        case "OFF":
            textbox.classList.add("hidden");
            screen.classList.add("long");
    }
}

function clearBackground(){
    screen.classList.remove("jardin");
    screen.classList.remove("mostrador");
    screen.classList.remove("trastienda");
}