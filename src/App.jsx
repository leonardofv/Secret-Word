//CSS
import './App.css'
//React
import { useCallback, useEffect, useState } from "react";
//data
import { wordsList } from './data/data';
//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver'

const stages = [ //estágios do jogo
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
];

const attempstsQty = 3;

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name); 
  const [words] = useState(wordsList); //lista de palavras
  const [pickedWord, setPickedWord] = useState(""); //palavra escolhida
  const [pickedCategory, setPickedCategory] = useState(""); //categoria escolhida
  const [letters, setLetters] = useState([]); //lista de letras
  
  const [guessedLetters, setGuessedLetters] = useState([]); //letras advinhadas
  const [wrongLetters, setWrongLetters] = useState([]); // letras erradas
  const [attempts, setAttempts] = useState(attempstsQty); //tentativas
  const [score, setScore] = useState(0);

  
  const pickWordAndCategory = useCallback(() => {
    //pick a random category
    const categories = Object.keys(words); //pegando categoria da lista
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]; //category random
    console.log(category);
    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return { category, word }; //retornar como um objeto
  },[words]);

  //start the secret word game
  const startGame = useCallback(() => { 
    //A função startGame faz com que as depêndencias di gancho do useEffect mudem em cada renderização. Para
    // corrigir envolvemos a definição de startGame em seu próprio useCallback gancho.
    // e coloco como dependência a função que executo no no mesmo.

    //Limpar letras no inicio do jogo, após acertar a palvra. Reseta tudo
    clearLetterStates();

    //pick word and category
    const { category, word } = pickWordAndCategory();
    //create an array of letters
    let wordLetters = word.split(""); //dividindo array

    wordLetters = wordLetters.map((letra) => letra.toLowerCase());//COlocando todas as letras em min, JS caseSensitive.

    console.log(category, word);
    console.log(wordLetters);
    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  },[pickWordAndCategory]);

  //process the letter input
  const verifyLetter = (letter) => {
    // setGameStage(stages[2].name);
    console.log(letter); 
    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been 
    //para o usuário não perder chance com letras já utilizadas
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    //Push guessed letter or remove a chence
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter
      ])
    }else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ])
      //diminuir pontuação ao errar letra
      setAttempts((actualAttempts) => actualAttempts - 1);
    }
  }

  //limpar letras acertadas e erradas após acabar as chances
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  //monitora um dado, como segundo parâmetro o dado para monitorar entre colchetes
  useEffect(() => {
    //check if attempts ended
    if(attempts <= 0) {
      //reset all stages
      clearLetterStates();
      //finaliza o jogo
      setGameStage(stages[2].name);
    }

  },[attempts])

  //check win condition
  useEffect(() => {

    //tranforma as letras acertadas em um arr de letras únicas para o usuário não precisar digitar a mesma letra duas vezes
    const uniqueLetters = [...new Set(letters)];
    console.log(uniqueLetters);

    //win cindition
    if(guessedLetters.length === uniqueLetters.length) {
      //add score
      // setScore((actualScore) => actualScore += 10);
      setScore(score+10);

      //restart the game with new word
      startGame();
    }

  },[guessedLetters, letters, score, startGame]); //monitora as letras advinhadas

  //restart the game
  const retry = () => {
    setScore(0);         // Pontuação e tentativas resetadas quando resetar o jogo
    setAttempts(attempstsQty)
    setGameStage(stages[0].name);
  }
 
  return (

    <div className='App'>
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (
      <Game 
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        attempts={attempts}
        score={score}        
        />)}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  )
}

export default App
