import React, { useContext, useState } from 'react'

import { ThemeContext } from '../ThemeProvider'
import { Container } from './ColorModeToggle.module.css'
import Moon from './moon.svg'

function ColorModeToggle () {
  const { colorMode, setColorMode } = useContext(ThemeContext)
  const [ toggle, setToggle ] = useState(0)

  return (
    <div className={Container}>
      <Moon
        onClick={() => {
          setColorMode(colorMode === 'light' ? 'dark' : 'light')
          setToggle(1)
        }}
        onAnimationEnd={() => setToggle(0)}
        toggle={toggle}
      />
    </div>
  )
}

export default ColorModeToggle
