import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import App from './App.js';
import { GlobalStyles } from './global-styles.js'
import { firebase } from './lib/firebase.prod.js';
import { FirebaseContext } from './context/firebase.js';
//import { render } from '@testing-library/react';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<App />, document.getElementById('root')
//);
root.render(
    <>
        <FirebaseContext.Provider value = {{ firebase }}>
            <GlobalStyles />
            <App />
        </FirebaseContext.Provider>
    </>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
