import React, { useEffect, useState } from 'react'
import Input from '../../global/Input'

function Search() {
  const [search, setSearch] = useState("")

  useEffect(() => {
    console.log(search)
  }, [search])

  return (
    <div>
      <Input type='text' value={search} name='search' placeholder='Search...' 
      className="w-full"
      onChange={(e:any) => {
        setSearch(e.target.value)
      }}
      />
    </div>
  )
}

export default Search