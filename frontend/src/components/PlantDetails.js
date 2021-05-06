import { useState } from 'react'

const PlantDetails = ({plant, url}) => {

    const btn_labels = ["Auto", "On", "Off"]
    const [waterLabelNumber, setWaterLabelNumber] = useState(plant.water_setting)
    const [waterLabel, setWaterLabel] = useState(btn_labels[parseInt(waterLabelNumber)])
    const [lightLabelNumber, setLightLabelNumber] = useState(plant.light_setting)
    const [lightLabel, setLightLabel] = useState(btn_labels[parseInt(lightLabelNumber)])

    const waterBtn = () => {
        waterLabelNumber === 2 ? setWaterLabelNumber(0) : setWaterLabelNumber(waterLabelNumber + 1)
        fetch(url+'/modifyWater?id='+plant.id+'&water='+waterLabelNumber)
        .then(res => res.json())
        .then(data => {
            if(data.result === "ok"){
                setWaterLabel(btn_labels[parseInt(waterLabelNumber)])
            }
        })
    }

    const lightBtn = () => {
        lightLabelNumber === 2 ? setLightLabelNumber(0) : setLightLabelNumber(lightLabelNumber + 1)
        fetch(url+'/modifyLight?id='+plant.id+'&light='+lightLabelNumber)
        .then(res => res.json())
        .then(data => {
            if(data.result === "ok"){
                setLightLabel(btn_labels[parseInt(lightLabelNumber)])
            }
        })
    }


    return(
        <>
            <div className="plant-water linear">
                <h4>Moisture: {plant.water}</h4>
                <button className="btn auto" onClick={waterBtn}>{waterLabel}</button>
            </div>
            <div className="plant-light linear">
                <h4>Sunlight: {plant.light}</h4>
                <button className="btn auto" onClick={lightBtn}>{lightLabel}</button>
            </div>
            <div className="plant-temp">
                <h4>Temperature: {plant.temperature}</h4>
            </div>
            
        </>
    )
}

export default PlantDetails