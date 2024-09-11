import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast ,Bounce,Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NavLink} from "react-router-dom"


export default function HomePage() {
  const userName = localStorage.getItem("Username");
  const userToken = localStorage.getItem("Token");
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState({ text: "" });
  const [editTodo, setEditTodo] = useState(null);
  const [logout, setLogout] = useState(null); // For tracking the todo being edited
   // For tracking the todo being edited
  const [editText, setEditText] = useState(""); // Input for editing text
  const baseLink = "https://todo-1-1-1.onrender.com/api"


  // Add Task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.text.length < 3) {
      toast.warn("Task is too short! Please enter at least 3 characters.", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
      return; // Do not proceed with submission
    }
    try {
      const response = await axios.post(
        `${baseLink}/todos/post`,
        { text: text.text },
        {
          headers: {
            Authorization: `${userToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      toast.success('Task Added😊', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
        });
      text.text = "";
      console.log('Task added successfully', response.data);
      fetchTodos(); // Fetch updated tasks
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  // Input Change Handler
  const handleInput = (e) => {
    setText({
      ...text,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch Todos
  const fetchTodos = async () => {
    const response = await axios.get(`${baseLink}/todos`, {
      headers: {
        Authorization: `${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    setTodos(response.data.todos);
  };

  // Delete Todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseLink}/todos/del/${id}`, {
        headers: {
          Authorization: `${userToken}`,
        },
      });
      fetchTodos();
      toast.info("Deleted" , {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    } catch (error) {
      console.error("Error deleting task", error);
      toast.info("Data can't be deleted From server" , {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  };

  // Edit Todo
  const handleEdit = (todo) => {
    setEditTodo(todo); // Set the task to edit
    setEditText(todo.text); // Set the existing text to input
   
  };

  // Update Todo
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${baseLink}/todos/update/${editTodo._id}`,{
          text: editText,
        }
      );
      setEditTodo(null); // Close edit modal/input
      fetchTodos();
      toast.info('🦄 Updated', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
        });
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  const handleLogout= () => {
    console.log("Logout")
    localStorage.removeItem("Token")
    localStorage.removeItem("Username")
    setLogout(null)
    toast.success("Logout Secusfull ", {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
      });
      setTimeout(() => {
        window.location.href = '/'
      },1000)
  }
  return (
    <Container>
      <Navbar>
        <Logo>tOdU</Logo>
        <NavLinks>
          <h2><NavLink to="/about" >About</NavLink></h2>
          <h2>
            Hi <Username>{userName || "Guest"}</Username>
          </h2>
          <h4 onClick={ () => setLogout(true) } >Logout</h4>
        </NavLinks>
      </Navbar>

      <Center>
        <TaskInputWrapper>
          <form onSubmit={handleSubmit}>
            <TaskInput
              value={text.text}
              onChange={handleInput}
              name="text"
              type="text"
              placeholder="Enter the Task"
            />
            <AddButton>Add Task</AddButton>
          </form>
        </TaskInputWrapper>

        <TaskList>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <li key={index}>
                {todo.text}
                  <div className='btns' >
                      <EditButton onClick={() => handleEdit(todo)}><i className="ri-pencil-fill"></i></EditButton>
                      <DeleteButton onClick={() => handleDelete(todo._id)}><i className="ri-delete-bin-2-fill"></i></DeleteButton>
                  </div>
                </li>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </TaskList>

        {/* Edit Modal/Input */}
        {editTodo && (
          <EditModal>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div id='editBtns' >
                <UpdateButton type="submit"><i className="ri-upload-line"></i></UpdateButton>
                <CancelButton onClick={() => setEditTodo(null)}><i className="ri-close-circle-fill"></i></CancelButton>
              </div>
              </form>
          </EditModal>
        )}
        {
  logout && (
    <LogoutModal>
      <LogoutBox>
        <p>Are you sure you want to logout?</p>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        <CancelButtonn onClick={() => setLogout(null)}>Cancel</CancelButtonn>
      </LogoutBox>
    </LogoutModal>
  )
}

      </Center>
    </Container>
  );
}

const LogoutModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* For the overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const LogoutBox = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
  animation: fadeIn 0.3s ease-in-out;

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
`;


const LogoutButton = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dc2626;
  }
`;

const CancelButtonn = styled.button`
  background-color: #9ca3af;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #6b7280;
  }
`;



const Container = styled.div`
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9fafb;
  min-height: 100vh;
  padding: 20px;
`;

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #1f2937;
  padding: 20px;
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  li{
    color: pink;
  }
  @media (max-width: 800px) {
    padding: 10px;
  }
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #f97316;
`;
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;

  h2, h4 {
    margin: 0; /* Reset margin for consistency */
  }

  h2 a {
    color: white; /* Text color for link */
    text-decoration: none; /* Remove underline */
    transition: color 0.3s;

    &:hover {
      color: #f97316; /* Hover color */
    }
  }

  h4 {
    cursor: pointer;
    background-color: #ef4444;
    padding: 8px 12px;
    border-radius: 5px;
    transition: background-color 0.3s;
    color: white; /* Text color */
    margin: 0;

    &:hover {
      background-color: #dc2626; /* Hover background color */
    }
  }
`;

const Username = styled.span`
  color: #f97316;
  font-size: 18px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const TaskInputWrapper = styled.div`
  form {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;

const TaskInput = styled.input`
  padding: 12px 15px;
  width: 300px;
  border: 2px solid #1f2937;
  border-radius: 10px;
  outline: none;
  font-size: 1.1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #f97316;
  }
`;

const AddButton = styled.button`
  background-color: #f97316;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fb923c;
  }
`;

const TaskList = styled.ul`
  position: relative;
  list-style-type: none;
  padding: 0;
  li {
    background-color: #ffffff;
    padding: 15px 20px;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    font-size: 1.3rem;
    width: 650px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: box-shadow 0.3s;
    max-width: 90vw;
    overflow-y: hidden;
    &:hover {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .btns {
      display: flex;
      gap: 10px;
      position:absolute;
      right: 10px;
    }
  }
`;

const EditButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

const DeleteButton = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dc2626;
  }
`;

const EditModal = styled.div`
  #editBtns{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 350px;

  input {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 2px solid #1f2937;
    border-radius: 10px;
    outline: none;
    font-size: 1rem;

    &:focus {
      border-color: #34d399;
    }
  }
`;

const UpdateButton = styled.button`
  background-color: #34d399;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #10b981;
  }
`;

const CancelButton = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #dc2626;
  }
`;

