import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "../components/card";
import { CharacterModel, CharacterProps } from "../definitions/character";
import LoadingIndicator from "../components/loading-indicator";
import styled from "styled-components";


const StyledResults = styled.div`
  .results {
    display: flex;
    column-gap: 15px;
  }
`
/* 
* RESULTS PAGE COMPONENT
*
* description: Results page component that displays search results
* @returns {JSX.Element}
*/
const Results = () => {
  const { query } = useParams()
  const [loading, setLoading] = useState(false)
  // State for search results based on query
  const [searchResults, setSearchResults] = useState<CharacterProps[]>([])

  useEffect(() => {
    // Search by character name.
    // Once results are found, set the searchResults state
    const getCharacterByName = async (q: string) => {
      setLoading(true)
      const response = await axios({
        method: 'get',
        url: `https://api.disneyapi.dev/character?name=${q}`
      })
      console.log('response: ', response.data)
      const characters: CharacterModel = response.data
      if (characters.info.count > 0) {
        setSearchResults(characters.data as CharacterProps[])
      } else {
        setSearchResults([])
      }
    }
    if (query?.length) {
      getCharacterByName(query)
    }
    setLoading(false)
  }, [query])

  if (loading) {
    return (
      <LoadingIndicator />
    )
  }

  return (
    <StyledResults>
      <h3>Search Results - {query}</h3>
      <div className='results'>
      {searchResults.length ? 
        searchResults.map((character: CharacterProps) => {
          return <Card key={character._id} character={character} />
        })
      : <h3>No Results are found</h3>}
      </div>
    </StyledResults>
  )
}

export default Results;