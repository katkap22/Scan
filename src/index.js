import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './assets/fonts/Inter-VariableFont_slnt,wght.ttf';
import './assets/fonts/ferry_black.otf';
import './index.css';
import App from './App';
import {HashRouter} from "react-router-dom";



export const Context = createContext({

})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <HashRouter>
        {/*<Context.Provider>*/}
            <App />
        {/*</Context.Provider>*/}
    </HashRouter>

  // </React.StrictMode>
);


