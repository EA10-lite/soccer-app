export const followClub = (details)=> {
    return (dispatch, getState, {getFirestore, getFirebase })=> {
        const firebase = getFirebase()
        const user = firebase.auth().currentUser;
        const firestore = getFirestore();
        firestore.collection('users').doc(user.uid).update({
            favorites: firebase.firestore.FieldValue.arrayUnion({
                id: details.id,
                name: details.name,
                logo: details.logo
            })
        }).then(()=> {
            dispatch({type:'FOLLOWING_SUCCESS'})
        }).catch(err => {
            dispatch({type:'FOLLOWING_ERROR', err})
        })
    }
}

export const getFirestoreData = (id)=>{
    return (dispatch,getState, { getFirestore, getFirebase })=>{
        const firestore = getFirestore();
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        firestore.collection('users').doc(user.uid).get().then((doc)=>{
            if(doc.exists){
                const data = doc.data()
                data.favorites.forEach((el,i)=>{
                    if(el.id === parseInt(id)){
                        console.log("Lets fetch now")
                        console.log(el);
                        return dispatch({type:'DOC_GOTTEN'})
                    }
                })
            }
        }).catch((err)=> {
            dispatch({type:'FAILED_TO_FETCH_DOC', err})
        })
    }
}
