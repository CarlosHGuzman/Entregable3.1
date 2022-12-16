import { useEffect, useState } from 'react'
import axios from 'axios'

const RESIDENT_PAGE = 10

const useApiRm = (handleSubmit) => {
    const [location, setLocation] = useState()
    const [dimensionSearch, setDimensionSearch] = useState()
    const [suggestions, setSuggestions] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState()
    const [residentsPage, setResidentsPage] = useState()
  
    const getAllPages = () => {
      const arrayPages = []
      for(let i = 1; i <= lastPage; i++){
        arrayPages.push(i)
      }
      return arrayPages
    }
    
    const randomLocation = () => {
      const indexRandom = Math.floor(Math.random() * 125  + 1)
      return indexRandom
    }
  
    const newDimensionSearch = () => {
      if(!dimensionSearch) return
      if(!isNaN(dimensionSearch)){
        const URL = `https://rickandmortyapi.com/api/location/${dimensionSearch}`
        axios.get(URL)
        .then(({data}) => setLocation(data))
        .catch(error => console.log(error))
      }else{
        axios.get(suggestions[0]?.url)
          .then(({data}) => setLocation(data))
          .catch(error => console.log(error))
      }
    }
  
    const handleSubmit = (event) =>{
      event.preventDefault()
      setDimensionSearch(event.target.Id.value)
    }
  
    const dimensionSuggestion = (textSuggestion) => {
      const URL = `https://rickandmortyapi.com/api/location/?name=${textSuggestion}`
      axios.get(URL)
        .then(({data: {results}}) => setSuggestions(results))
        .catch(error => console.log(error))
    }
  
    const handleSuggestion = (event) =>{
      dimensionSuggestion(event.target.value)
    }
  
    useEffect(() => {
      newDimensionSearch()
    }, [dimensionSearch])
  
    useEffect( ()=> {
      const quantityResidents = location?.residents.length
      const navPages = Math.ceil(quantityResidents / RESIDENT_PAGE)
      setLastPage(navPages)
    },[location])
    
  
    useEffect(() => {
        const URL = `https://rickandmortyapi.com/api/location/${randomLocation()}`
        axios.get(URL)
          .then(({data}) => {setTimeout(() => setLocation(data), 1300)})
          .catch(error => console.log(error))
    }, [])
  
    useEffect(() => {
      const lastResidentPage = currentPage * RESIDENT_PAGE
      const firstResindetPage = lastResidentPage - RESIDENT_PAGE
      const newResidentFilter = location?.residents.slice(firstResindetPage, lastResidentPage)
      setResidentsPage(newResidentFilter)
    }, [location, currentPage])

    return [location, suggestions, currentPage, residentsPage, handleSubmit, handleSuggestion]
}

export default useApiRm