import React, {Component} from "react";

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
    }

    clickHandler = (props) => {
        this.props.addTodo(this.state.inputValue)
        // alert(this.state.inputValue);
    }

    render() {
        return (
            <>
                <div className="alert feedback centerAlign"></div>
                <div className="todo-add">
                    <input type="text" autoFocus placeholder="Add new todo ..." value={this.state.inputValue} onChange={(e) => this.setState({"inputValue": e.target.value})} />
                    <button className="add-btn" type="button" onClick={this.clickHandler}>Add</button>
                </div>
            </>
        );
    }
}

export { AddTodo };