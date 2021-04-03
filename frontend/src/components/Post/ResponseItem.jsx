import React from 'react'

const ResponseItem = ({response, user}) => {
  return (
    <div>
      {response.author.name}
    </div>
  )
}

export default ResponseItem
