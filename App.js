
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'


import LoginScreen from './screens/LoginScreen/index'
import HomeScreen from './screens/HomeScreen'
import RegistrationScreen from './screens/RegistrationScreen'

import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator();

export default () => {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firestore().collection('users');

    auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
            console.log(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (

    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} extraData={user} />}
        </Stack.Screen>
      ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
    </Stack.Navigator>

  );
}