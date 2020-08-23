import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeProvider'

function ColorModeToggle () {
  const { colorMode, setColorMode } = useContext(ThemeContext)

  return (
    <button style={{backgroundColor: 'red'}} onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>{colorMode === 'dark' ? '🌙' : '☀️'}</button>
  )
}

export default ColorModeToggle
