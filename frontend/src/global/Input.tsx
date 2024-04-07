import React from 'react'

type InputProps = {
  type: string,
  value: string,
  name: string,
  placeholder?: string,
  className?: string,
  [x:string]:any
}

function Input({type, value, name, placeholder, className, ...props} : InputProps) {
  return (
    <input
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      {...props}
      className={className + " p-2 outline-none border-b-2 focus:border-b-accent text-text bg-transparent"}
    />
  )
}

export default Input