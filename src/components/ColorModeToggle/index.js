import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeProvider'

function ColorModeToggle () {
  const { colorMode, setColorMode } = useContext(ThemeContext)

  if (!colorMode) {
    return null;
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={colorMode === 'dark'}
        onChange={ev => {
          setColorMode(ev.target.checked ? 'dark' : 'light');
        }}
      />{' '}
      Dark
    </label>
  )
}

export default ColorModeToggle
