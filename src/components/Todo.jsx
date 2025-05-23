import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';

const Todo = () => {
  const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
  const inputRef = useRef();

  const add = () => {

    const inputText = inputRef.current.value.trim();

    if (inputText === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 max-w-2xl mx-auto flex flex-col p-5 sm:p-6 md:p-8 min-h-[500px] rounded-xl shadow-lg transition-all duration-300">
      
      {/* ------------------Title-------------- */}
      <div className="flex items-center mt-4 gap-3">
        <img className="w-7 sm:w-8" src={todo_icon} alt="Todo Icon" />
        <h1 className="text-black text-2xl sm:text-3xl font-bold">To-Do List</h1>
      </div>

      {/* -------------------------------Input Area---------------------------------- */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center my-6 gap-3">
        <input
          ref={inputRef}
          className="text-black bg-gray-100 rounded-full border border-gray-300 outline-none flex-1 h-12 px-4 placeholder:text-slate-500"
          type="text"
          placeholder="Add Your Task"
        />
        <button
          onClick={add}
          className="text-white text-base sm:text-lg font-medium rounded-full bg-black px-5 h-12 hover:bg-gray-800 transition-all"
        >
          Add +
        </button>
      </div>

      {/* ---------Todo List----------- */}
      <div className="flex flex-col gap-4">
        {todoList.map((item) => (
          <TodoItems
            key={item.id}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
