import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import ThemesProvider from "./utils/context/ThemeContext";
import AuthProvider from "./utils/context/AuthContext";
import Apollo from "./utils/context/ApolloContext";
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <ThemesProvider>
      <AuthProvider>
        <Apollo>
          <App/>
        </Apollo>
      </AuthProvider>
    </ThemesProvider>
  </BrowserRouter>,
  document.querySelector('#app')
);


