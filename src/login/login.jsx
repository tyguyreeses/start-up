import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const login = async () => {
    loginOrCreate(`/api/auth/login`);
  }

  const create = async () => {
    if (username && password) {
      loginOrCreate(`/api/auth/create`);
    } else {
      alert("Please enter a username and a password to create a new user.")
    }
  }

  const loginOrCreate = async (endpoint) => {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: username, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
      localStorage.setItem('username', username);
      navigate('/jobEntry');
    } else {
      const body = await response.json();
      alert(body.msg);
    }
  }

    return (
      <main>
        <h1>Welcome</h1>
        <p>Login to save and compare your entries</p>
        <form id="login_form">
          <div className="login_div">
            <label htmlFor="name">Username: </label>
            <input className="login_box" type="text" placeholder="Username" value={username} onChange={(i) => setUsername(i.target.value)}/>
          </div>
          <div className="login_div">
            <label htmlFor="password">Password: </label>
            <input className="login_box" type="password" placeholder="Password" value={password} onChange={(i) => setPassword(i.target.value)}/>
          </div>
          <button type="button" id="login_user" onClick={login}>Login</button>
          <button type="button" id="create_user" onClick={create}>Create</button>
        </form>
      </main>
    );
  }