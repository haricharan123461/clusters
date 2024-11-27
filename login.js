import React, { useState } from "react";

const LoginForm=() => {
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');

  const handleSubmit=(e) => {
    e.preventDefault();
    if(username==='admin' && password==='admin123'){
      alert("login successfull");
    }
    else{
      alert('login failed');
    }
  };
  return(
    <div>
      <h2>Login form</h2>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          placeholder="enter username"
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="enter password"
          required
        />
      </div>
      <button onClick={handleSubmit}>Login</button>
    </div>
  )
}

export default LoginForm;
