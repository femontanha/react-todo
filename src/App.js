import React, { useState } from 'react';
import cx from 'classnames';
import './App.css';

function Todo({ todo, index, completeTodo }) {
  const css = cx('todo', { 'is-done': todo.isCompleted });

  return (
    <div className={ css } onClick={ () => completeTodo(index, todo.isCompleted) } >
      { todo.text }
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [ value, setValue ] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form className="form" onSubmit={ handleSubmit }>
      <input
        type="text"
        className="form__input"
        value={ value }
        onChange={ e => setValue(e.target.value) }
        placeholder='Add todo...'
      />
    </form>
  );
}

function TodoCount({ todos }) {
  const count = todos.reduce((accum, todo) => (todo.isCompleted ? accum : accum + 1), 0);

  return (
    <div className="count">{count} task(s)</div>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: 'Minha primeira task',
    },
    {
      text: 'Minha segunda task',
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  }

  const completeTodo = (index, isCompleted) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !isCompleted;
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <TodoCount todos={ todos }/>
      <TodoForm addTodo={ addTodo } />
      {todos.map((todo, index) => (
        <Todo
          key={ index }
          index={ index }
          todo={ todo }
          completeTodo={ completeTodo }
        />
      ))}
    </div>
  );
}

export default App;
