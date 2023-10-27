body = document.getElementsByTagName("body")
scoreP = document.getElementById("score")
timerP = document.getElementById("timer")
menuInicial = document.getElementById("menu-inicial")
menuTimeOut = document.getElementById("menu-timeOut")
finalScoreP = document.getElementById("puntos-final")
mazo = document.getElementById("mazo")
holes = document.querySelectorAll('img[id^="hole"]')
estaFuera = []
for (let i = 0; i < holes.length; i++) {
    estaFuera[i] = false
}
var time = 0
var puntos = 0
var timeout = []
// Cada cuanto se envia una señal para que un demonio salga (en milisegs)
signalTime = 500
// Máximo de tiempo para que salga un demonio desde que recibe la señal (en milisegs)
maxOutTime = 2000
// Mínimo de tiempo para que salga un demonio desde que recibe la señal (en milisegs)
minOutTime = 500
// Máximo de tiempo para que un demonio se esconda de nuevo en el agujero (en milisegs)
maxInTime = 2000
// Mínimo de tiempo para que un demonio se esconda de nuevo en el agujero (en milisegs)
minInTime = 500
// Probabilidad de que salga un santo (en porcentaje)
santoProb = 20
// Tiempo que durará el minijuego
minutos = 1
segundos = 00
esSanto = false
// Esta variable sirve para evitar errores al hacer doble click a "empezar"
inicio = true
timerUpdate()
// escondemos el mazo hasta que empieze el juego
mazo.style.display = "none"
// hace que le mazo siga al cursor
var posx = 0, posy = 0;
document.addEventListener('mousemove', function() {
    e = window.event;
    // Guardamos la posicion actual y la anterior
    posx = e.clientX;
    posy = e.clientY;
    // Establecer la nueva posición del elemento
    mazo.style.left = posx-(mazo.clientWidth-(mazo.clientWidth*33/100)) + "px"
    mazo.style.top = posy-(mazo.clientWidth-(mazo.clientWidth*40/100)) + "px"
  })
// empieza el juego
function comenzar() {
    if (inicio) {
        inicio = false
        // esconde el menu inicial
        menuInicial.style.display = "none"
        // hace aparecer el mazo
        mazo.style.display = "block"
        // inicia el que salgan los demonios
        time = Math.floor(Math.random() * maxOutTime) + minOutTime;
        salirInterval = setInterval(cualSale, time);
        // inicia el contador de tiempo
        timerInterval = setInterval(timer, 1000)
        body[0].style.cursor = "none"
    }
}
// contador de tiempo
function timer() {
    if (segundos > 0) {
        segundos--
    } else {
        minutos--
        segundos = 59
    }
    if (minutos == 0 && segundos == 0) {
        mazo.style.display = "none"
        finalScoreP.innerHTML = "Has aconseguit: " + puntos + " punts"
        menuTimeOut.style.display = "block"
        clearInterval(timerInterval);
        clearInterval(salirInterval);
        body[0].style.cursor = "default"
    }
    timerUpdate()
}
// Actualizar la cuenta atrás
function timerUpdate() {
    minutos2D = ("0" + minutos).slice(-2);
    segundos2D = ("0" + segundos).slice(-2);
    timerP.innerHTML = minutos2D + ":" + segundos2D
}
// Calcular por que agujero saldra el demonio
function cualSale() {
    hole = Math.floor(Math.random() * holes.length);
    salir(hole);
}
function salir(index) {
    if (!estaFuera[index]) {
        // sale un demonio o un santo aleatoriamente basado en la probabilidad
        aleat = Math.floor((Math.random() * 100)+1);
        if (aleat <= santoProb) {
            holes[index].src = "img/sant_antoni_hoyo.svg"
            esSanto = true
        } else {
            holes[index].src = "img/dimoni_hoyo.svg"
            esSanto = false
        }
        estaFuera[index] = true
        time = Math.floor(Math.random() * maxInTime) + minInTime;
        timeout[index] = setTimeout(entrar, time, index);
    }
}
function entrar(index) {
    holes[index].src = "img/hoyo.svg"
    estaFuera[index] = false
}
function mazazo(index) {
    if (estaFuera[index]) {
        if (esSanto && puntos > 0) {
            puntos--
        } else if (!esSanto) {
            puntos++
        }
        scoreP.innerHTML = "Punts: " + puntos
        entrar(index)
        clearTimeout(timeout[index])
    }
}
function cambiarMazo(index) {
    mazo.src = "img/mazo"+index+".svg"
}