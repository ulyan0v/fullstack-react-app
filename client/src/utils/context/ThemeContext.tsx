import React, {createContext, useState} from 'react';
import {createMuiTheme, Theme, ThemeProvider} from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

const themes = {
  light: createMuiTheme({
    palette: {
      type: 'light',
      primary: blue,
      secondary: red,
    }
  }),
  dark: createMuiTheme({
    palette: {
      type: 'dark',
      primary: blue,
      secondary: red,
    }
  })
};

export const ThemesContext = createContext({
  isDarkMode: true,
  toggleTheme: () => {}
});

const ThemesProvider: React.FC = ({children}) => {
  const {isDarkMode, theme, toggleTheme} = useThemes();

  return (
    <ThemeProvider theme={theme}>
      <ThemesContext.Provider value={{isDarkMode, toggleTheme}}>
        {children}
      </ThemesContext.Provider>
    </ThemeProvider>
  );
}

const useThemes = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [theme, setTheme] = useState<Theme>(themes.dark);

  const toggleTheme = () => {
    setTheme(isDarkMode ? themes.light : themes.dark);
    setIsDarkMode(!isDarkMode);
  }

  return {isDarkMode, theme, toggleTheme};
}

export default ThemesProvider;