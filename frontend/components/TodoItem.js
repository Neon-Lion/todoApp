import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from "react-native-dialog";
import DialogInput from 'react-native-dialog-input';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editVisible: false,
            deleteVisible: false
        }

        this.showEditDialog = this.showEditDialog.bind(this);
        this.showDeleteDialog = this.showDeleteDialog.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleCancelDelete = this.handleCancelDelete.bind(this);
        this.todoText = this.todoText.bind(this);
    }

    showEditDialog() {
        this.setState({editVisible: true});
    };

    showDeleteDialog() {
        this.setState({deleteVisible: true});
    };

    handleCancelEdit() {
        this.setState({editVisible: false});
    };

    handleCancelDelete() {
        this.setState({deleteVisible: false});
    };

    todoText() {
        if(this.props.todo.completed) {
            return (<Text style={styles.completed}>{this.props.todo.title}</Text>);
        }
        else {
            return (<Text>{this.props.todo.title}</Text>);
        }
    }

    render() {
        return (
            <>
                <View data-id={this.props.todo._id} style={styles.items}>
                    <View style={styles.item}>
                        {this.todoText()}
                        <View style={styles.actionIcon}>
                            <Icon.Button
                                name="check"
                                backgroundColor="#3b5998"
                                onPress={() => this.props.handleToggleCompleted(this.props.todo._id)}
                            >
                                Complete
                            </Icon.Button>
                            <Icon.Button
                                name="edit"
                                backgroundColor="#3b5998"
                                onPress={this.showEditDialog}
                            >
                                Edit
                            </Icon.Button>
                            <Icon.Button
                                name="trash"
                                backgroundColor="#3b5998"
                                onPress={this.showDeleteDialog}
                            >
                                Delete
                            </Icon.Button>
                        </View>
                    </View>
                </View>
                
                {/* Modal for editing */}
                <DialogInput
                    isDialogVisible={this.state.editVisible}
                    title={"Edit task"}
                    message={`Edit "${this.props.todo.title}"`}
                    hintInput ={this.props.todo.title}
                    submitInput={editValue =>
                        {
                            this.props.handleEdit(this.props.todo._id, editValue);
                            this.handleCancelEdit();
                        }
                    }
                    closeDialog={this.handleCancelEdit}
                />
    
                {/* Modal for deleting */}
                <Dialog.Container visible={this.state.deleteVisible}>
                    <Dialog.Title>Delete task</Dialog.Title>
                    <Dialog.Description>
                        Do you want to delete this task? You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={this.handleCancelDelete} />
                    <Dialog.Button label="Delete" onPress={() => this.props.handleDelete(this.props.todo._id)} />
                </Dialog.Container>
            </>
        );
    }
}

const styles = StyleSheet.create({
    items: {
        paddingLeft: 16,
        backgroundColor: '#f5f5f5'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    completed: {
        textDecorationLine: 'line-through'
    }
});

export { TodoItem };