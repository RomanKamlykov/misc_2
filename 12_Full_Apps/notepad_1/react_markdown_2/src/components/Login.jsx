import React from 'react';

export default function Login() {
  return (
    <div className="login sheet">
      <h1>Login</h1>
      <form action="/login" method="POST">
        <div>
          <label htmlFor="email">
            Email
            <input type="email" id="email" name="email" required />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password
            <input type="password" id="password" name="password" required />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      <a href="/">Home</a>
    </div>
  );
}
