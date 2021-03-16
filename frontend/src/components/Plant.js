import {useState, useEffect} from 'react';
import PlantDetails from './PlantDetails'

const Plant = ({plant}) => {

    const [details, setDetails] = useState(false)



    return(
        <div>
            <h3 onClick={()=>setDetails(!details)}>{plant.name}</h3>
            {details ? <PlantDetails plant={plant} /> : <></>}
        </div>
    )
}

export default Plant