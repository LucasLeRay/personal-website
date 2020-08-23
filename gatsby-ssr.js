const React = require('react')
const COLORS = require('./static/colors.json')

function setColorsByTheme () {
  const colors = 'COLORS'

  function getInitialColorMode() {
    const persistedColorPreference = localStorage.getItem('color-mode')
    if (typeof persistedColorPreference === 'string') {
      return persistedColorPreference
    }
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    if (typeof mql.matches === 'boolean') {
      return mql.matches ? 'dark' : 'light'
    }
    return 'light'
  }

  const colorMode = getInitialColorMode();

  const root = document.documentElement;
  Object.entries(colors[colorMode]).forEach(([name, colorByTheme]) => {
    const cssVarName = '--color-' + name;
    root.style.setProperty(cssVarName, colorByTheme);
  });

  root.style.setProperty('--initial-color-mode', colorMode);
}


const ColorModeInject = () => {
  const functionString = String(setColorsByTheme)
    .replace("'COLORS'", JSON.stringify(COLORS));
  const codeToRun = `(${functionString})()`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: codeToRun }}
    />
  )
}

exports.onRenderBody = ({ setPreBodyComponents, setPostBodyComponents }) => {
  setPreBodyComponents(<ColorModeInject />);
  setPostBodyComponents([
    <script
      data-name="BMC-Widget"
      src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
      data-id="lucasleray"
      data-description="Support me on Buy me a coffee!"
      data-message="Thank you for visiting. You can now buy me a coffee!"
      data-color="#e96835"
      data-position="right"
      data-x_margin="18"
      data-y_margin="18"
    ></script>,
  ])
}
