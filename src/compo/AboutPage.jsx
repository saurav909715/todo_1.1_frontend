import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { toast, Bounce, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";

// About Page Component
export default function AboutPage() {
    const [msg, setMsg] = useState({
        name: "",
        email: "",
        text: ""
    });
    
    const [errors, setErrors] = useState({
        name: false,
        email: false
    });

    const handleChange = (e) => {
        setMsg({
            ...msg,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Simple validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidName = msg.name.length > 3;
        const isValidEmail = emailPattern.test(msg.email);
        const baseLink = "https://todo-1-1-1.onrender.com/api"
        
        if (!isValidName || !isValidEmail) {
            setErrors({
                name: !isValidName,
                email: !isValidEmail
            });
            
            toast.warn('Please enter valid input', {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "light",
                transition: Flip
            });
            return;
        }

        try {
            const response = await axios.post(`${baseLink}/contactUs`, msg);
            toast.success('Message Sent', {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "light",
                transition: Flip,
            });
            
            // Reset input fields after submission
            setMsg({ name: "", email: "", text: "" });
            setErrors({ name: false, email: false });
        } catch (error) {
            console.log("Error while sending message", error);
        }
    };

    return (
        <Container>
            <TextArea>
                <h1>About Us</h1>
                <p>
                    This is my first full-stack project built with the MERN stack (MongoDB, Express.js, React.js, Node.js).
                    The app lets users register, log in, and manage their personal to-do lists.
                </p>
                <ul>
                    <li><strong>Backend:</strong> The server uses Node.js and Express.js to handle user authentication and API routes for adding, editing, and deleting tasks.</li>
                    <li><strong>Database:</strong> MongoDB stores user data and to-do items.</li>
                    <li><strong>Frontend:</strong> React is used for the user interface, making the app interactive and easy to use.</li>
                </ul>
                <h4>This project helped me understand how the MERN stack works together!</h4>
            </TextArea>

            <FormArea>
                <form onSubmit={handleSubmit}>
                <Input
    type="text"
    name="name"
    onChange={handleChange}
    value={msg.name}
    placeholder="Your Good Name 😊"
    invalid={errors.name ? 'true' : undefined}  // Conditionally set the attribute
/>

<Input
    type="email"
    name="email"
    onChange={handleChange}
    value={msg.email}
    placeholder="Your Email"
    invalid={errors.email ? 'true' : undefined}  // Conditionally set the attribute
/>

                    <Input
                        type="text"
                        name="text"
                        onChange={handleChange}
                        value={msg.text}
                        placeholder="Write your thought here"
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </FormArea>

            <NavLink to="/" ><But>Back</But></NavLink>
        </Container>
    );
}

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const But = styled.button`
    background-color: #2a6fb9;
    cursor: pointer;
    color: white;
    border: none;
    padding: 20px;
    border-radius: 10px;
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-weight: bold;
    &:hover {
        background-color: #004f8a;
    }
`;

const TextArea = styled.div`
    text-align: center;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

    h1 {
        font-size: 2rem;
        margin-bottom: 10px;
    }

    p, ul {
        font-size: 1.1rem;
        margin-bottom: 10px;
        color: #333;
    }

    ul {
        list-style: none;
        padding-left: 0;
        li {
            margin-bottom: 8px;
        }
    }

    h4 {
        font-weight: bold;
        color: #555;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 1.5rem;
        }

        p, ul {
            font-size: 1rem;
        }
    }
`;

const FormArea = styled.div`
    width: 100%;
    max-width: 500px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid ${props => props.invalid ? 'red' : '#ccc'};
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    &:focus {
        border-color: #007BFF;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
    &:focus {
        outline: none;
    }
`;
