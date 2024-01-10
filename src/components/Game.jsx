import './Game.css';

  const Game = ( {verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, attempts, score} ) => {
    // Depois de passar como props é só ir substituindo
    return (

      <div className="game">
        <h1>Advinhe a Palavra</h1>
        <p className="pontos">
          <span>Pontuação: {score}</span>
        </p>
        <h3 className="dica">
          Dica sobre a palavra <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {attempts} tentativa(s).</p>
         {/* Container da palavra */}
        <div className="wordContainer">
          {letters.map((letra, i) => (
            guessedLetters.includes(letra) ? (
              <span key={i} className="letter">{letra}</span>
            ) : (
              <span key={i} className="blankSquare"></span>
            )
          ))}
        </div>
        {/* Container da letra */}
        <div className="letterContainer">
          <p>Tente advinhar uma letra da palavra</p>
          <form>
            <input type="text" name="letter" maxLength="1" required/>
            <button>Jogar</button>
          </form>
        </div>
        {/* Letras utilizadas */}
        <div className="letrasUtilizadas">
            <p>Letras já utilizadas</p>
            {wrongLetters.map((letra,i) => (
              <span key={i}>{letra},</span>
            ))}
        </div>
      </div>
    )
  }
  
  export default Game;