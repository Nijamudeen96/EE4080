import { useState } from 'react';
import PlantDetails from './PlantDetails'

const Plant = ({plant}) => {

    const [details, setDetails] = useState(false)
    const profile_label = ["Government", "Wet Plant", "Succulents"]
    const [currentProfile, setProfile] = useState(parseInt(plant.profile))
    const [label, setLabel] = useState(profile_label[parseInt(currentProfile)-1])

    const profileBtn = () => {
        currentProfile === 3 ? setProfile(1) : setProfile(currentProfile + 1)
        fetch('/modifyProfile?id='+plant.id+'&profile='+currentProfile)
        .then(res => res.json())
        .then(data => {
            if(data.result === "ok"){
                setLabel(profile_label[parseInt(currentProfile)-1])
            }
        })
    }

    return(
        <div className="Plant">
            <div className="plant-name linear">
                <h2 onClick={()=>setDetails(!details)}>{plant.name}</h2>
                {details ? <button className="btn" onClick={profileBtn}>{label}</button> : <></>}
            </div>
            {details ? <PlantDetails plant={plant} /> : <></>}
        </div>
    )
}

export default Plant