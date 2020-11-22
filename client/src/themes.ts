import {createMuiTheme} from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

const themes = {
  light: createMuiTheme({
    palette: {
      type: 'light',
      primary: blue,
      secondary: red,
    },

  }),
  dark: createMuiTheme({
    palette: {
      type: 'dark',
      primary: blue,
      secondary: red,
    },
  })
};

export default themes;