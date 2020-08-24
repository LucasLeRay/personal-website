import React, { useContext, useState } from 'react'

import { ThemeContext } from '../ThemeProvider'
import { Container } from './ColorModeToggle.module.css'
import Moon from './moon.svg'
import Sun from './sun.svg'

function ColorModeToggle () {
  const { colorMode, setColorMode } = useContext(ThemeContext)
  const [ toggle, setToggle ] = useState('IDDLE')

  return (
    <div className={Container}>
      {colorMode === 'dark' && (<Moon
        onClick={() => {
          setToggle('OUT')
        }}
        onAnimationEnd={() => {
          if (toggle === 'OUT') {
            setColorMode('light')
            setToggle('IN')
          } else {
            setToggle(null)
          }
        }}
        toggle={toggle}
      />)}
      {colorMode === 'light' && (<Sun
        onClick={() => {
          setToggle('OUT')
        }}
        onAnimationEnd={() => {
          if (toggle === 'OUT') {
            setColorMode('dark')
            setToggle('IN')
          } else {
            setToggle(null)
          }
        }}
        toggle={toggle}
      />)}
    </div>
  )
}

export default ColorModeToggle
