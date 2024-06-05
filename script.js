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
             alert('lo cambie a false')
        }else{
            turno=true;
            alert('lo cambie a true')
        }
    }
    const getTurno = () => turno;
    const getContador = () => ContadorDeJuego;
    const aumentarContador = () => ContadorDeJuego++;
    const {getFila1,getFila2,getFila3,getColumna1,getColumna2,getColumna3,getDiagonal1,getDiagonal2,write}=CreateGameboard();
    return {turno,ContadorDeJuego,CambiarTurno,aumentarContador,getFila1,getFila2,getFila3,getColumna1,getColumna2,getColumna3,getDiagonal1,getDiagonal2,
        write,getTurno,getContador};
}

function play(){
    const player1 = CreatePlayer('player1','x');
    const player2 = CreatePlayer('player2','o');
    const controlador = CreatePlayController();
    let ganador = '';


    
    do{
        console.log(`${controlador.getFila1()}\n${controlador.getFila2()}\n${controlador.getFila3()}`);
        let casilla = Number(prompt('elija donde jugar'));
        console.log({contador:controlador.getContador()});
        if(controlador.getTurno()){
            if(controlador.write(player1.dato,casilla)){
                if(controlador.getColumna1() == 'xxx' || controlador.getColumna2() == 'xxx' || controlador.getColumna3() == 'xxx' || 
                controlador.getDiagonal1() == 'xxx' || controlador.getDiagonal2() == 'xxx' || controlador.getFila1() == 'xxx' || 
                controlador.getFila2() == 'xxx' || controlador.getFila3() == 'xxx'){
                    ganador = 'player1';
                    break;
                }
                controlador.aumentarContador();
                controlador.CambiarTurno();
                console.log({turno : controlador.getTurno});
            }else{
                alert('No puede jugar en un lugar ya tomado');
            }
        }else{
            if(controlador.write(player2.dato,casilla)){
                if(controlador.getColumna1() == 'ooo' || controlador.getColumna2() == 'ooo' || controlador.getColumna3() == 'ooo' || 
                controlador.getDiagonal1() == 'ooo' || controlador.getDiagonal2() == 'ooo' || controlador.getFila1() == 'ooo' || 
                controlador.getFila2() == 'ooo' || controlador.getFila3() == 'ooo'){
                    ganador = 'player2';
                    break;
                }
                controlador.aumentarContador();
                controlador.CambiarTurno();
                console.log({turno : controlador.getTurno()});
            }else{
                alert('No puede jugar en un lugar ya tomado');
            }
        }
    }while(controlador.getContador()<9);

    console.log(`${controlador.getFila1()}\n${controlador.getFila2()}\n${controlador.getFila3()}`);
    switch(ganador){
        case 'player1': console.log(`Ganador: ${player1.name}`);
                        break;
        case 'player2': console.log(`Ganador: ${player2.name}`);
                        break;
        case '': console.log('Empate');
    }
}

play();