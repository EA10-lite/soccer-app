export const signupActions = (newUserDetails)=> {
    return (dispatch, getState , { getFirebase, getFirestore })=> {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUserDetails.email, newUserDetails.password
        ).then((res)=>{
            res.user.sendEmailVerification();
            alert('A verification email has been sent to your email address')
            return firestore.collection('users').doc(res.user.uid).set({
                username: newUserDetails.username,
                email: newUserDetails.email,
                favorites: []
            })
        }).then((res)=>{
            dispatch({type: 'SIGNUP_SUCCESS'})
        }).catch((err)=> {
            dispatch({type: 'SIGNUP_ERROR', err})
        })
    }
}

export const loginActions = (userDetails)=> {
    return (dispatch, getState, { getFirebase  })=> {
        const firebase = getFirebase()
        firebase.auth().signInWithEmailAndPassword(
            userDetails.email, userDetails.password
        ).then((res)=>{
            dispatch({type: 'LOGIN_SUCCESS'})
        }).catch((err)=>{
            dispatch({type:'LOGIN_ERROR', err})
        })
    }
}
export const logoutActions = ()=> {
    return (dispatch, getState, { getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then((res)=> {
            dispatch({type:'LOGOUT_SUCCESS'})
        })
    }
}

export const updateProfile = (username)=> {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName : username
        }).then((res)=>{
            dispatch({type: 'PROFILE_UPDATE'})
        }).catch(err => {
            dispatch({type :'UPDATE_FAILED'})
        })
    }
};
export const deletAccount = ()=> {
    return (dispatch, getState, { getFirebase, getFirestore })=> {
        dispatch({type:'ACCOUNT_DELETE'})
    }
}

export const verifyEmail = ()=> {
    return (dispatch, getState , {getFirebase})=>{
        const firebase = getFirebase()
        const user = firebase.auth().currentUser;
        console.log(user);
        if(user.emailVerified){
            dispatch({type:'VERIFICATION_SUCCESS'})
        } else {
            dispatch({type:'VERIFICATION_FAILED'})
        }
    }
}