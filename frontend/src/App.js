import {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header'
import PlantSummary from './components/PlantSummary'


const App = () => {

  const id = 1
  const [userName, setUserName] = useState('User')
  const [plants, setPlants] = useState([])

  useEffect(() => {
    fetch('/profile/'+id)
    .then(res => res.json())
    .then(data => {
      setUserName(data.user);
    })
  },[])

  useEffect(() => {
    fetch('/plants/'+id)
    .then(res => res.json())
    .then(data => {
      setPlants(data)
      console.log(data)
    })
  }, [])

  return (
    <div className="App">
      <Header name={userName}/>
      {plants.length > 0 ? <PlantSummary plants = {plants}/> : <p>No plants to monitor</p>}
    </div>
    
  );
}

export default App;
