import { useState } from 'react'

const PlantDetails = ({plant}) => {

    const clicker = () => {
        console.log("clicked")
    }

    return(
        <>
            <h4>Last Watered: {plant.water}</h4>
            <h4>Sunlight: {plant.light}</h4>
            <h4>Temperature: {plant.temperature}</h4>
            <h4>Humidity: {plant.humidity}</h4>
            <button onClick={clicker}>Water Plant</button>
            <button onClick={clicker}>Grow Light</button>
            <button onClick={clicker}>Change Profile</button>
            <button onClick={clicker}>Delete</button>
        </>
    )
}

export default PlantDetails