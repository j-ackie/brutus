import React from 'react'
import { COLORS } from './Colors'

type TextProps = {
  text: string,
  color? :string
  [x:string]:any
}

function Label({text, color=COLORS.text, ...props} : TextProps) {
  return (
    <div style={{color: color, fontSize: '0.9rem'}} {...props}>
      {text}
    </div>
  )
}

function RegText({text, color=COLORS.text, ...props} : TextProps) {
  return (
    <div style={{color: color, fontSize: '0.7rem'}} {...props}>
      {text}
    </div>
  )
}

function SubHeading({text, color=COLORS.text, ...props} : TextProps) {
  return (
    <div style={{color: color, fontSize: '1.2rem'}} {...props}>
      {text}
    </div>
  )
}

function Heading({text, color=COLORS.text, ...props} : TextProps) {
  return (
    <div style={{color: color, fontSize: '2rem'}} {...props}>
      {text}
    </div>
  )
}

export { Label, RegText, SubHeading, Heading }