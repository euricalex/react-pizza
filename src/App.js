import { useState } from "react";


function App({title}) {
  return <Greeting title = 'Hello World'/>
    
}
export function Greeting({title}) {
  const[word, setWord] = useState(title);
  function handleClick() {
    if(word === 'Hello World') {
      setWord('Пошел нахуй!')
    } else {
      setWord('Hello World')
    }
  }

  return <h1 onClick={handleClick}>{word}</h1>
}
export default App;
