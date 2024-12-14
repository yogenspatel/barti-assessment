import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import styled from "styled-components"
import theme from '../constants/theme'


// Styled Form field input/select
const StyledFormField = styled.div`
  color: ${theme.text};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    color: ${theme.textSecondary};
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 5px;
  }
  input, select {
    border: 1px solid ${theme.border};
    padding: 10px;
    font-size: 14px;
    margin-bottom: 10px;
    color: ${theme.text};
  }

  .required {
    color: red;
    padding-left: 3px;
  }
  
`

interface FormFieldProps {
    label: string
    required?: boolean
    register: UseFormRegister<FieldValues>
    fieldName: string
    type?: string
    errors: FieldErrors<FieldValues>
    options?: string[]
  }

/**
 * Renders input, select form fields
 * Implements error handling
 */
export const RenderFormField: FC<FormFieldProps> = ({
    label, register, required = false, fieldName, type = 'text', errors, options = []
  }) => {
    return (
      <StyledFormField>
          <label htmlFor={fieldName}>{label}{required ? <span className='required'>*</span> : null}</label>
          {!options.length ? <input type={type} id={fieldName} {...register(fieldName, { required: required })} placeholder={label} />
          
          : <select {...register(fieldName)}>
          <option value="">Select...</option>
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>}
          {errors[fieldName] && errors[fieldName].type === "required" && (
            <span className='required'>This is required</span>
          )}
      </StyledFormField>
    )
}
  