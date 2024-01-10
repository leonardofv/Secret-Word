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

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name); 
  const [words] = useState(wordsList); //lista de palavras
  const [pickedWord, setPickedWord] = useState(""); //palavra escolhida
  const [pickedCategory, setPickedCategory] = useState(""); //categoria escolhida
  const [letters, setLetters] = useState([]); //lista de letras
  
  const [guessedLetters, setGuessedLetters] = useState([]); //letras advinhadas
  const [wrongLetters, setWrongLetters] = useState([]); // letras erradas
  const [attempts, setAtempts] = useState(3); //tentativas
  const [score, setScore] = useState(0);

  
  const pickWordAndCategory = () => {
    //pick a random category
    const categories = Object.keys(words); //pegando categoria da lista
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]; //category random
    console.log(category);
    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    console.log(word);

    return { category, word }; //retornar como um objeto
  }

  //start the secret word game
  const startGame = () => {
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
  };
  //process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }
  //restart the game
  const retry = () => {
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
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  )
}

export default App
