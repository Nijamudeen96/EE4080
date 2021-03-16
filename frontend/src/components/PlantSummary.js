import { useState } from 'react'
import Plant from './Plant'
import PlantForm from './PlantForm'

const PlantSummary = ({plants, form}) => {

    const [showForm, setShowForm] = useState(false)

    return(
        <div>
            <h1>Plant Summary</h1>
            <button onClick={()=>setShowForm(!showForm)}>Add Plant</button>
            {showForm ? <PlantForm form={form} /> : <></>}
            {plants.map((plant) => (
                <Plant key={plant.id} plant={plant} />
            ))}
        </div>
    )
}

export default PlantSummary