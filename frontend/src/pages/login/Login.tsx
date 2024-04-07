import React from 'react'
import { COLORS } from '../../global/Colors'
import { Heading, SubHeading } from '../../global/Text'
import GOOGLE from "../../assets/Google__G__logo.svg.png"

function Login() {
  return (
    <div className='flex flex-col items-center justify-center h-screen pt-4' style = {
      {
        background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.accent2})`
      }
    }>

      <div className='w-2/5 h-2/5 bg-white rounded-xl flex justify-center items-center drop-shadow-lg'>
        <button className='border rounded-xl p-4 flex flex-row items-center hover:shadow-md duration-200'>
          <img src={GOOGLE} className='h-8 w-8 mr-2'/>
          <SubHeading text='Login with Google...' color={COLORS.black}/>
        </button>
      </div>

    </div>
  )
}

export default Login