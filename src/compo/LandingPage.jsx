import React, { useState } from 'react';
import styled from 'styled-components';
import { toast,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function LandingPage() {
  const [showSignUp, setShowSignUp] = useState(false);
  const baseLink = "https://todo-1-1-1.onrender.com/api/"
  

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleInputLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`${baseLink}/reg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data.token);
      setShowSignUp(false);
      localStorage.setItem("Token", data.token);
      localStorage.setItem("Username", data.name);
      toast.success("Regstration");
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      toast.info('Regstration Sucesfull✔️', {
        position: "top-left",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
        });
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    // console.log(login);
    try {
      // Send login details directly, not wrapped inside another object
      const response = await axios.post(`${baseLink}/login`, login);
      
      const data = response.data;  // axios automatically parses the response
      const passTrue = data.isPassTrue;
      // console.log(response.data)
      // console.log(response.data.isExist)
  
      setShowSignUp(false);
      if(response.data.isExist){
        // console.log(passTrue)
        if (passTrue) {
          localStorage.setItem("Token", data.token);
          localStorage.setItem("Username", data.name);
          toast.success("Login Successfully. Redirecting...");
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
          
        } else {
          console.log("Invalid Password");
          toast.error("Invalid Password");
        }
      }else{
        toast.info("User dons't exit")
      }

      
      
  
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const handleClose = () => {
    setShowSignUp(false);
  };

  return (
    <DIV>
      <div className={`main ${showSignUp ? 'blurred' : ''}`}>
        <div className="container">
          <h1>Login</h1>
        </div>
        <div className="input">
          <form onSubmit={handleSubmitLogin}>
            <input
              name='email'
              value={login.email}
              onChange={handleInputLogin}
              type="email"
              placeholder="Email"
            />
            <input
              name='password'
              value={login.password}
              onChange={handleInputLogin}
              type="password"
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <p className="signup-text">
          Don't have an account? <a onClick={handleSignUpClick}>SignUp here</a>
        </p>
      </div>

      {showSignUp && (
        <div className="signup-modal">
          <div className="signup-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleInput}
                value={user.name}
                name='name'
                type="text"
                placeholder="Username"
              />
              <input
                onChange={handleInput}
                value={user.email}
                name='email'
                type="email"
                placeholder="Email"
              />
              <input
                onChange={handleInput}
                value={user.password}
                name='password'
                type="password"
                placeholder="Password"
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </DIV>
  );
}

const DIV = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  position: relative;

  .main {
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    z-index: 1;
    transition: filter 0.3s ease;
    text-align: center;
  }

  .main.blurred {
    filter: blur(5px);
  }

  h1 {
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;
    font-family: 'Poppins', sans-serif;
  }

  .input form {
    display: flex;
    flex-direction: column;
  }

  .input input {
    margin-bottom: 15px;
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .input button {
    padding: 10px;
    width: 100%;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  .input button:hover {
    background-color: #0056b3;
  }

  .signup-text {
    margin-top: 20px;
    text-align: center;
    color: #666;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
  }

  .signup-text a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
  }

  .signup-text a:hover {
    text-decoration: underline;
  }

  /* Modal Styles */
  .signup-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }

  .signup-content {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    width: 400px;
    text-align: center;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .signup-content h2 {
    margin-bottom: 20px;
    font-family: 'Poppins', sans-serif;
  }

  .signup-content input {
    margin-bottom: 15px;
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .signup-content button {
    padding: 10px;
    width: 100%;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }

  .signup-content button:hover {
    background-color: #0056b3;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;
  }
`;
