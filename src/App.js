import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import './App.css';
import mockData from './mockData'
import { act } from '@testing-library/react';
import TodoItem from './components/TodoItem';

function App() {

  const [todos, setTodos] = useState(mockData);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const [saving, setSaving] = useState(false);
  const [dueDate,setDueDate]=useState(new Date().toJSON().slice(0, 10))


  function onToDoChange(e) {
    const value = e.target.value;
    setNewTodo(value);
  }
  function onDateChange(e) {
    const value = e.target.value;
    setDueDate(value);
  }
  
  function removeTodo(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  function updateTodo(id) {
      setLoading(true);
    const newList = todos.map((todoItem) => {
      if (todoItem.id === id) {
        const updatedItem = { ...todoItem, completed: !todoItem.completed };
        return updatedItem;
      }
      return todoItem;
    });
    setTodos(newList);
    setLoading(false);
  }

  function addTodo(e) {
    e.preventDefault();
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 10000) + 1,
      title: newTodo,
      dueDate:dueDate,
      completed: false,
    };
  
    setSaving(true);
    fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setTodos(todos.concat({ ...result, id: value.id }));
        setSaving(false);
      });
  }

  useEffect(() => {
    async function fetchData() {
      // const result = await mockData;
      // act (()=>{
        //setTodos(result.slice(0, 5));
        setTodos(todos);
        setLoading(false);
      //})
      
    }
    fetchData();
  }, []);

  console.log(dueDate)

  return (
  <div className="App">
    <h1 className="header">My todo list</h1>
    {loading ? (
      'Loading'
    ) : (
      <TodoList todos={todos} removeHandler={removeTodo} updateTodo={updateTodo} />
    )}

    <div className="add-todo-form">
      {saving ? (
        'Saving'
      ) : (
        <form onSubmit={addTodo}>
          <input type="text" onChange={onToDoChange} />
          <input type="date" onChange={onDateChange} min={new Date().toJSON().slice(0, 10)} placeholder="enter date"/>
          <button type="submit">Add new todo</button>
        </form>
      )}
    </div>
  </div>
);

}

export default App;




