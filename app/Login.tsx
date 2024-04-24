import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('hautran');
    const [password, setPassword] = useState('123456');

    const handleLogin = async () => {
        try {
            const body = {
                username: username,
                password: password
            }
            const response = await axios.post('http://192.168.1.2:3000/login', body);
            //console.log('response: ', response)

            if (response.status === 200) {
                navigation.navigate('Profile')
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <KeyboardAvoidingView behavior={'position'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>ĐĂNG NHẬP</Text>
                </View>

                <Text style={{ marginBottom: 20, fontSize: 20 }}>Đăng nhập hệ thống</Text>

                <TextInput
                    style={styles.input}
                    placeholder="User Name"
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 16, textDecorationLine: 'underline', marginRight: 25 }}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.3} style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: "bold"
    },
    input: {
        width: '100%',
        height: 60,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 20,

        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: 'red',
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default LoginScreen;
