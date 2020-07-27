import {
    REGISTER_FETCHING,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
} from "../constant";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
export const setRegisterStateToFetching = () => ({
    type: REGISTER_FETCHING,
});

export const setRegisterStateToFailed = () => ({
    type: REGISTER_FAILED,
});

export const setRegisterStateToSuccess = (payload) => ({
    type: REGISTER_SUCCESS,
    payload,
});

export const Register = (email, password, fullName) => {
    return async (dispatch) => {
        dispatch(setRegisterStateToFetching())
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                dispatch(setRegisterStateToSuccess(data))
                const usersRef = firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', { user: data })
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                dispatch(setRegisterStateToFailed())
                alert(error)
            });
    }
}