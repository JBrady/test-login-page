import React, { useState } from 'react';
import firebase from './firebaseConfig';

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // Navigate to the dashboard or main app page
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSocialLogin = async (providerName) => {
    let provider;

    if (providerName === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    } else if (providerName === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    } else if (providerName === 'apple') {
      provider = new firebase.auth.OAuthProvider('apple');
    }

    try {
      await firebase.auth().signInWithPopup(provider);
      // Navigate to dashboard or main app page
    } catch (error) {
      console.error("Error with social login:", error);
    }
  };

  return (
    <div className="login-container">
      <h1>vagaro</h1>
      <button onClick={() => handleSocialLogin('facebook')}>Log In with Facebook</button>
      <button onClick={() => handleSocialLogin('google')}>Log In with Google</button>
      <button onClick={() => handleSocialLogin('apple')}>Sign in with Apple</button>
      <p>or</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username or Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div>
          <input type="checkbox" id="remember" name="remember" />
          <label htmlFor="remember">Remember Me</label>
          <button className="link-style-button">Forgot your password?</button>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button className="link-style-button">Forgot your password?</button></p>
    </div>
  );
}

export default LoginComponent;
