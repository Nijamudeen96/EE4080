import {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [currentID, setID] = useState(0);

  useEffect(() => {
    fetch('/profile/3')
    .then(res => res.json())
    .then(data => {
      setID(data.id);
    })
  })

  return (
    <div className="App">
      <h1>The square of the id is {currentID}</h1>
    </div>
  );
}

export default App;
