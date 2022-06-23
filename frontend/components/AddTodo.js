import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

class AddTodo extends Component {
    constructor(props) {
        super(props);

        this.showAlertMessage = this.showAlertMessage.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }

    // Show alert message
    showAlertMessage() {
        if(this.props.showItem) {
            return (
                <View style={styles.alert, this.props.alertClass == "showItem alert-success" ? styles.alertSuccess : styles.alertDanger}>
                    <Text style={styles.alert}>{this.props.alertMessage}</Text>
                </View>
            );
        }
        else {
            return <></>
        }
    }

    // Change input value
    changeInput(e) {
        this.props.handleChange(e)
    }

    render() {
        return (
            <View>
                {this.showAlertMessage()}
                <View className="todo-add">
                    <TextInput
                        label="Add new todo ..."
                        value={this.props.currentTask}
                        onChangeText={newTask => this.changeInput(newTask)}
                        style={styles.todoInput}
                    />
                    <Pressable style={styles.addButton} onPress={this.props.handleAdd}>
                        <Text style={styles.addText}>Add</Text>
                    </Pressable>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    todoInput: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'normal',
        height: 50,
        margin: 15,
        textAlign: 'left',
        borderColor: '#7a42f4',
        borderWidth: 1,
        borderRadius: 20
    },
    addButton: {
        margin: 15,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#6a5acd'
    },
    addText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white'
    },
    alert: { textAlign: 'center' },
    alertDanger:  { backgroundColor: "#FF0000" },
    alertSuccess: { backgroundColor: "#00ff00" }
});

export { AddTodo };