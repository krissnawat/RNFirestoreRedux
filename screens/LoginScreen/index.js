import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const onFooterLinkPress = () => {
        console.log('www')
        return navigation.navigate('Registration')
    }
    const onLoginPress = () => {
        setLoading(true)
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        setLoading(false)
                        navigation.navigate('Home', { user: user })
                    })
                    .catch(error => {
                        setLoading(false)
                        alert(error)
                    });
            })
            .catch(error => {
                setLoading(false)
                alert(error)
            })
    }

    return (
        <View>

            <Image
                style={styles.logo}
                source={require('./../../assets/icon.png')}
            />
            <TextInput
                style={styles.input}
                placeholder='E-mail'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder='Password'
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => onLoginPress()}>
                <Text style={styles.buttonTitle}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Don't have an account? <TouchableOpacity onPress={onFooterLinkPress}><Text style={styles.footerLink}>Sign up</Text></TouchableOpacity></Text>
            </View>

        </View>
    )
}