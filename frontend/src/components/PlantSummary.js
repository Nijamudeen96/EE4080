import Plant from './Plant'

const PlantSummary = ({plants}) => {


    return(
        <div class="PlantSummary">
            <h1>Plant Summary</h1>
            {plants.map((plant) => (
                <Plant key={plant.id} plant={plant} />
            ))}
        </div>
    )
}

export default PlantSummary