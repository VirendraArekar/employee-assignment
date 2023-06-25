import React from 'react'

export default function Footer() {
  return (
    <div>
        {`copyright@${new Date().getFullYear()} created by`}
        <a href='https://github.com/VirendraArekar'> - Virendra Arekar</a>
    </div>
  )
}
