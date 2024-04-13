import React, { useState } from 'react';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './login/login.jsx';
import Entry from './jobEntry/jobEntry.jsx';
import { Compare } from './compare/compare.jsx';
import { About } from './about/about.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
function AppContent() {
  const username = localStorage.getItem('username');
  const [isLoggedIn, setIsLoggedIn] = useState(!!username);
  const navigate = useNavigate();

  async function logout() {
    localStorage.clear();
    await fetch(`/api/auth/logout`, { method: 'delete' });
    setIsLoggedIn(false);
    navigate('/');
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log("isLoggedIn is: ", isLoggedIn);
  }

  return (
      <div>
        <header>
          {isLoggedIn ? (<aside id="username_display">{username}</aside>) : null}
          <h1>JobOfferInsight</h1>
          {isLoggedIn ? (
            <nav id="menu">
            <div><NavLink className="menu_control" to="/jobEntry">Job Entry</NavLink></div>
            <div><NavLink className="menu_control" to="/compare">Compare</NavLink></div>
            <div><NavLink className="menu_control" to="/about">About</NavLink></div>
            <div><NavLink className="menu_control" onClick={logout}>Logout</NavLink></div>
          </nav>
          ) : null}
        </header>
        
        <Routes>
          <Route path='/' element={<Login handleLogin={handleLogin}/>} exact />
          <Route path='/jobEntry' element={<Entry />} />
          <Route path='/compare' element={<Compare />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
            <span id="author">By Tyler Reese</span>
            <div id="github">
              <a id="github_link" href="https://github.com/tyguyreeses/start-up/blob/main/README.md" target="_blank" rel="noopener noreferrer">GitHub Repository Link</a>
            </div>
          </footer>
        </div>
  );
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}