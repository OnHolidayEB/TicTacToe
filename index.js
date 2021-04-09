const Player = (name, mark) =>{
    let _score = 0;

    const getScore = () =>{
        return _score
    }

    return{
        name, mark, getScore
    }
}

const Gameboard = (() => {
    
    const _gameBoardArray = ['', '', '', '', '','', '', '', ''];
    const _gameboardDOM = document.querySelectorAll('.boardSquare')

    const getGameboardArray = () => {
        return _gameBoardArray;
    };

    const getGameboardDOM = () => {
        return _gameboardDOM;
    };

    const init = () => {
        _gameBoardArray.forEach((item, index)=>{_gameBoardArray[index] = ''})
        
    }

    return{
        getGameboardArray, getGameboardDOM, init,
    };

})();

const DisplayController = (() => {
    const gameboardDOM = Gameboard.getGameboardDOM();
    const turnDisplay = document.getElementById('turnDisplay');
    turnDisplay.innerHTML = `Player One's Turn`
    const resetBtn = document.getElementById('reset');

    const init = () => {
        Gameboard.init();
        GameController.init();
        pushCurrentPlayer();
        pushArray();
        resetBtn.innerHTML = "Reset";
    };

    const pushArray = () => {
        const gameBoardArray = Gameboard.getGameboardArray();
        for (let i = 0; i < gameBoardArray.length; i++) 
        gameboardDOM[i].innerHTML = gameBoardArray[i];  
    };

    const pushCurrentPlayer = () => {
        turnDisplay.innerHTML = `${GameController.getCurrentPlayer().name}'s Turn`;
    }
    
    const pushWinner = () => {
        turnDisplay.innerHTML = `${GameController.getWinner().name} Won!`;
        resetBtn.innerHTML = "Play Again?";
    }

    resetBtn.addEventListener('click', init);

    return{
        pushArray, pushCurrentPlayer, init, pushWinner
    }
    

})();


const GameController = (() => {
    const _playerOne = Player('Player One', 'X');
    const _playerTwo = Player('Player Two', 'O');
    let _currentPlayer = _playerOne;
    const gameBoardArray = Gameboard.getGameboardArray();

    let _playerWon = false;
    let _winningPlayer;

    const getCurrentPlayer = () => {
        return _currentPlayer;
    }
    
    const getPlayerWon = () => {
        return _playerWon;
    }

    const getWinner = () =>{
        return _winningPlayer;
    }

    const init = () => {
        _currentPlayer = _playerOne;
        _playerWon = false;
    }
    const checkWinner = () => { 
    
        const _arrayWinners =
        [[0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]];

        _arrayWinners.forEach(obj => {
            if (gameBoardArray[obj[0]] == _currentPlayer.mark && 
                gameBoardArray[obj[1]] == _currentPlayer.mark && 
                gameBoardArray[obj[2]] == _currentPlayer.mark){
                _winningPlayer = _currentPlayer;
                _playerWon = true;
                return;
            }
            
        })
    }

    const playerTurn = Gameboard.getGameboardDOM().forEach(square => square.addEventListener('click', () => { 


            if (gameBoardArray[square.id] != '' || getPlayerWon()) {
                return;
            }

           

            else{
                gameBoardArray[square.id] = GameController.getCurrentPlayer().mark;  
                DisplayController.pushArray();
                checkWinner();

                if (getPlayerWon()) {
                    DisplayController.pushWinner();
                    return;
                    
                }

                if (getCurrentPlayer().name === _playerOne.name) {
                _currentPlayer = _playerTwo;
                }
                else {_currentPlayer = _playerOne}
                DisplayController.pushCurrentPlayer();

            }
        
    })
    );


    
    
    
    
    return{
        getCurrentPlayer, init, getWinner
    }

})();


