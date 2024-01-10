import './Game.css';

  const Game = ( {verifyLetter} ) => {
    return (
      <div className="game">
         <h1>Advinhe a Palavra</h1>
        <p className="pontos">
          <span>Pontuação: 00</span>
        </p>
        <h3 className="dica">
          Dica sobre a palavra <span>Dica...</span>
        </h3>
        <div className="wordContainer">
          <span className="letter">A</span>
          <span className="blankSquare"></span>
        </div>
        <div className="letterContainer">
          <p>Tente advinhar uma letra da palavra</p>
          <form>
            <input type="text" name="letter" maxLength="1" required/>
            <button>Jogar</button>
          </form>
        </div>
        <div className="letrasUtilizadas">
            <p>Letras já utilizadas</p>
            <span>a, </span>
            <span>b, </span>
        </div>
      </div>
    )
  }
  
  export default Game;