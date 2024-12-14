/* 
* PROFILE PAGE COMPONENT
*
* description: Profile page component that displays user profile information and allows for editing
* @returns {JSX.Element}
*/
import { FC, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { FieldValues, useForm } from "react-hook-form"
import Button from '../../components/button'
import styled from "styled-components"
import theme from '../../constants/theme'
import { ProfileModel } from '../../definitions/profle'
import { RenderFormField } from '../../components/FormField'


// Styled Profile data - Read only
const StyledProfileData = styled.div`
  color: ${theme.text};
  text-align: left;
  .profile-details {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  .h2 {
    font-size: 48px;
    margin-bottom: 15px;
  }
  .caption {
    font-size: 12px;
    color: ${theme.textSecondary};
  }

  .body 1 {
    font-size: 24px;
    font-weight: bold;
  }

  button {
    margin-top: 30px;
  }
  
`
// Styled row with gap 30px
const StyledRow = styled.div`
  display: flex;
  column-gap: 30px;
`

/**
 * 
 * Renders Profile in read only mode
 * @returns {JSX.Element}
 */
const RenderProfileData: FC = () => {
  const [profileData, setProfileData] = useState<ProfileModel>({
    birthdate: '',
    firstName: '',
    lastName: '',
  })
  const [age, setAge] = useState(1)

  useEffect(() => {
    const cachedProfileData = Cookies.get('profileData')
    if (cachedProfileData) {
      const profileObject = JSON.parse(cachedProfileData) as ProfileModel
      setProfileData(profileObject)
      if (profileObject.birthdate.length === 10) {
        const birthYear = profileObject.birthdate.split('-')?.[0] as unknown as number
        setAge(new Date().getFullYear() - birthYear)
      }
    }
  }, [])

  return (
    <div>
      <div className='profile-header'>
        <p className='h2'>{profileData.firstName} {profileData.lastName}</p>
        <p className='caption'>Last Updated {profileData.lastUpdatedDate}</p>
      </div>
      <div className='profile-details'>
        <p className='body1'>Age: {age}</p>
        <p className='body1'>Location: {profileData.city}, {profileData.state}</p>
        <p className='body1'>Favorite Character: {profileData?.favChar ?? 'None'}</p>
        <p className='body1'>Favorite Ride: {profileData?.favRide ?? 'None'}</p>
        <p className='body1'>Favorite Movie: {profileData?.favMovie ?? 'None'}</p>
        <p className='body1'>Favorite Disney Theme Park: {profileData?.favPark ?? 'None'}</p>
      </div>
    </div>
  )
}

/**
 * Renders Profile Component
 * Provides toggle between read and edit
 * @returns {JSX.Element}
 */
const Profile = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const [toggleEditMode, setToggleEditMode] = useState(false)

  // Gets profile data from cookie and sets form field values
  useEffect(() => {
    const cachedProfileData = Cookies.get('profileData')
    if (cachedProfileData) {
      const profileObject = JSON.parse(cachedProfileData) as ProfileModel
      Object.keys(profileObject).forEach(fieldName => {
        setValue(fieldName, profileObject[fieldName as keyof ProfileModel])
      })
    } else {
      setToggleEditMode(true)
    }
  }, [setValue])


  const onFormSubmit = (data: FieldValues) => {
    // Stores profile data in cookie
    Cookies.set('profileData', JSON.stringify({...data, lastUpdatedDate: new Date().toDateString()}))
    setToggleEditMode(false)
  }
  const handleSubmitClick = () => {
    handleSubmit(onFormSubmit)
  }

  return (
    toggleEditMode ? <form onSubmit={handleSubmit(onFormSubmit)}>
      <StyledRow>
        <RenderFormField
          fieldName='firstName'
          label='First Name'
          register={register}
          required
          errors={errors}
        />

        <RenderFormField
          fieldName='lastName'
          label='Last Name'
          register={register}
          required
          errors={errors}
        />
      </StyledRow>
      <RenderFormField
        fieldName='birthdate'
        label='Birthdate'
        register={register}
        required
        type='date'
        errors={errors}
      />
      <StyledRow>
        <RenderFormField
          fieldName='city'
          label='City'
          register={register}
          errors={errors}
        />

        <RenderFormField
          fieldName='state'
          label='State'
          register={register}
          errors={errors}
          options={['New Jersey', 'California']}
        />
      </StyledRow>

      <RenderFormField
        fieldName='favChar'
        label='Favorite Character'
        register={register}
        errors={errors}
      />

      <RenderFormField
        fieldName='favRide'
        label='Favorite Ride'
        register={register}
        errors={errors}
      />

      <RenderFormField
        fieldName='favPark'
        label='Favorite Disney Theme Park'
        register={register}
        errors={errors}
        options={['Walt Disney World', 'Epcot', 'Animal Kingdom']}
      />

      <StyledRow>
        <Button label='Update Profile' onClick={handleSubmitClick} /> 
        <Button label='Cancel' variant='secondary' onClick={() => setToggleEditMode(false)} />
      </StyledRow>
    </form> : 
    <StyledProfileData>
        <RenderProfileData />
        <Button label='Edit Profile' onClick={() => setToggleEditMode(true)} />
    </StyledProfileData>
  );
}

export default Profile;