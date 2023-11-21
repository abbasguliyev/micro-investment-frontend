import React from 'react'

function AuthInput({label, id, name, type, value, onChange, onBlur, touched, error, style, disabled}) {
  return (
    <>
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${style}`}
                disabled={disabled}
                />
            </div>
            {
                touched && error && (<div className='error'>{error}</div>)
            }
        </div>
    </>
  )
}

export default AuthInput