// Retorna un número aleatorio
function numeroAleatorio(numMin, numMax) {
    aux = Math.round (Math.random() * (numMax - numMin) + numMin);
    return aux;
}

// Tomar numeros aleatorios usarlo para recorer un for de 6 (total de cartas a repartir) al mismo tiempo ese numero aleatorio almacenar en una array auxiliar para que no se repitan las cartas
function elegirSeisNumeroAleatorios(){
    let auxQueNoSeRepiten = [];
    for(let p = 0; p < 6; p++ ){
        let aux = numeroAleatorio(1,40);
        for(h= 0; h < auxQueNoSeRepiten.length; h++){
                for(d= h; d < auxQueNoSeRepiten.length; d++){
                    while(aux == auxQueNoSeRepiten[d]){
                        aux = numeroAleatorio(1,40);
                }
            }
        }
    auxQueNoSeRepiten.push(aux);
    }
    return auxQueNoSeRepiten;
}


// REPARTE LA MANO DEL JUGADOR
function repartirManoJugador(cartasSeis){
    manoJugador[0]=MAZO[cartasSeis[0]];
    for(i=1 ; i <3; i++){
        manoJugador[i]=(MAZO[cartasSeis[i]]);
    }    
}
// REPARTE LA MANO DE LA WEB
function repartirManoOponente(cartasSeis){
    manoOponente[0]=MAZO[cartasSeis[3]];
    for(i=4 ; i <6; i++){
        manoOponente[i-3]=(MAZO[cartasSeis[i]]);
    }
}

//QUITA LA CARTA USADA EN PRIMERA RONDA
function removerCartas(manoaBorrar,carta1,carta2){
        aux1 =carta1;
        aux2 =carta2;
        manoaBorrar.pop();
        manoaBorrar[0]=aux1;
        manoaBorrar[1]=aux2;
}

//QUITA LA CARTA USADA EN SEGUNDA RONDA
function removerCartasSegundaMano(manoaBorrar,carta1){
        aux = carta1;
        manoaBorrar.pop();
        manoaBorrar[0] = aux;
}

//QUITA LA CARTA USADA EN TERCERA RONDA
function removerCartasTercera(manoaBorrar){
        manoaBorrar[0] = 0;
}

//                  SIN USO                  
/* // LIMPIA LA MANO AL TERMINAR
function limpiarManos(){
    for(i=0 ; i <manoOponente.length; i++){
        manoJugador.pop();
    }
    for(i=0 ; i <manoOponente.length; i++){
        manoOponente.pop();
    }
} */


// Metodo para calcular los tantos del envido
function siContieneNegras(carta1, carta2){
if((carta1.tipo == "negras") && (carta2.tipo == "negras")){
    return 20
}else if(carta1.tipo == "negras"){
    valor = 20 + carta2.numero;
    return valor
}else if (carta2.tipo == "negras"){
    valor = 20 + carta1.numero;
    return valor
}else
    valor = 20 + carta1.numero + carta2.numero;
    return valor
}

function cartaMasAltaEnLaMano(manoGenerica){
auxcontado2 = 0;
for (i = 0; i < manoGenerica.length ; i++){
        if ((manoGenerica[i].numero > auxcontado2) && (manoGenerica[i].numero < 9 )){
            auxcontado2 = manoGenerica[i].numero;
        }
    }
return auxcontado2
}

// contar todos los puntos si se juega con flor
function conFlorPuntos(manoGenerica){
    if (manoGenerica[0].genero == manoGenerica[1].genero == manoGenerica[1].genero){ 
        auxcontador= 0;
        for(p=0; p< manoGenerica.length ; p++ ){
            if( manoGenerica[p].numero < 9){
                auxcontador = auxcontador + manoGenerica[p].numero;
            }
        }
    return auxcontador + 20
    }
}


function manoAleatoria() {
    let Auxnumeroaleatorio = numeroAleatorio(1,100);
    if( Auxnumeroaleatorio >50){
        soyMano = false;
        mostarVisorTexto(`Empieza Jugando la Web, es Mano`);
        primeraManoWeb();
    }else{
        soyMano = true;
        mostarVisorTexto(`Empiezas Jugando tu, ya que eres Mano`);
    }
}


// Calcula si se forma envido
function envido(manoGenerica){
    if ((manoGenerica[0].genero == manoGenerica[1].genero )&&(manoGenerica[0].genero == manoGenerica[2].genero)){ // si sale flor pero no se juega con flor se suman los puntos de las dos mas altas
        auxMasAlta= [];

        for(j=0; j < manoGenerica.length; j++){
            if(manoGenerica[j].tipo == "blancas"){
                auxMasAlta[j] = manoGenerica[j].numero;
            }
        }
        auxMasAlta.forEach(element => {
            valormasaltode3 += element;
        });
    //ordenar el array para separar las dos valores de las cartas mas altas y asi resolver el envido.
        auxMasAlta.sort();
        valormasaltode2 = auxMasAlta[1] + auxMasAlta[2]

        if(sejuegoconFlor == true){
            valormasaltode3 += 20;
            return valormasaltode3
        }else{
            valormasaltode2 += 20;
            return valormasaltode2
        }
    }

    if (manoGenerica[0].genero == manoGenerica[1].genero){                // compara si hay envido y devuelve el resultado
        return siContieneNegras(manoGenerica[0],manoGenerica[1]);
    }else if (manoGenerica[2].genero == manoGenerica[1].genero){
        return siContieneNegras(manoGenerica[2],manoGenerica[1]);
    }else if (manoGenerica[0].genero == manoGenerica[2].genero){
        return siContieneNegras(manoGenerica[0],manoGenerica[2]);
    }else if((manoGenerica[0].genero != manoGenerica[2].genero) && (manoGenerica[0].genero != manoGenerica[1].genero)){  // en el caso de no formar envido devuelve la carta de 1 a 7 mas alta, en caso de tener todas negras devolvera 0 como tantos
        return cartaMasAltaEnLaMano(manoGenerica);
    }
}


// Consulta si quiere jugar el envido y el resultado del mismo.
function cantarEnvido(){
    //validacionQuiero(); si se quiso continua sino se hay un break y se pasan los puntos acumulados
    $(`#envido`).hide();
        
        if (QuieroEnvido = true){
            $(`#envido-envido`).show();
            $(`#real-envido`).show();
            $(`#falta-envido`).show();
            if( puntosEnvidoJugador > puntosEnvidoOponente ){
                mostarVisorTexto(`Ganaste el Envido con ${puntosEnvidoJugador} a la web que tenia ${puntosEnvidoOponente} `);
                puntajeJugador++;
                
            }else if(puntosEnvidoJugador < puntosEnvidoOponente){
                mostarVisorTexto(`Perdiste el Envido con ${puntosEnvidoJugador} a la web que tenia ${puntosEnvidoOponente} `);
                puntajeWeb++;
                
            }else if(puntosEnvidoJugador == puntosEnvidoOponente){
                if(soyMano){
                    mostarVisorTexto(`Ganaste el Envido porque sos mano con ${puntosEnvidoJugador} a la web que tenia ${puntosEnvidoOponente} `);
                    puntajeJugador++;
                    
                }else{
                    mostarVisorTexto(`Perdiste el Envido por no ser mano con ${puntosEnvidoJugador} a la web que tenia ${puntosEnvidoOponente} `);
                    puntajeWeb++;
                    
                }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

            }
            
            
        }

    gurdarPuntosJugadorLStorage(puntajeJugador);
    gurdarPuntosWebLStorage(puntajeWeb);
    ganadorJuego();

}

// OPCION SI NO TE GUSTA LA MANO Y NO QUERES JUGAR ESTA RONDA
function irAlMazo(){
    if(faceRonda1 != ""){
        puntajeWeb = parseInt( puntajeWeb) +1;
        gurdarPuntosWebLStorage(puntajeWeb);
    }else{
        puntajeWeb = parseInt( puntajeWeb) +2;
        gurdarPuntosWebLStorage(puntajeWeb);
    }
    $(`#CartaDorso1`).remove();
    $(`#CartaDorso2`).remove();
    $(`#CartaDorso3`).remove();
    cambioDeMano();
    ganadorJuego();
    ocultarbotones();
}

//MENSAJES A MOSTRAR CUANDO SE TERMINA EL JUEGO
function ganadorJuego(){
    if ((puntajeWeb >= puntosAjugar) || (puntajeJugador >= puntosAjugar)){
        if(puntajeWeb > puntosAjugar){
        mostarVisorTexto(`PERDISTE!!!
        Puntajes Finales
        ${jugador}     tienes: ${puntajeJugador}
            la Web: ${puntajeWeb}`);
        }else{
            mostarVisorTexto(`GANASTE!!!
        Puntajes Finales
        ${jugador}     tienes: ${puntajeJugador}
                        la Web: ${puntajeWeb}`);
        }
    }
}

//CAMBIA DE MANO CADA VEZ QUE SE REPARTE
function cambioDeMano(soyMano) {
    if(soyMano = true){
        soyMano = false;
    }else{
        soyMano = true;
    }
    return soyMano
}


function terminoMano(string){

    puntajeJugador = parseInt( puntajeJugador );
    gurdarPuntosJugadorLStorage(puntajeJugador);

    puntajeWeb = parseInt( puntajeWeb );
    gurdarPuntosWebLStorage(puntajeWeb);
    
    $(`#CartaDorso1`).remove();
    $(`#CartaDorso2`).remove();
    $(`#CartaDorso3`).remove();
    ganadorJuego();
    cambioDeMano();
    return ocultarbotones();
}

/* 
function validacionQuiero() {
    if(validarQuiero == "aun no acepto"){
        break;
    }else if(validarQuiero == "acepto"){
        return true
    }else if(validarQuiero == "no acepto"){
        return false
    }
}

function quiero(){
    validarQuiero == "acepto";
    return true;
}
function noQuiero(){
    validarQuiero == "no acepto";
    return false;
} 

 */

// CREARA LOS BOTONES PARA ACEPTAR O CANCELAR Y LUEGO LO OCULTARA CUANDO SE ELIJA UNA OPCION
function crearBotonQuieroNoQuiero() {
    botonQuiero =`<div class="boton-quiero" id= "Quiero" value="quiero">
                <a onclick="quiero()">Quiero</a>
    </div>`
    botonNoQuiero =`<div class="boton-quiero" id= "noquiero" value="noquiero">
        <a onclick="noQuiero()">No Quiero</a>
    </div>`

    $(`#quiero-noquiero`).append(botonQuiero);
    $(`#quiero-noquiero`).append(botonNoQuiero);
}

// ORDENA DE MENOR A MAYOR PARA IMPLEMENTAR EN EL TRUCO
function ordenarArrayDeMenoraMayor(array){
    for(k = 0; k < array.length; k++){
        for(j = k; j < array.length; j++){
            if(array[k].valor > array[j].valor){
                aux = array[j];
                array[j] = array[k];
                array[k] = aux;
            }
        }
    }
}

//FUNCION PARA QUE TOME UN CARTA ALEATORIAMENTE
function jugarCartaWeb() {
    let auxramdon = numeroAleatorio(1,100)
    if( auxramdon < 33){ // si el numero es menor a 33 jugara de una manera pasiva
        jugarCartaOponete(manoOponente[0],"carta1Webj");
        removerCartas(manoOponente,manoOponente[1],manoOponente[2]);
    }else if( auxramdon > 32 && auxramdon < 66 ){ // si el numero es mayor a 32 y menor a 66 jugara de una manera agresiva
        jugarCartaOponete(manoOponente[2],"carta1Webj");
        removerCartas(manoOponente,manoOponente[1],manoOponente[0]);
    }else if( auxramdon > 65){ // si el numero es mayor a 66 jugara de una manera aleatoria
        jugarCartaOponete(manoOponente[0],"carta1Webj");
        removerCartas(manoOponente,manoOponente[1],manoOponente[2]);
    }
}

//CANTA EL ENVIDO Y JUEGA UNA CARTA
function primeraManoWeb() {
    if( envido(manoOponente) > 25){
        // si el envido es mayor a 25 cantar ENVIDO
        crearBotonQuieroNoQuiero();
        cantarEnvido();
    }
    ocultarEnvido();
    jugarCartaWeb();
}


//              SIN USO POR AHORA                   
function webJuega() {
    let auxramdon = numeroAleatorio(1,100)
    if(manoOponente.length == 2){
        if( auxramdon < 50){ // si el numero es menor a 50 jugara de una manera pasiva
            jugarCartaOponete(manoOponente[0],"carta2Webj");
            removerCartasSegundaMano(manoOponente,manoOponente[1]);
        }else if( auxramdon > 49 ){ // si el numero es mayor a 49 jugara de una manera agresiva
            jugarCartaOponete(manoOponente[1],"carta2Webj");
            removerCartasSegundaMano(manoOponente,manoOponente[0]);
        }
    }
    if(manoOponente.length == 1){
            jugarCartaOponete(manoOponente[0],"carta3Webj");
            removerCartasTercera(manoOponente);
    }
    if(turnoEmparejamiento == 1){
        faceRonda1 = "web";
    } else if(turnoEmparejamiento == 2){
        faceRonda2 = "web";
    }else if(turnoEmparejamiento == 3){
        faceRonda3 = "web";
    }
}

//              SIN USO POR AHORA                   
function queCartaJuegalaWeb() { // primer Variable es el Valor de la carta que jugo el jugador, segundo Valor es la ubicacion en la mesa a bajar la carta.

        // juega la primera carta
    if(rondaUno == true){

        if(manoOponente[0].valor > valorCarta1j){
        faceRonda1 ="Web";
            
        }else if (manoOponente[0].valor == valorCarta1j){
            faceRonda1 ="empate";
        }else if (manoOponente[0].valor < valorCarta1j){
            faceRonda1 ="Jugador";
        }
        jugarCartaOponete(manoOponente[0],`carta1Webj`);
        rondaUno == false;
    }

    if(rondaDos == true){
        
        if(manoOponente[1].valor > valorCarta2j){
        faceRonda2 ="Web";
            
        }else if (manoOponente[1].valor == valorCarta2j){
            faceRonda2 ="empate";
        }else if (manoOponente[1].valor < valorCarta2j){
            faceRonda2 ="Jugador";
        }
        jugarCartaOponete(manoOponente[1],`carta2Webj`);
        rondaDos = false;
    }
    if(rondaTres == true){
        
        if(manoOponente[2].valor > valorCarta3j){
        faceRonda3 ="Web";
        }else if (manoOponente[2].valor == valorCarta3j){
            faceRonda3 ="empate";
        }else if (manoOponente[2].valor < valorCarta3j){
            faceRonda3 ="Jugador";
        }
        jugarCartaOponete(manoOponente[2],`carta3Webj`);
        rondaTres= false;
    }

}


//Crea los dorsos cuando se reparte.
const crearDorso = () =>{
    
    let nuevosDorsos = "";
    nuevosDorsos = `<div id="CartaDorso1">
    <img src="img/dorso-de-cartas.gif" alt="dorso de carta" width="140px" >
</div>
<div id="CartaDorso2">
    <img src="img/dorso-de-cartas.gif" alt="dorso de carta" width="140px" >
</div>
<div id="CartaDorso3">
    <img src="img/dorso-de-cartas.gif" alt="dorso de carta" width="140px" >
    
</div>
    `
    $(`#ubicacionDorso`).append(nuevosDorsos);
}


    //mostar carta en mesa y borrar dorso
    // MUEVE LA CARTA JUGADA DE LA WEB A LA MESA ********* SIN ACTIVAR *********
const jugarCartaOponete = (cartaParaCrear,Ubicacion)=>{
        
    let acumuladorOponente = "";
        acumuladorOponente = `<div class="cardWeb${contadorTurnoCartaWeb}" id="cartaWeb${contadorTurnoCartaWeb}"style="width: 90px;" value="${cartaParaCrear.valor}">
        ${cartaParaCrear.img}
        <div class="card-body">
        </div>
    </div>`
    contadorTurnoCartaWeb++

    if(Ubicacion == `carta1Webj`){
        $(`#carta1Webj`).append(acumuladorOponente);
        $(`#CartaDorso1`).remove();
    }else if(Ubicacion == `carta2Webj`){
        $(`#carta2Webj`).append(acumuladorOponente);
        $(`#CartaDorso2`).remove();
    }else if(Ubicacion == `carta3Webj`){
        $(`#carta3Webj`).append(acumuladorOponente);
        $(`#CartaDorso3`).remove();
    } 
}

function ocultarEnvido() {
    $(`#envido`).hide();
    $(`#envido-envido`).hide();
    $(`#real-envido`).hide();
    $(`#falta-envido`).hide();
}



function repartirCartas(){
    limpiarMesa();
    let contenedorcartas = "";
    contenedorcartas += ` <section id="manoJugador">
                
    </section>`;
    $(`#contenedor-mano`).append( contenedorcartas);

    let acumulador = ""
    seisNumerosAleatorios= elegirSeisNumeroAleatorios();
    repartirManoJugador(seisNumerosAleatorios);
    repartirManoOponente(seisNumerosAleatorios);
    // VER NUMEROS QUE SE ASIGANARAN ALEATORIAMENTE AL MAZO PARA PODER INICIAR LA PARTIDA

            contador = 1;
    manoJugador.forEach((elemento)=>{
        acumulador += `<div class="card${contador}" id="carta${contador}"style="width: 90px;" value="${elemento.valor}">
        ${elemento.img}
        <div class="card-body">
        <a onclick='moverCarta("carta${contador}")' id="botton${contador}" class="button" >Jugar</a>
        </div>
    </div>`
    contador++
    //valorjugadorcarta[contador - 1] = elemento.valor;
    })
    
    $(`#manoJugador`).append( acumulador);
    puntosEnvidoJugador = envido(manoJugador);
    puntosEnvidoOponente = envido(manoOponente);
    manoAleatoria();
    crearDorso();
    $(`#repartir-cartas`).hide();
    $(`#cantar-truco`).show();
    $(`#ir-al-mazo`).show();
    $(`#envido`).show();
    ordenarArrayDeMenoraMayor(manoOponente);
}

// GUARDA LOS PUNTOS DEL JUGADOR
function gurdarPuntosJugadorLStorage(puntajeJ){
    document.getElementById(`puntajeJugador`).innerHTML = puntajeJ;
    localStorage.setItem((`puntajeJugador`),puntajeJ);
}

// GUARDA LOS PUNTOS DE LA WEB
function gurdarPuntosWebLStorage(puntajeW){
    document.getElementById(`puntajeWeb`).innerHTML = puntajeW;
    localStorage.setItem((`puntajeWeb`),puntajeW);
}

// Cambia el nombre del jugador
const cambiarNombre = ()=>{
    jugador = prompt("ingres su nombre").toUpperCase();
    localStorage.setItem("nombreJugador",jugador);
    document.getElementById("nombreJugador").innerHTML = jugador;
    mostarVisorTexto(`cambiaste el nombre por ${jugador} `);
}
// restablece los puntos del jugador y la Web
const restablecerPuntos = ()=>{
    puntajeJugador = 0;
    localStorage.setItem(`puntajeJugador`, JSON.stringify(puntajeJugador));
    document.getElementById(`puntajeJugador`).innerHTML = puntajeJugador;
    puntajeWeb = 0;
    localStorage.setItem(`puntajeWeb`, JSON.stringify(puntajeWeb));
    document.getElementById(`puntajeWeb`).innerHTML = puntajeWeb;
    mostarVisorTexto("Restableciste los puntos a cero" );
}
//funcion para mostrar las acciones
function mostarVisorTexto (texto){
    mensajeamostrar = mensajeamostrar + `${texto} \r\n`
    $("#visortexto").val(`${mensajeamostrar}`);
}

//FUNCION PARA OCULTAR BOTONES
function ocultarBoton(idboton){
    idboton = `${idboton}`;
    $(idboton).hide();
}

//FUNCION PARA MOSTAR BOTONES
function mostarBoton(idboton){
    idboton = `${idboton}`;
    $(idboton).show();
}

function verificarSiesNumero(numero) {
    if(isNaN(numero)){
        return numero = 0;
    }
}

function asiganarValores() {

    valorCarta1j = parseInt( $("#carta1j div").attr("value"));
    if($("#carta2j div").attr("value") > 0){
        valorCarta2j =parseInt( $("#carta2j div").attr("value"));
    }
    if($("#carta3j div").attr("value") > 0){
        valorCarta3j =parseInt( $("#carta3j div").attr("value"));
    }
    return compararRondas();
}


// MUEVE LA CARTA JUGADA A LA MESA Y DEJA DE MOSTRARLA EN LA MANO
const moverCarta = (nombre)=>{
    let div = document.getElementById(nombre);
    
    if(contadorturnocarta == 1){
        $(`#${nombre}`).clone().prependTo(`#carta1j`);
    }else if(contadorturnocarta == 2){
        $(`#${nombre}`).clone().prependTo(`#carta2j`);
    }else if(contadorturnocarta == 3){
        $(`#${nombre}`).clone().prependTo(`#carta3j`);
    }
    
    if(nombre == "carta1"){
        ocultarBoton(`#botton1`);
    }else if (nombre == "carta2"){
        ocultarBoton(`#botton2`);
    }else if (nombre == "carta3"){
        ocultarBoton(`#botton3`);
    }

    $(`#manoJugador`).append( divVacio);
    if(div !== null){
        while (div.hasChildNodes()){
            div.removeChild(div.lastChild);
        }
    }
    contadorturnocarta++
    if(contadorturnocarta >3){
        contadorturnocarta = 1;
    }

    jugadorCartasNumero++;
    return asiganarValores();
}


function lanzaCartaWebParaGanar() {
    //lanza la carta
    if(valorCarta3j > 0){
        if(manoOponente[0].valor > valorCarta3j){
            faceRonda3 = "Web";
            jugarCartaOponete(manoOponente[0],`carta3Webj`);
            removerCartasTercera(manoOponente);
            return comparacionDeFaces();
            //mostarVisorTexto(`termino la mano`);
        }else if(manoOponente[0].valor == valorCarta3j){
            faceRonda3 = "empate";
            jugarCartaOponete(manoOponente[0],`carta3Webj`);
            removerCartasTercera(manoOponente);
            return comparacionDeFaces();
            //mostarVisorTexto(`termino la mano`);
        }else if(manoOponente[0].valor < valorCarta3j){
            faceRonda3 = "Jugador";
            jugarCartaOponete(manoOponente[0],`carta3Webj`);
            removerCartasTercera(manoOponente);
            return comparacionDeFaces();
            //mostarVisorTexto(`termino la mano`);
        }
    }
    if(valorCarta2j > 0){
        if(manoOponente[1].valor > valorCarta2j){
            faceRonda2 = "Web";
            //comparar con faceRonda1 para ver si hay empate y se termina
            if(faceRonda1 == "empate"){
                terminoMano();
                return mostarVisorTexto(`la Web gano, te toca ${jugador}.`);
            }else if(faceRonda1 == "Jugador"){
            jugarCartaOponete(manoOponente[1],`carta2Webj`);
            removerCartasSegundaMano(manoOponente,manoOponente[0]);
            comparacionDeFaces();
            return lanzaCartaWebMasBaja();
            }
        }else if(manoOponente[1].valor == valorCarta2j){
            faceRonda2 = "empate";
            //comparar con faceRonda1 para ver si hay empate y se termina
            if(faceRonda1 == "Web"){
                terminoMano();
                return mostarVisorTexto(`la Web gano, porque hizo primera.`);
            }else if (faceRonda1 == "Jugador"){
                terminoMano();
                return mostarVisorTexto(`${jugador} Ganaste!, porque hiciste primera.`);
            }
        }else if(manoOponente[1].valor < valorCarta2j){
            faceRonda2 = "Jugador";
            //comparar con faceRonda1 para ver si hay empate y se termina
            if(faceRonda1 == "empate"){
                return terminoMano();
            }else if(faceRonda1 == "Web"){
                jugarCartaOponete(manoOponente[1],`carta2Webj`);
                removerCartasSegundaMano(manoOponente,manoOponente[0]);
                return mostarVisorTexto(`la Web ha jugado, te toca ${jugador}.`);
            }
        }
    }
    let carta1web = parseInt($("#cartaWeb1").attr("value"));
    if(valorCarta1j == carta1web){
        //debe lanzar la mejor carta
        return lanzaCartaWebMasAlta();
    }else{
        if(valorCarta1j > 0){
            ocultarEnvido();
            if(manoOponente[0].valor > valorCarta1j){
                faceRonda1 = "Web";
                jugarCartaOponete(manoOponente[0],`carta1Webj`);
                removerCartas(manoOponente,manoOponente[1],manoOponente[2]);
                lanzaCartaWebMasBaja();
                return mostarVisorTexto(`la Web ha jugado, te toca ${jugador}.`);
            }else if(manoOponente[0].valor == valorCarta1j){
                jugarCartaOponete(manoOponente[0],`carta1Webj`);
                faceRonda1 = "empate";
                removerCartas(manoOponente,manoOponente[1],manoOponente[2]);
                return mostarVisorTexto(`la Web ha jugado, te toca ${jugador}.`);
            }else if(manoOponente[0].valor < valorCarta1j){
                faceRonda1 = "Jugador";
                jugarCartaOponete(manoOponente[0],`carta1Webj`);
                removerCartas(manoOponente,manoOponente[1],manoOponente[2]);
                return mostarVisorTexto(`la Web ha jugado, te toca ${jugador}.`);
            }
        }
    }
}

//compara los valores de las cartas jugadas
//si existe significa que se jugo la ronda y realiza una accion
function compararRondas() {
    let carta3j = parseInt( $("#carta3j div").attr("value"));
    let carta3web = parseInt( $("#cartaWeb3").attr("value"));
    let carta2j = parseInt($("#carta2j div").attr("value"));
    let carta2web = parseInt($("#cartaWeb2").attr("value"));
    let carta1j = parseInt( $("#carta1j div").attr("value"));
    let carta1web = parseInt($("#cartaWeb1").attr("value"));

    if (( carta3j > 0 ) && (carta3web > 0 )) {
        if(carta3j > carta3web){
            faceRonda3 = "Jugador";
            return comparacionDeFaces();
        }else if(carta3j < carta3web){
            faceRonda3 = "Web";
            return comparacionDeFaces();
        }if(carta3j == carta3web){
            if(soyMano){
                faceRonda3 = "Jugador";
                return comparacionDeFaces();
            }else{
                faceRonda3 = "Web";
                return comparacionDeFaces();
            }
        }
    }else if( carta3j > 0 ){
        return lanzaCartaWebParaGanar();
    }else if( carta3web > 0 ){
        //JUEGA EL JUGADOR
        return mostarVisorTexto(`Juegas tu ultima carta ${jugador}`);
    }


    if (( carta2j > 0 ) && (carta2web > 0 )) {
        if(carta2j > carta2web){
            faceRonda2 = "Jugador";
            comparacionDeFaces();
            return mostarVisorTexto(`Juegas tu ${jugador}`);
        }else if(carta2j < carta2web){
            faceRonda2 = "Web";
            mostarVisorTexto(`Juegas la Web ya que gano`);
            comparacionDeFaces();
            return lanzaCartaWebMasBaja();
        }if(carta2j == carta2web){
            faceRonda2 = "empate";
            if(soyMano){
                return mostarVisorTexto(`Juegas tu ${jugador} porque eres mano`);
            }else{
                lanzaCartaWebParaGanar();
                return mostarVisorTexto(`Juegas la Web porque es mano`);
            }
        }
    }else if( carta2j > 0 ){
        return lanzaCartaWebParaGanar();
    }else if( carta2web > 0 ){
        //JUEGA EL JUGADOR
        return mostarVisorTexto(`Juegas segunda ${jugador}`);
    }


    if (( carta1j > 0 ) && (carta1web > 0 )) {
        if(carta1j > carta1web){
            faceRonda1 = "Jugador";
            return mostarVisorTexto(`Juegas tu ${jugador}`);
        }else if(carta1j < carta1web){
            faceRonda1 = "Web";
            mostarVisorTexto(`Juegas la Web ya que gano`);
            return lanzaCartaWebMasBaja();
        }if(carta1j == carta1web){
            faceRonda1 = "empate";
            if(soyMano){
                return mostarVisorTexto(`Juegas tu ${jugador} porque eres mano`);
            }else{
                lanzaCartaWebParaGanar();
                return mostarVisorTexto(`Juego la Web porque es mano`);
            }
        }
    }else if( carta1j > 0 ){
        return lanzaCartaWebParaGanar();
    }

}

function lanzaCartaWebMasBaja() {
    //lanza la carta luego de haber ganado primera
    if(faceRonda2 != ""){
        jugarCartaOponete(manoOponente[0],`carta3Webj`);
        removerCartasTercera(manoOponente);
    }else if(faceRonda1 != ""){
        jugarCartaOponete(manoOponente[0],`carta2Webj`);
        removerCartasSegundaMano(manoOponente,manoOponente[1]);
    }
    return mostarVisorTexto(`la Web ha jugado, te toca ${jugador}.`);
}

function lanzaCartaWebMasAlta() {
    //lanza la carta luego de haber ganado primera
    if(faceRonda1 != ""){
        jugarCartaOponete(manoOponente[0],`carta3Webj`);
        removerCartasTercera(manoOponente);
    }else{
        jugarCartaOponete(manoOponente[1],`carta2Webj`);
        removerCartasSegundaMano(manoOponente,manoOponente[0]);
    }
    return mostarVisorTexto(`la Web ha jugado, te toca ${jugador}.`);
}

function comparacionDeFaces() {
    if((faceRonda1 == faceRonda2 )&&(faceRonda3 = "empate")){
        //la mano gana
        if(soyMano){
            //gana el jugador
            puntajeJugador = parseInt( puntajeJugador ) + parseInt( puntosdelTruco);
            mostarVisorTexto(`Ganaste el truco ${jugador},
            presiona Repartir Cartas para continuar`);
            return terminoMano();
        }else{
            //gana la web
            puntajeWeb = parseInt( puntajeWeb ) + parseInt( puntosdelTruco);
            mostarVisorTexto(`Perdiste la mano,
            presiona Repartir Cartas para continuar`);
            return terminoMano();
        }
    }else if(faceRonda1 == faceRonda3){
        if(faceRonda1 == "Web"){
            //gana la web
            puntajeWeb = parseInt( puntajeWeb ) + parseInt( puntosdelTruco);
            mostarVisorTexto(`Perdiste la mano,
            presiona Repartir Cartas para continuar`);
            return terminoMano();
        }else if(faceRonda1 == "Jugador"){
            //gana el jugador
            puntajeJugador = parseInt( puntajeJugador ) + parseInt( puntosdelTruco);
            mostarVisorTexto(`Ganaste el truco ${jugador},
            presiona Repartir Cartas para continuar`);
            return terminoMano();
        }else if(faceRonda1 == "empate" ){
            //la mano gana
            if(soyMano){
                //gana el jugador
                puntajeJugador = parseInt( puntajeJugador ) + parseInt( puntosdelTruco);
                mostarVisorTexto(`Ganaste el truco ${jugador},
                presiona Repartir Cartas para continuar`);
                return terminoMano();
            }else{
                //gana la web
                puntajeWeb = parseInt( puntajeWeb ) + parseInt( puntosdelTruco);
                mostarVisorTexto(`Perdiste la mano,
                presiona Repartir Cartas para continuar`);
                return terminoMano();
            }
        }
    }else if((faceRonda1 == "empate" ) && (faceRonda2 == "Jugador")){
        //gana el jugador
        puntajeJugador = parseInt( puntajeJugador ) + parseInt( puntosdelTruco);
        mostarVisorTexto(`Ganaste el truco ${jugador},
        presiona Repartir Cartas para continuar`);
        return terminoMano();
    }else if((faceRonda1 == "empate" ) && (faceRonda2 == "Web")){
        //gana la web
        puntajeWeb = parseInt( puntajeWeb ) + parseInt( puntosdelTruco);
        mostarVisorTexto(`Perdiste la mano, 
        presiona Repartir Cartas para continuar`);
        return terminoMano();
    }else if((faceRonda1 == "Jugador" ) && (faceRonda2 == "empate")){
        //gana el jugador
        puntajeJugador = parseInt( puntajeJugador ) + parseInt( puntosdelTruco);
        mostarVisorTexto(`Ganaste el truco ${jugador},
        presiona Repartir Cartas para continuar`);
        return terminoMano();
    }else if((faceRonda1 == "Web" ) && (faceRonda2 == "empate")){
        //gana la web
        puntajeWeb = parseInt( puntajeWeb ) + parseInt( puntosdelTruco);
        mostarVisorTexto(`Perdiste la mano, 
        presiona Repartir Cartas para continuar`);
        return terminoMano();
    }else if(faceRonda2 == faceRonda3){
        if(faceRonda3 == "Web"){
            //gana la web
            puntajeWeb = parseInt( puntajeWeb ) + parseInt( puntosdelTruco);
            mostarVisorTexto(`Perdiste la mano, 
            presiona Repartir Cartas para continuar`);
            return terminoMano();
        }else if(faceRonda3 == "Jugador"){
            //gana el jugador
            puntajeJugador = parseInt( puntajeJugador ) + parseInt( puntosdelTruco);
            mostarVisorTexto(`Ganaste el truco ${jugador}, 
            presiona Repartir Cartas para continuar`);
            return terminoMano();
        }else if(faceRonda3 == "empate"){
            //la mano gana
            if(soyMano){
                //gana el jugador
                puntajeJugador = parseInt( puntajeJugador ) + parseInt( puntosdelTruco);
                mostarVisorTexto(`Ganaste el truco ${jugador}, 
                presiona Repartir Cartas para continuar`);
                return terminoMano();
            }else{
                //gana la web
                puntajeWeb = parseInt( puntajeWeb ) + parseInt( puntosdelTruco);
                mostarVisorTexto(`Perdiste la mano, 
                presiona Repartir Cartas para continuar`);
                return terminoMano();
            }
        }
    }else if(faceRonda1 == faceRonda2){
        if(faceRonda1 == "Web"){
            //gana la web
            puntajeWeb = parseInt( puntajeWeb ) + parseInt( puntosdelTruco);
            mostarVisorTexto(`Perdiste la mano, 
            presiona Repartir Cartas para continuar`);
            return terminoMano();
        }else if(faceRonda1 == "Jugador"){
            //gana el jugador
            puntajeJugador = parseInt( puntajeJugador ) + parseInt( puntosdelTruco);
            mostarVisorTexto(`Ganaste el truco ${jugador},
            presiona Repartir Cartas para continuar`);
            return terminoMano();
        }else if(faceRonda1 == "empate"){
            //se sigue jugando.
            return mostarVisorTexto(`Va parda se define en la ultima`);
        }
    }
}

function limpiarMesa(){
    let contenido="";
    contenido=`<section id="contenedor-mano" class="cartas">
            
    </section>`

$(`#contenedor-mano`).remove();
$(`#mesa`).append(contenido);


$(`#cartaWeb1`).remove();
$(`#cartaWeb2`).remove();
$(`#cartaWeb3`).remove();
$(`#carta1`).remove();
$(`#carta2`).remove();
$(`#carta3`).remove();

faceRonda1 = "";
faceRonda2 = "";
faceRonda3 = "";
jugadorCartasNumero = 0;
contadorTurnoCartaWeb = 1;
puntosdelTruco = 1;

valorCarta1j = 0;
valorCarta2j = 0;
valorCarta3j = 0;

mensajeamostrar ="";
$("#visortexto").val(`${mensajeamostrar}`);

}


// ******/*/*/*/*/********/*/*/*/****** SIN USO AUN  *******/*/*/*/*/*/**********/*/*/* */ */

/* function botontruco() {
    $(`#cantar-retruco`).hide();
    $(`#cantar-vale-4`).hide();
    if( estadoTruco == ""){
        $(`#cantar-truco`).show();
    }else if( estadoTruco == "truco"){
        $(`#cantar-retruco`).show();
    }else if( estadoTruco == "retruco"){
        $(`#cantar-vale-4`).show();
    }
}
function botonenvido() {
    $(`#real-envido`).hide();
    $(`#falta-envido`).hide();
    $(`#envido-envido`).hide();
    if( estadoEnvido == ""){
        $(`#envido`).show();
    }else if( estadoEnvido == "envido"){
        $(`#envido-envido`).show();
        $(`#real-envido`).show();
    }else if( estadoEnvido == "envidoenvido"){
        $(`#real-envido`).show();
        $(`#falta-envido`).show();
    }else if( estadoEnvido == "Realenvido"){
        $(`#falta-envido`).show();
    }
} */
// ******/*/*/*/*/********/*/*/*/****** SIN USO AUN  *******/*/*/*/*/*/**********/*/*/* */ */

function ocultarbotones(){
    $(`#repartir-cartas`).show();
    $(`#cantar-truco`).hide();
    $(`#cantar-retruco`).hide();
    $(`#cantar-vale-4`).hide();
    $(`#envido`).hide();
    $(`#envido-envido`).hide();
    $(`#real-envido`).hide();
    $(`#falta-envido`).hide();
    $(`#limpiar-mesa`).hide();
    $(`#ir-al-mazo`).hide();
}



$(document).ready(function(){


// ACTIVANDO FUNCIONES INTERACTIVAS CON EL JUGADOR
document.getElementById("repartir-cartas").addEventListener("click",repartirCartas);
document.getElementById("envido").addEventListener("click",cantarEnvido);
document.getElementById("ir-al-mazo").addEventListener("click",irAlMazo);
ocultarbotones();

//document.getElementById("cantar-truco").addEventListener("click",trucoTurnos);

});
