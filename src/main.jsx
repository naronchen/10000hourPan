import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'

import EntryPage from './pages/EntryPage.jsx';
import SetUpPage from './pages/setUpPage.jsx';
import HomePage from './pages/homePage/HomePage.jsx';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/setUpPage" element={<SetUpPage />} />
      <Route path="/homePage" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
)
