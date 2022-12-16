const LocationInfo = ({location}) => {
    return (
        <article>
            <ul>
                <li>Name: <p>{location?.name}</p></li>
                <li>Type: <p>{location?.type}</p></li>
                <li>Dimension: <p>{location?.dimension}</p></li>
                <li>Population: <p>{location?.residents.length}</p></li>
            </ul>
        </article>
    )
}

export default LocationInfo