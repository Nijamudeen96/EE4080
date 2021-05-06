import {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header'
import PlantSummary from './components/PlantSummary'


const App = () => {

  const URL_PREFIX = 'http://192.168.0.131:5000'
  const id = 1
  const [userName, setUserName] = useState('User')
  const [plants, setPlants] = useState([])

  useEffect(() => {
    fetch(URL_PREFIX+'/profile/'+id)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setUserName(data.user);
    })
  },[])

  useEffect(() => {
    fetch(URL_PREFIX+'/plants/'+id)
    .then(res => res.json())
    .then(data => {
      setPlants(data)
      console.log(data)
    })
  }, [])

  return (
    <div className="App">
      <Header name={userName}/>
      {plants.length > 0 ? <PlantSummary plants = {plants} url={URL_PREFIX}/> : <p>No plants to monitor</p>}
    </div>
    
  );
}

export default App;
