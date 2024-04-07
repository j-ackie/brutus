import React, { ReactNode } from 'react'
import { COLORS } from './Colors'
import { RegText, SubHeading } from './Text'

type IconProps = {
  color: string,
  onClick: any,
  children?: ReactNode,
  [x:string]:any
}

type TextButtonProps = {
  text : string,
  color? : string,
  onClick : any,
  [x:string]:any
}

function IconButton({color, onClick, children, ...props} : IconProps) {
  return (
    <button {...props} onClick={onClick}
      className="rounded-full border border-slate-600 p-2">
      {children}
    </button>
  )
}

function TextButton({text, color = COLORS.text, onClick, ...props} : TextButtonProps) {
  let stylename = "p-2 border-b-2 border-b-black hover:border-b-accent duration-200"
  if (props.className) stylename += " " + props.className
  return (
    <button style={{color: color}} onClick={onClick}
      className={stylename}
    >
      <SubHeading text={text}/>
    </button>
  )
}

export { IconButton, TextButton }