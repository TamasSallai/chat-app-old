import { useState } from 'react'
import './TextInput.css'

export interface TextInputProps {
  id: string
  name: string
  label: string
  placeholder?: string
  required: boolean
  pattern: string
  errorMessage: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextInput = ({
  name,
  label,
  placeholder,
  required,
  pattern,
  errorMessage,
  onChange,
}: TextInputProps) => {
  const [blurred, setBlurred] = useState<boolean>(false)

  return (
    <div className="text-input-group">
      <label>{label}</label>
      <div className="input-container">
        <input
          className="text-input"
          type="text"
          name={name}
          placeholder={placeholder}
          pattern={pattern}
          required={required}
          onBlur={() => setBlurred(true)}
          data-blurred={blurred.toString()}
          onChange={onChange}
        />

        <svg
          className="input-icon input-icon-checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
          <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
        </svg>

        <svg
          className="input-icon input-icon-cross"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
          <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
        </svg>
      </div>
      <span className="input-error-message">{errorMessage}</span>
    </div>
  )
}
