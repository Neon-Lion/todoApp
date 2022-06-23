import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Header() {
	return (
		<View style={styles.header}>
			<Text>Todo App using MERNN</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		alignSelf: 'stretch',
		height: 50,
		flexDirection: 'row', // row
		backgroundColor: '#6a5acd',
		alignItems: 'center',
		justifyContent: 'center', // center, space-around
		paddingLeft: 10,
		paddingRight: 10
	}
});

export default Header;