import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'

import EntryPage from './pages/EntryPage.jsx';
import SetUpPage from './pages/setUpPage.jsx';
import HomePage from './pages/homePage/HomePage.jsx';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/setUpPage" element={<SetUpPage />}></Route>
      <Route path="/homePage" element={<HomePage />}></Route>
    </Routes>
  </BrowserRouter>
)
