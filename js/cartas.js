
// Creacion de Cartas
function crearCartasblancas (generoCarta){
    for(i=0 ; i < 7 ; i++){
        let aux = i;
        aux++
        MAZO.push(new carta(generoCarta,"blancas",aux,"",aux));
    }
}

// Creacion de Cartas
function crearCartasNegras (generoCarta){
    for(i=0;i<3;i++){
        let aux = i +10;
        MAZO.push(new carta(generoCarta,"negras",aux,"",aux));
    }
}

// INICIALIZACION DE VARIABLES

let sejuegoconFlor = false;
let manoJugador =[];
let manoOponente =[];
const MAZO = [];

// NOMBRE DE USUARIO, POR DEFECTO INVITADO, SI CAMBIA EL NOMBRE LO ALMACENA EN EL LOCALSTORAGE Y LO MATIENE
let jugador= "";
    jugador = localStorage.getItem("nombreJugador",jugador); 
    
    if(!jugador){
        jugador = "invitado";
        localStorage.setItem(`nombreJugador`, JSON.stringify(jugador));
        document.getElementById(`nombreJugador`).innerHTML = jugador;
        }
    document.getElementById("nombreJugador").innerHTML = jugador;

// PUNTAJE JUGADOR, POR DEFECTO 0, SI CAMBIA EL PUNTAJE LO ALMACENA EN EL LOCALSTORAGE Y LO MATIENE
let puntajeJugador= 0;

puntajeJugador = localStorage.getItem(`puntajeJugador`,puntajeJugador);
document.getElementById(`puntajeJugador`).innerHTML = puntajeJugador;

if(!puntajeJugador){
localStorage.setItem(`puntajeJugador`, JSON.stringify(puntajeJugador));
puntajeJugador = 0;
document.getElementById(`puntajeJugador`).innerHTML = puntajeJugador;
}


// PUNTAJE WEB, POR DEFECTO 0, SI CAMBIA EL PUNTAJE LO ALMACENA EN EL LOCALSTORAGE Y LO MATIENE
let puntajeWeb = 0;

puntajeWeb = localStorage.getItem(`puntajeWeb`,puntajeWeb);
document.getElementById(`puntajeWeb`).innerHTML = puntajeWeb;

if(!puntajeWeb){
localStorage.setItem(`puntajeWeb`, JSON.stringify(puntajeWeb));
puntajeWeb = 0;
document.getElementById(`puntajeWeb`).innerHTML = puntajeWeb;
}


let puntosAjugar = 15; 
puntosAjugar = localStorage.getItem(`puntosAjugar`,puntosAjugar);


if(!puntosAjugar){
localStorage.setItem(`puntosAjugar`, JSON.stringify(puntosAjugar));
}


let puntosdelTruco = 1;

//sin uso aun
let estadoTruco = ""
let estadoEnvido = ""
let puntosdelEnvido = 0;

let puntosEnvidoJugador = 0;
let puntosEnvidoOponente = 0;

let faceRonda1 = ""; // 
let faceRonda2 = ""; // compara la faceRonda1 con la faceRonda2
let faceRonda3 = ""; // compara la faceRonda1 con la faceRonda2 y faceRonda3
let soyMano = true;

let auxswitch = true;
let auxpuntos = true;

let seisNumerosAleatorios = [];
let mensajeamostrar = "";

let valormasaltode3 = 0; // calcula los puntos de una flor la flor
let valormasaltode2 = 0; // calcula los puntos de una flor la flor


let jugadorCartasNumero = 0;

let rondaUno = false;
let rondaDos = false;
let rondaTres = false;

let valorCarta1j = 0;
let valorCarta2j = 0;
let valorCarta3j = 0;

let contadorturnocarta = 1; // contador para creacion de cartas jugador
let contadorTurnoCartaWeb = 1; // contador para creacion de cartas Web

let yaSeJugo = "no"; //verifica que solo se ejecute una vez la mano aleatoria 
//y para que luego cambie la mano cada vez que se termine un turno 

let divVacio =`<div></div>`


class carta{
    constructor(genero,tipo,numero,img,valor){
        this.numero=numero;
        this.genero=genero;
        this.valor=valor;
        this.tipo=tipo;
        this.img=img;
    }
}

// PROCESO DE CREACION DEL MAZO Y LAS MANOS
for(j=0 ; j < 4 ; j++){
    if(j == 0){
        genero= "copa";
        crearCartasblancas(genero)
        crearCartasNegras(genero)
    }else if(j == 1){
        genero= "basto";
        crearCartasblancas(genero)
        crearCartasNegras(genero)
    }else if(j == 2){
        genero= "espada";
        crearCartasblancas(genero)
        crearCartasNegras(genero)
    }else if(j == 3){
        genero= "oro";
        crearCartasblancas(genero)
        crearCartasNegras(genero)
    }
}

//DARLE VALOR A LAS CARTAS PARA LA COMPETENCIA
for( let i =0 ; i < parseInt(MAZO.length); i++){
    if(MAZO[i].genero == "espada" && MAZO[i].numero == 1){
        MAZO[i].valor = 19;
    }
    if(MAZO[i].genero == "basto" && MAZO[i].numero == 1){
        MAZO[i].valor = 18;
    }
    if(MAZO[i].genero == "espada" && MAZO[i].numero == 7){
        MAZO[i].valor = 17;
    }
    if(MAZO[i].genero == "oro" && MAZO[i].numero == 7){
        MAZO[i].valor = 16;
    }
    if(MAZO[i].genero == "copa" && MAZO[i].numero == 1){
        MAZO[i].valor = 13;
    }
    if(MAZO[i].genero == "oro" && MAZO[i].numero == 1){
        MAZO[i].valor = 13;
    }
    if(MAZO[i].numero == 3){
        MAZO[i].valor = 15;
    }
    if(MAZO[i].numero == 2){
        MAZO[i].valor = 14;
    }
}

// AGREGAR IMAGENES A LAS CARTAS y MOSTRAR LAS TODAS LAS CARTAS
for( let i =0 ; i < parseInt(MAZO.length); i++){
    MAZO[i].img = `<img src="img/${MAZO[i].genero}/${MAZO[i].genero}_${MAZO[i].numero.toString()}-min.jpg" alt="Carta ${MAZO[i].numero} de ${MAZO[i].genero}" width="140px" class="imgCard">`;
    console.log(`${MAZO[i].numero} de ${MAZO[i].genero} tiene un Valor de: ${MAZO[i].valor}   
    ${MAZO[i].img}`);
}


// IMPLEMENTADO JQUERY TOMANDO VALORES DEL LOS RADIO BUTTOMS
$("#15puntos") 
    .change(function(){
        if( $(this).is(":checked") ){ 
            puntosAjugar  = parseInt( $(this).val()); 
            localStorage.setItem(`puntosAjugar`, JSON.stringify(puntosAjugar));
        }
    });
$("#30puntos") 
    .change(function(){ 
        if( $(this).is(":checked") ){ 
            puntosAjugar  = parseInt( $(this).val()); 
            localStorage.setItem(`puntosAjugar`, JSON.stringify(puntosAjugar));
        }
    });

//TOMANDO VALOR DEL SWICTH PARA VER SI SE JUEGA CON FLOR O NO
$("#switchflor") 
    .change(function(){ 
        if( $(this).is(":checked") ){ 
            sejuegoconFlor  =true; 
            localStorage.setItem(`sejuegoconFlor`, JSON.stringify(sejuegoconFlor));
        }else{
            sejuegoconFlor = false;
            localStorage.setItem(`sejuegoconFlor`, JSON.stringify(sejuegoconFlor));
        }
    });

