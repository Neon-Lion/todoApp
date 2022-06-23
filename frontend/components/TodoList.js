import React, { Component } from "react";
import { TodoItem } from "./TodoItem";
import { View, Pressable, FlatList, StyleSheet } from "react-native";

class TodoList extends Component {
    render(props) {
        return (        
            <View style={styles.todoList}>
                <FlatList
                    keyboardShouldPersistTaps='handled'
                    data={this.props.todos}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                    renderItem = { ({item: todo}) =>
                    <Pressable>
                        <TodoItem
                            key={todo._id}
                            todo = {todo}
                            handleToggleCompleted = {this.props.handleToggleCompleted}
                            handleEdit = {this.props.handleEdit}
                            handleDelete = {this.props.handleDelete}
                        />
                    </Pressable>
                }
                keyExtractor={(todo) => todo._id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    todoList: {
        padding: 10,
        height: 450
    }
});

export { TodoList };