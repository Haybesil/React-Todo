import React, { useState, useEffect, Component } from 'react';
import  useAuth  from '../useauth/Useauth'
import { saveTodoList, loadTodoList } from '../todoservice/Todoservice'; // Import save and load functions
import 'firebase/firestore';

const TodoList = () => {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'
  const [sort, setSort] = useState('default'); // 'default', 'alphabetical'
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
 
  useEffect(() => {

    const loadTodos = async () => {
      if(currentUser) {
        const userId = currentUser.uid;
        const loadedTodos = await loadTodoList(userId);
        setTodos(loadedTodos);
      }
    };

    loadTodos();
  }, [currentUser]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {text: inputValue, completed: false};
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setInputValue('');

      if (currentUser) {
        const userId = currentUser.uid;
        saveTodoList(userId, [...todos, newTodo]);
      }
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const handleEditInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSaveEdit = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = editValue;
    setTodos(updatedTodos);
    setEditIndex(null);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleTodoCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'active') {
      return !todo.completed;
    } else {
      return true;
    }
  });

  const sortedTodos = [...filteredTodos];
  if (sort === 'alphabetical') {
    sortedTodos.sort((a, b) => a.text.localeCompare(b.text));
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-4">Manage your todos</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new todo..."
          className="flex-grow p-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Todo
        </button>
      </div>
      <div className="mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`mr-2 ${filter === 'all' ? 'font-bold' : ''} hover:border-b-4`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`mr-2 ${filter === 'completed' ? 'font-bold' : ''} hover:border-b-4`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`mr-2 ${filter === 'active' ? 'font-bold' : ''} hover:border-b-4`}
        >
          Active
        </button>
      </div>
      <div className="mb-4">
        <button
          onClick={() => setSort('default')}
          className={`mr-2 ${sort === 'default' ? 'font-bold' : ''} hover:border-b-4`}
        >
          Default Order
        </button>
        <button
          onClick={() => setSort('alphabetical')}
          className={`mr-2 ${sort === 'alphabetical' ? 'font-bold' : ''} hover:border-b-4`}
        >
          Alphabetical Order
        </button>
      </div>
      <ul>
        {sortedTodos.map((todo, index) => (
          <li key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoCompletion(index)}
              className="mr-2 h-4 w-4 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={handleEditInputChange}
                  className="flex-grow p-1 mr-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => handleSaveEdit(index)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  className="flex-grow"
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleEdit(index)}
                  className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                >
                  Edit
                </button>
              </>
            )}
            <button
              onClick={() => handleDeleteTodo(index)}
              className="px-2 py-1 ml-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
