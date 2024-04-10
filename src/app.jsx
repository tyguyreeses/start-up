import React from 'react';
import './app.css';

export default function App() {
  return (
      <div>
        <header>
          <aside id="username_display"></aside>
          <h1>JobOfferInsight</h1>
          <nav id="menu">
            <div><a class="menu_control" href="jobEntry.html">Job Entry</a></div>
            <div><a class="menu_control" href="compare.html">Compare</a></div>
            <div><a class="menu_control" href="about.html">About</a></div>
            <div><a class="menu_control" onclick="logout()">Logout</a></div>
          </nav>
        </header>
        
        <main>App Components Go Here</main>

        <footer>
            <span id="author">By Tyler Reese</span>
            <div id="github">
              <a id="github_link" href="https://github.com/tyguyreeses/start-up/blob/main/README.md">GitHub Repository Link</a>
            </div>
          </footer>
        </div>
  );
}