import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import LoadingIndicator from "../components/loading-indicator";
import { CharacterModel, CharacterProps } from "../definitions/character";
import Button from "../components/button";
import { useParams } from "react-router";
import axios from "axios";

// STYLED CHARACTER COMPONENT
const StyledCharacter = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  width: 100%;
  transition: all 0.3s ease-in-out;

  figure {
    width: 440px;

    img {
      border-radius: 16px;
      box-shadow: 0 2px 8px 0 rgba(5, 69, 83, 0.12), 0 4px 24px 0 rgba(5, 69, 83, 0.12);
      width: 100%;
      height: 528px;
      object-fit: cover;
    }
  }

  article {
    flex: 1;
    text-align: left;

    h3 {
      margin-bottom: 32px;
    }

    h4 {
      margin-bottom: 8px;
      font-size: 18px;
      font-weight: bold;
      line-height: 24px;
    }

    ul {
      margin-bottom: 48px;
      list-style: disc;
      padding-left: 24px;
      line-height: 24px;

      li {
        line-height: 24px;
      }
    }

    p {
      margin-bottom: 24px;
      font-size: 12px;
      font-weight: normal;
      line-height: 16px;
    }
  }
`;


/**
 * Renders List with title header
 */
const RenderList: FC<{ title: string, data?: string[] }> = ({ title, data = [] }) => {
  if (!data.length) {
    return
  }
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {data.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  )
}
/* 
* CHARACTER PAGE COMPONENT
*
* description: Character page component that displays character details
* @returns {JSX.Element}
*/
const Character = () => {
    const [characterDetails, setCharacterDetails] = useState<CharacterProps | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams()

    useEffect(() => {
      const getCharacter = async (id: string) => {
        setLoading(true)
        const response = await axios({
          method: 'get',
          url: `https://api.disneyapi.dev/character/${id}`
        })
        console.log('response: ', response.data)
        const { data } = response.data as CharacterModel
      setCharacterDetails(data as CharacterProps)
      }
      if (id?.length) {
        getCharacter(id)
      }
      setLoading(false)
    }, [id])

    
    let content = null;
    
    // IF LOADING, SHOW LOADING SPINNER
    if (loading) {
      return <LoadingIndicator />;
    }

    // SET CONTENT BASED ON LOADING STATE
    if (characterDetails && !loading) {
      content = (
        <StyledCharacter>
          <figure>
            <img src={characterDetails?.imageUrl} alt={characterDetails?.name} />
          </figure>

          <article>
            <h3>{characterDetails?.name}</h3>
            <p>Last Updated: {characterDetails?.updatedAt}</p>
            <RenderList title='Featured Films' data={characterDetails.films} />
            <RenderList title='Short Films' data={characterDetails.shortFilms} />
            <RenderList title='TV Shows' data={characterDetails.tvShows} />

            <Button href={characterDetails?.sourceUrl} label="Explore More Character Details" />
          </article>
        </StyledCharacter>
      )
    }

    return content;
}

export default Character;