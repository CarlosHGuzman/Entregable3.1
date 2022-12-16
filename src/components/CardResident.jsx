import { useEffect, useState } from 'react'
import axios from 'axios'

const CarResident = ({urlResident}) => {
    const [resident, setResident] = useState()
  
    useEffect(() => {
        const URL = `${urlResident}`
        axios.get(URL)
          .then(({data}) => setResident(data))
          .catch(error => console.log(error))
    }, [])
    return (
        <div className="resident">
            <div className="resident-status">
                <img className="img-resident" src={resident?.image}></img>
                <div className="status">
                    <div className="status-figure" style={resident?.status =="Alive"? {backgroundColor:"green"}: resident?.status =="Dead"?{backgroundColor:"red"}:{backgroundColor:"gray"}}></div>
                    <p>{resident?.status}</p>
                </div>
            </div>
            <div className="about-resident">
                <h3>{resident?.name}</h3>
                <hr></hr>
                <ul>
                    <li><span>Raza</span> <p>{resident?.species}</p></li>
                    <li><span>Provenience</span> <p>{resident?.origin.name}</p></li>
                    <li><span>Appearance in episode</span> <p>{resident?.episode.length}</p></li>
                </ul>
            </div>
        </div>
    )
}

export default CarResident