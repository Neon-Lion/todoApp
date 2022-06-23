import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

import Tasks from "./components/Tasks";
import Header from "./components/Header";
import { AddTodo }    from "./components/AddTodo";
import { TodoList }   from "./components/TodoList";
import { TodosCount } from "./components/TodosCount";
import { LinearGradient } from 'expo-linear-gradient';

class App extends Tasks {
	constructor() {
		super();
					
		this.state = {
			tasks: [],
			currentTask: "",

			alertMessage: "",
			alertType: "",
			showItem: false,
			alertClass: ""
		};
	}

	render() {
		return (
			<LinearGradient
				// Background Linear Gradient
				colors={['rgb(0, 255, 231)', 'rgb(58, 123, 213)']}
			>
			<View style={styles.container}>
				<StatusBar style="auto" />

				<Header />
				<AddTodo
					currentTask  = {this.state.currentTask}
					handleChange = {this.handleChange}
					handleAdd    = {this.handleAdd}
					showItem	 = {this.state.showItem}
					alertClass   = {this.state.alertClass}
					alertMessage = {this.state.alertMessage}
				/>
				<TodoList todos = {this.state.tasks} handleToggleCompleted = {this.handleToggleCompleted} handleEdit = {this.handleEdit} handleDelete = {this.handleDelete} />
				<TodosCount todos = {this.state.tasks} />
			</View>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});

export default App;