import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
// import App from './App';
import Login from "./pages/login/login.jsx";
import ListarAdm from "./pages/Consultas/listarAdm/listarAdm";
import reportWebVitals from './reportWebVitals';


const routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route path='/consultasAdm' element={<ListarAdm/>}></Route>
      </Routes>
    </div>
  </Router>

)

ReactDOM.render(
  routing,
  document.getElementById('root')
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
