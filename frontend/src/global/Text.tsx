import React from 'react'

function Label({text, color, ...props} : {text: string, color: string}) {
  return (
    <div style={{color: color, fontSize: '1rem'}} {...props}>
      {text}
    </div>
  )
}

function RegText({text, color, ...props} : {text: string, color: string}) {
  return (
    <div style={{color: color, fontSize: '1rem'}} {...props}>
      {text}
    </div>
  )
}

function SubHeading({text, color, ...props} : {text: string, color: string}) {
  return (
    <div style={{color: color, fontSize: '1.5rem'}} {...props}>
      {text}
    </div>
  )
}

function Heading({text, color, ...props} : {text: string, color: string}) {
  return (
    <div style={{color: color, fontSize: '2rem'}} {...props}>
      {text}
    </div>
  )
}

export { Label, RegText, SubHeading, Heading}