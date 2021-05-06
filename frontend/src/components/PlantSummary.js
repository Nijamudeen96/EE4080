import Plant from './Plant'

const PlantSummary = ({plants, url}) => {


    return(
        <div className="PlantSummary">
            <h1>Plant Summary</h1>
            {plants.map((plant) => (
                <Plant key={plant.id} plant={plant} url={url} />
            ))}
        </div>
    )
}

export default PlantSummary