import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import store from "./redux/store";
import Apollo from "./components/Apollo";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Apollo>
        <App/>
      </Apollo>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app')
);


