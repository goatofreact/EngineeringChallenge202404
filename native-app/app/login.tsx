import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, Text as RNText, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import { useState } from 'react';
import { login, signUp, logout } from '../data/utils';
import { useRecoilState, atom } from 'recoil';
import { Link } from 'expo-router';


const sessionState = atom({
    key: 'session', // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
});

export default function LoginScreen() {
    const [session, setSession] = useRecoilState(sessionState)
    const [username, setUsername] = useState('');
    const [passwword, setPassword] = useState('');

    const [usernameSign, setUsernameSign,] = useState('');
    const [passwwordSign, setPasswordSign] = useState('');


    function handleChangeUsername(text: string) {
        setUsername(text);
    }
    function handleChangePassword(text: string) {
        setPassword(text);
    }

    function handleChangeUseranemSign(text: string) {
        setUsernameSign(text);
    }
    function handleChangePasswordSign(text: string) {
        setPasswordSign(text);
    }



    async function handleSignUp() {
        if (usernameSign === '' || passwwordSign === '') return;
        const res = await signUp(usernameSign, passwwordSign);
        // const { session } = res as any;
        // console.log('handleSignUp', session, res)
        // setSession(session);
    }

    async function handleLogin() {
        if (username === '' || passwword === '') return;
        const res = await login(username, passwword);
        const { session } = res as any;
        setSession(session);
    }

    async function handleLogout() {
        if (!session) return;
        const res = await logout(username, passwword);
        setSession(undefined);
    }

    console.log(session)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text >Session</Text>
            <Text >{JSON.stringify(session)}</Text>
            <View
                style={styles.separator}
                lightColor='#eee'
                darkColor='rgba(255,255,255,0.1)'
            />

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <RNText>User Name</RNText>
            <TextInput
                style={styles.input}
                onChangeText={handleChangeUseranemSign}
                value={usernameSign}
                placeholder="....."
                keyboardType="default"
            />
            <RNText>Password</RNText>
            <TextInput
                style={styles.input}
                onChangeText={handleChangePasswordSign}
                value={passwwordSign}
                placeholder="......."
                keyboardType="default"
            />
            <Button title={"Sign Up"} onPress={handleSignUp} />


            <RNText>User Name</RNText>
            <TextInput
                style={styles.input}
                onChangeText={handleChangeUsername}
                value={username}
                placeholder="....."
                keyboardType="default"
            />
            <RNText>Password</RNText>
            <TextInput
                style={styles.input}
                onChangeText={handleChangePassword}
                value={passwword}
                placeholder="......."
                keyboardType="default"
            />
            <Button title={"Login"} onPress={handleLogin} />


            {session && <Button title={"Log Out"} onPress={handleLogout} />}

            <Link href={'/tabs/'}>
                <Text>Go To Home</Text>
            </Link>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    input: {

    }
});
