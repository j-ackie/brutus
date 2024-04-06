import React, { ReactNode } from 'react'

function IconButton({icon, color, children, ...props} : {icon : string, color : string, children : ReactNode}) {
  return (
    <div style={{color: color}} {...props}>
      {children}
    </div>
  )
}

function TextButton() {
  return (
    <div>
      TextButton
    </div>
  )
}

export { IconButton, TextButton }