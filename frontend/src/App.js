import {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header'
import PlantSummary from './components/PlantSummary'


const App = () => {

  const [currentID, setID] = useState(0)
  const [userName, setUserName] = useState('User')
  const [plants, setPlants] = useState([
    {
      id:1,
      name:"plant 1",
      profile:"Government Issued",
      water: "16 Mar 2021",
      light: "4",
      temperature: "27.1",
      humidity: "40"
    },
    {
      id:2,
      name:"plant 2",
      profile:"Succulent",
      water: "15 Mar 2021",
      light: "5",
      temperature: "27.6",
      humidity: "38"
    }
  ])

  useEffect(() => {
    fetch('/profile/3')
    .then(res => res.json())
    .then(data => {
      setID(data.id);
    })
  },[])

  useEffect(() => {
    setUserName('Nijamudeen')
  },[])

  const form = (e) => {
    e.preventDefault()
    console.log("form submitted")
    setPlants([...plants, {
      id:plants.length + 1,
      name:"plant " + String(plants.length + 1),
      profile:"Wet Plant",
      water: "15 Mar 2021",
      light: "5",
      temperature: "27.6",
      humidity: "38"
    }])
  }

  return (
    <div className="App">
      <Header name={userName}/>
      {plants.length > 0 ? <PlantSummary plants = {plants} form={form} /> : <p>No plants to monitor</p>}
    </div>
    
  );
}

export default App;
