import React from 'react'
import Select from 'react-select'


function MultiSelectDropdown({label, id, name, type, value, options, onChange, onBlur, touched, error, style}) {
  return (
    <>
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
            <Select
                defaultValue={value}
                isMulti
                id={id}
                name={name}
                value={value}
                options={options}
                onChange={onChange}
                onBlur={onBlur}
                className="basic-multi-select"
                classNamePrefix="select"
                isSearchable={true}
            />
            </div>
            {
                touched && error && (<div className='error'>{error}</div>)
            }
        </div>
    </>
  )
}

export default MultiSelectDropdown