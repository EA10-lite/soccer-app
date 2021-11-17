import React from 'react';
import './Auth.css';
import { Link } from 'react-router-dom';
import { Email, Lock, RemoveRedEye }  from '@material-ui/icons';

function Login() {
    const displayPassword = ()=> {
        document.querySelector(".password__area input").setAttribute('type','text')
    }
    const hidePassword = ()=> {
        document.querySelector(".password__area input").setAttribute('type','password')
    }
    return (
        <div className="login">
            <form>
                <div className="form__title">
                    <h3>Login</h3>
                </div>
                <div className="field">
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
                        <button type="submit"> Login </button>
                    </div>
                    <div className="alternative">
                        <p> Don't have an account yet ? </p>
                        <Link to="/signup">
                            Click here to create new account 
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
