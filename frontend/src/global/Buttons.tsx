import React, { ReactNode } from 'react'
import { COLORS } from './Colors'

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
      className="bg-black p-3 "
    >
      {text}
    </button>
  )
}

export { IconButton, TextButton }