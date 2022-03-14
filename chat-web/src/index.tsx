import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ExitPage from './components/ExitPage';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="exit" element={<ExitPage/>}/>
    </Routes>
  </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
