// import logo from './logo.svg';
// import './App.css';

import Header from "./components/Header";
import { AddTodo }    from "./components/AddTodo";
import { TodoList }   from "./components/TodoList";
import { TodosCount } from "./components/TodosCount";

const todos = [
  {'id': 1, 'title': 'Learn HTML', 'completed': false},
  {'id': 2, 'title': 'Learn CSS', 'completed': false},
  {'id': 3, 'title': 'Learn JavaScript', 'completed': false}
];

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <div className="page">
      <Header />
      <main className="todo-app">
        <AddTodo />
        <TodoList />
        <TodosCount />
      </main>
    </div>
  );
}

export {App, todos};