import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class TodosCount extends Component {
    render(props) {
        return (
            <View>
                <Text style={styles.totalTodos}>Total items: {this.props.todos.length}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    totalTodos: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        backgroundColor: '#6a5acd'
    }
});

export { TodosCount };