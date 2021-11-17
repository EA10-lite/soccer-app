import React from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import { AccountCircle, Email, Lock, RemoveRedEye }  from '@material-ui/icons';

function CreateAccount() {
    const displayPassword = ()=> {
        document.querySelector(".password__area input").setAttribute('type','text')
    }
    const hidePassword = ()=> {
        document.querySelector(".password__area input").setAttribute('type','password')
    }
    return (
        <div  className="new__account">
            <form>
                <div className="form__title">
                    <h3>Create New Account </h3>
                </div>
                <div className="field">
                    <div className="username__area">
                        <AccountCircle />
                        <input type='text' placeholder="create username" required />
                    </div>
                    <div className="email__area">
                        <Email />
                        <input type="email" placeholder="enter your e-mail" required />
                    </div>
                    <div className="password__area">
                        <Lock onClick={()=> hidePassword() } />
                        <input type="password" placeholder="enter your password" required />
                        <RemoveRedEye onClick={()=> displayPassword()} />
                    </div>
                    <div className="submit__area">
                        <button type="submit"> Create Account </button>
                    </div>
                    <div className="alternative">
                        <p>Already have an account!</p>
                        <Link to="/login">
                            Click here to Login
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateAccount;
