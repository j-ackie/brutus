import React from 'react'
import { IconButton } from '../../global/Buttons'
import { useNavigate } from 'react-router-dom'

function BottomBar() {

  const navigate = useNavigate()

  const routes = [
    {
      name: "Home",
      icon: (<div>Home</div>),
      route: "/"
    },
    {
      name: "Search",
      icon: (<div>SEarch</div>),
      route: "/search"
    },
    {
      name: "Create",
      icon: (<div>Create</div>),
      route: "/"
    },
    {
      name: "Notifs",
      icon: (<div>Notifs</div>),
      route: "/"
    },
    {
      name: "DMs",
      icon: (<div>DMs</div>),
      route: "/"
    },
  ]

  return (
    <div className="w-full p-4 bg-primary-400 flex flex-row justify-around">
      {
        routes.map(route => {
          return (
            <IconButton color='asdf' onClick={() => {
              navigate(route.route)
            }}>
              {route.icon}
            </IconButton>
          )
        })
      }
    </div>
  )
}

export default BottomBar