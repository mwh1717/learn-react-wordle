import React from 'react'

function Keyboard(props) {
  const { on } = props;
  const keyList = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ]

  return (
    <div>
      Keyboard Here
    </div>
  )
}

export default Keyboard
