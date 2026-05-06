import React from "react"
import ThemeContext from "contexts/theme-context"

function withTheme(WrappedComponent) {
  return React.forwardRef(function ThemeComponent(props, ref) {
    return (
      <ThemeContext.Consumer>
        {(themeContext) => <WrappedComponent ref={ref} theme={themeContext} {...props} />}
      </ThemeContext.Consumer>
    )
  })
}

export default withTheme
