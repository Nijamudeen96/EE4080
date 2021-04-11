import Plant from './Plant'

const PlantTester = () => {

    const plants = [
        {
        "id":"1",
        "name":"Kailan",
        "profile":"Government Issued",
        "water": "75%",
        "light": "4hr",
        "temperature": "27.1",
        "humidity": "40"
        },
        {
        "id":"2",
        "name":"Cactus",
        "profile":"Succulent",
        "water": "30%",
        "light": "5hr",
        "temperature": "27.6",
        "humidity": "38"
        },
        {
        "id":"3",
        "name":"qwertyuiopqwertyuiopqweqwertyuiopqwertyuiopqweqwertyuiopqwertyuiopqweqwertyuiopqwertyuiopqwe",
        "profile":"Succulent",
        "water": "45%",
        "light": "5hr",
        "temperature": "27.6",
        "humidity": "38"
        }
    ]
    //id 1 & 2 are normal, 3 has a longer 
    //than acceptable name.

    return(
        <div className="PlantTester">
            {plants.map((plant) => (
                <Plant key={plant.id} plant={plant} />
            ))}
        </div>
    )
}

export default PlantTester