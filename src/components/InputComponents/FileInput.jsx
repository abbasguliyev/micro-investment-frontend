import React from 'react'

function FileInput({label, id, name, type, value, onChange, onBlur, touched, error, style}) {
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
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
                />
            </div>
            {
                touched && error && (<div className='error'>{error}</div>)
            }
        </div>
    </>
  )
}

export default FileInput