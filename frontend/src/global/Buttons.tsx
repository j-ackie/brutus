import React, { ReactNode } from 'react'
import { COLORS } from './Colors'
import { RegText } from './Text'

function IconButton({color, onClick, children, ...props} : {icon : string, color : string, onClick: any, children?: ReactNode}) {
  return (
    <button {...props} onClick={onClick}
      className="rounded-full border border-slate-600 p-2">
      {children}
    </button>
  )
}

function TextButton({text, color = COLORS.text, onClick, ...props} : {text : string, color? : string, onClick : any}) {
  return (
    <button style={{color: color}} onClick={onClick}
      className="p-2 border-b-2 border-b-black hover:border-b-accent duration-200"
    >
      <RegText text={text}/>
    </button>
  )
}

export { IconButton, TextButton }