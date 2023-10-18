// Login.js
import React, { useState } from "react";
import { auth, googleProvider, facebookProvider } from './firebaseConfig';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.error("Error with Google sign in:", error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      await auth.signInWithPopup(facebookProvider);
    } catch (error) {
      console.error("Error with Facebook sign in:", error);
    }
  };

  // ... Add other sign-in methods as needed

  return (
    <div className="login-container">
      <div className="logo">vagaro</div>
      <button onClick={signInWithFacebook}>Log In with Facebook</button>
      <button onClick={signInWithGoogle}>Log In with Google</button>
      {/* Add a button for Apple sign in here */}
      <div className="or">or</div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username or Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="checkbox" id="rememberMe" name="rememberMe" />
        <label htmlFor="rememberMe">Remember Me</label>
        <button className="link-style-button">Forgot your password?</button>
        <button type="submit">Login</button>
      </form>
      <div>
        Don't have an account? <button className="link-style-button">Sign Up Now!</button>
      </div>
    </div>
  );
}

export default Login;
