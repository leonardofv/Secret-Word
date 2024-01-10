import './StartScreen.css'

const StartScreen = ( {startGame} ) => {
  return (
    <div className='start'>
        <h1>Secret Word</h1>
        <p>CLique no botão abaixo para começar</p>
        <button onClick={startGame}>Jogar</button>
    </div>
  )
}

export default StartScreen;