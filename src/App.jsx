import React, { useRef, useState, useEffect } from 'react'
import { TodoList } from './components/TodoList'
import { v4 as uuidv4 } from 'uuid';

export function App() {

  const KEY = 'todoApp.todos';

  const [ todos, setTodos ] = useState([]);

  const toogleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  const todoTaskRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if(storedTodos){
      setTodos(storedTodos)
    }
  },[])

  useEffect(() => {
    localStorage.setItem(KEY,JSON.stringify(todos))
  }, [todos])

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if(task === ''){
      return
    }

    setTodos((prevTodos) => {
      return [...prevTodos, {id:uuidv4(), task, completed:false}]
    })

    todoTaskRef.current.value = null;
  }

  const handleCleanAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toogleTodo}/>
      <input ref={todoTaskRef} type="text" placeholder="Nueva tarea" />
      <button type="button" onClick={handleTodoAdd}>➕</button>
      <button type="button" onClick={handleCleanAll}>🗑️</button>
      <div>
        Te quedan {todos.filter((todo) => todo.completed!=true).length } tareas por terminar
      </div>
    </>
  )
}
