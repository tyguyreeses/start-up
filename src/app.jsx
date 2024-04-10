import React from 'react';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login.jsx';
import { JobEntry } from './jobEntry/jobEntry.jsx';
import { Compare } from './compare/compare.jsx';
import { About } from './about/about.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <aside id="username_display"></aside>
          <h1>JobOfferInsight</h1>
          <nav id="menu">
            <div><NavLink className="menu_control" to="jobEntry">Job Entry</NavLink></div>
            <div><NavLink className="menu_control" to="compare">Compare</NavLink></div>
            <div><NavLink className="menu_control" to="about">About</NavLink></div>
            <div><NavLink className="menu_control" onclick="logout()">Logout</NavLink></div>
          </nav>
        </header>
        
        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/jobEntry' element={<JobEntry />} />
          <Route path='/compare' element={<Compare />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
            <span id="author">By Tyler Reese</span>
            <div id="github">
              <a id="github_link" href="https://github.com/tyguyreeses/start-up/blob/main/README.md">GitHub Repository Link</a>
            </div>
          </footer>
        </div>
      </BrowserRouter>
  );
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}