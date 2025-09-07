import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const Button = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007aff',
        marginVertical: 20,
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    }
})