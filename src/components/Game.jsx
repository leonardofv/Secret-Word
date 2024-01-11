import { useState, useRef } from 'react';
import './Game.css';

  const Game = ( {verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, attempts, score} ) => {
    // Depois de passar como props é só ir substituindo

    const [letter, setLetter] = useState("");
    // Use ref faz referência a algo
    const letterInputRef = useRef(null); //após colocar o atributo ref no input, partimos para o handleSubmit para dar foco

    const handleSubmit = (event) => {
      event.preventDefault();
      verifyLetter(letter);
      setLetter(""); {/* apagar input */}
      letterInputRef.current.focus();
    }

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
          <form onSubmit={handleSubmit}>
            <input type="text" name="letter" maxLength="1" required onChange={(event) => setLetter(event.target.value)} value={letter} ref={letterInputRef}/>
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