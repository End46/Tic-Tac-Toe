function CreatePlayer(nombre,data){
    const name=nombre;
    const dato=data;
    return {name,dato};
}

function CreateGameboard(){
    let gameboard=["0","1","2","3","4","5","6","7","8"];
    const getFila1=()=>{
        return gameboard[0]+gameboard[1]+gameboard[2];
    }
    const getFila2=()=>{
        return gameboard[3]+gameboard[4]+gameboard[5];
    }
    const getFila3=()=>{
        return gameboard[6]+gameboard[7]+gameboard[8];
    }
    const getColumna1=()=>{
        return gameboard[0]+gameboard[3]+gameboard[6];
    }
    const getColumna2=()=>{
        return gameboard[1]+gameboard[4]+gameboard[7];
    }
    const getColumna3=()=>{
        return gameboard[2]+gameboard[5]+gameboard[8];
    }
    const getDiagonal1=()=>{
        return gameboard[0]+gameboard[4]+gameboard[8];
    }
    const getDiagonal2=()=>{
        return gameboard[6]+gameboard[4]+gameboard[2];
    }
    const write = (dato,posicion) => {
        if(gameboard[posicion] != 'x' && gameboard[posicion] != 'o'){
            gameboard[posicion] = dato;
            return true;
        }else{
            return false;
        }
    }

    return {gameboard,getFila1,getFila2,getFila3,getColumna1,getColumna2,getColumna3,getDiagonal1,getDiagonal2,write};
}

function CreatePlayController(){
    let turno = true;
    let ContadorDeJuego = 0;/*Esta variable cuenta hasta los 9 turnos posibles para ver si el juego ya debe haber terminado*/
    const CambiarTurno = () =>{
        if(turno){
             turno=false;
        }else{
            turno=true;
        }
    }
    const getTurno = () => turno;
    const getContador = () => ContadorDeJuego;
    const aumentarContador = () => ContadorDeJuego++;
    const {getFila1,getFila2,getFila3,getColumna1,getColumna2,getColumna3,getDiagonal1,getDiagonal2,write}=CreateGameboard();
    return {turno,ContadorDeJuego,CambiarTurno,aumentarContador,getFila1,getFila2,getFila3,getColumna1,getColumna2,getColumna3,getDiagonal1,getDiagonal2,
        write,getTurno,getContador};
}

function CreateDomController(){
    let casillas = []
    const contenedor = document.querySelector("#contenedor");
    const boton_inicio = document.querySelector("#iniciar");
    const jugador1 = document.querySelector("#nombre_jugador_1");
    const jugador2 = document.querySelector("#nombre_jugador_2");
    const dialogoInicio = document.querySelector("#nombres");
    const dialogoFinal = document.querySelector("#ganador");
    const nombreGanador = document.querySelector("#mensaje_ganador");
    const crearTablero = () =>{
        
        contenedor.classList.add('contenedor');
        for(i=0;i<9;i++){
            casillas[i] = document.createElement('div');
            casillas[i].setAttribute('id',i);
            contenedor.appendChild(casillas[i]);
        }
        casillas[9] = document.createElement('h1');
        casillas[10] = document.createElement('button');

        casillas[10].textContent = 'reiniciar';

        contenedor.appendChild(casillas[9]);/*para poner mensaje de quien le toca*/
        contenedor.appendChild(casillas[10]);/*boton de reiniciar con*/
    }
    return {casillas,contenedor,crearTablero,boton_inicio,jugador1,jugador2,dialogoInicio,dialogoFinal,nombreGanador};
}

function main(){
    const dom = CreateDomController();
    dom.boton_inicio.addEventListener('click',(event) => {
        event.preventDefault();
        if(dom.jugador1.value == '' || dom.jugador2.value == ''){
            alert('Por favor introduzca el nombre de los jugadores');
        }else{
            dom.dialogoInicio.close();
            play(dom);
        }
    })
}


function play(dom){
    dom.crearTablero();
    const player1 = CreatePlayer(dom.jugador1.value,'x');
    const player2 = CreatePlayer(dom.jugador2.value,'o');
    const controlador = CreatePlayController();
    
    let ganador = '';
    
    dom.casillas[9].textContent=`Turno de: ${player1.name}`;

    for(i=0;i<9;i++){
        dom.casillas[i].addEventListener('click',(event)=>{
            if(controlador.getTurno()){
                if(controlador.write(player1.dato,event.target.id)){
                    event.target.textContent = player1.dato;
                    dom.casillas[9].textContent=`Turno de: ${player2.name}`
                    if(controlador.getColumna1() == 'xxx' || controlador.getColumna2() == 'xxx' || controlador.getColumna3() == 'xxx' || 
                    controlador.getDiagonal1() == 'xxx' || controlador.getDiagonal2() == 'xxx' || controlador.getFila1() == 'xxx' || 
                    controlador.getFila2() == 'xxx' || controlador.getFila3() == 'xxx'){
                        ganador='player1';
                        dom.nombreGanador.textContent = `El ganador es: ${player1.name}`
                        dom.dialogoFinal.appendChild(dom.casillas[10]);/*boton de reiniciar*/
                        dom.dialogoFinal.classList.add('ganador');
                        dom.dialogoFinal.showModal();
                    }
                    controlador.aumentarContador();
                    controlador.CambiarTurno();
                }else{
                    alert('No puede jugar en un lugar ya tomado');
                }
            }else{
                if(controlador.write(player2.dato,event.target.id)){
                    event.target.textContent = player2.dato;
                    dom.casillas[9].textContent=`Turno de: ${player1.name}`
                    if(controlador.getColumna1() == 'ooo' || controlador.getColumna2() == 'ooo' || controlador.getColumna3() == 'ooo' || 
                    controlador.getDiagonal1() == 'ooo' || controlador.getDiagonal2() == 'ooo' || controlador.getFila1() == 'ooo' || 
                    controlador.getFila2() == 'ooo' || controlador.getFila3() == 'ooo'){
                        ganador='player2';
                        dom.nombreGanador.textContent = `El ganador es: ${player2.name}`
                        dom.dialogoFinal.appendChild(dom.casillas[10]);/*boton de reiniciar*/
                        dom.dialogoFinal.classList.add('ganador');
                        dom.dialogoFinal.showModal();
                    }
                    controlador.aumentarContador();
                    controlador.CambiarTurno();
                }else{
                    alert('No puede jugar en un lugar ya tomado');
                }
            }
            console.log({contador:controlador.getContador()})
            if(controlador.getContador()==9){
                dom.nombreGanador.textContent = 'Empate'
                dom.dialogoFinal.appendChild(dom.casillas[10]);/*boton de reiniciar*/
                dom.dialogoFinal.classList.add('ganador');
                dom.dialogoFinal.showModal();
            }dom.dialogoFinal.appendChild(dom.casillas[10]);/*boton de reiniciar*/
            dom.dialogoFinal.classList.add('ganador');
            dom.dialogoFinal.showModal();
        
    })
    }
}

main();