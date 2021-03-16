import { useState } from 'react'

const PlantForm = ({form}) => {
    return(
        <form onSubmit={form}>
            <input type="text" name="name" id="" placeholder=""/>
            <select name="profile" id="">
                <option value="1">Government Issued</option>
                <option value="2">Succulents</option>
                <option value="3">Wet Plants</option>
            </select>
            <input type="text" name="date" id=""/>
            <input type="submit" value="Add"/>
        </form>
    )
}

export default PlantForm