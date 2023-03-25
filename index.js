import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import { UserStore } from './src/user/UserContext';

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore()
  }}>
      <App />
  </Context.Provider>,
  document.getElementById('root')
);