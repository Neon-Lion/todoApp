import React, { Component } from "react";

// function Add(props) {
//     let inputRef = React.createRef();
//     // let todoTitle = inputRef.current.value;

//     function clickHandler(todoTitle) {
//         props.addTodo(inputRef.current.value);
//     }

//     return (
//         <>
//             <div className="alert feedback centerAlign"></div>
//             <div className="todo-add">
//                 <input type="text" autoFocus placeholder="Add new todo ..." ref={inputRef} />
//                 <button className="add-btn" type="button" onClick={clickHandler}>Add</button>
//             </div>
//         </>
//     );
// }

class AddTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "inputValue": ""
        }
    
        this.clearInput = this.clearInput.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    // Execute the React code when the component is already placed in the DOM
    componentDidMount(props) {
        this.props.fetchTodos()
        this.addInput.focus();
    }

    // Clear input field and focus on it for new todo
    clearInput() {
        this.setState({
           "inputValue": ""
        })
    }

    addTodo(props) {
        this.props.addTodoItem(this.state.inputValue);
        this.clearInput();
    }

    render(props) {
        return (
            <>
                <div className={`alert feedback centerAlign ${this.props.alertClass}`}>{this.props.alertMessage}</div>
                <div className="todo-add">
                    <input type="text" autoFocus placeholder="Add new todo ..."
                        ref={(input) => { this.addInput = input; }}
                        value={this.state.inputValue}
                        onChange={(e) => this.setState({"inputValue": e.target.value})}
                    />
                    <button className="add-btn" type="button" onClick={this.addTodo}>Add</button>
                </div>
            </>
        );
    }
}

export { AddTodo };