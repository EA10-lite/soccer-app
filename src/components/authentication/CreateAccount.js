import React, { Component } from 'react';
import './Auth.css';
import { Link, withRouter } from 'react-router-dom';
import { AccountCircle, Email, Lock, RemoveRedEye }  from '@material-ui/icons';
import { connect }  from 'react-redux';
import { signupActions, updateProfile } from '../../store/actions/authActions';
class CreateAccount extends Component {
    state = {
        password: '',
        email : '',
        username : '',
        confirmPassword : ''
    }
    handleChange = (e)=> {
        this.setState({[e.target.name] : e.target.value})
    }
    handleSubmit = (e)=> {
        e.preventDefault();
        if((this.state.password === this.state.confirmPassword) && !this.spaceValidation(this.state.password) && this.state.password.length >= 8){
            this.props.createAccount(this.state);
        }
    }
    spaceValidation = (word)=> {
        return word.split("").includes(" ")
    }
    displayPassword = ()=> {
        document.querySelector(".password__area input").setAttribute('type','text')
    }
    displayConfirmPassword = ()=> {
        document.querySelector(".confirm input").setAttribute('type','text')
    }
    hidePassword = ()=> {
        document.querySelector(".password__area input").setAttribute('type','password')
    }
    hideConfirmPassword = ()=> {
        document.querySelector(".confirm input").setAttribute('type','password')
    }
    render(){
        const { authError, success, signedUpMessage } = this.props;
        if(success){
            setTimeout(() => {
                this.props.updateProfile(this.state.username);
                this.props.history.push('/login');
            }, 1000);
        }

        return (
            <div className="new__account">
                <form onSubmit={(e)=> this.handleSubmit(e)}>
                    {signedUpMessage && (
                        <div className="verify__message">
                            <p> { signedUpMessage } </p>
                        </div>
                    )}
                    <div className="form__title">
                        <h3> Create New Account</h3>
                    </div>
                    <div className="field">
                        <div className="username__area">
                            <AccountCircle />
                            <input name="username" type="text" placeholder="enter username" required onChange={(e)=> this.handleChange(e)} value={this.state.username} />
                        </div>
                        <div className="email__area">
                            <Email />
                            <input name="email" type="email" placeholder="enter email" required onChange={(e)=> this.handleChange(e)} value={this.state.email} />
                        </div>
                        <div className="password__area">
                            <Lock onClick={this.hidePassword} />
                            <input name="password" type="password" placeholder="enter password" onChange={(e)=> this.handleChange(e)} value={this.state.password} required />
                            <RemoveRedEye onClick={this.displayPassword} />
                        </div>
                        <div className="validate">
                            <div className="length__validation">
                                {this.state.password && (
                                    <p className={this.state.password.length >= 8 ? 'correct' : 'incorrect'}> Minimum character is 8 </p>
                                )}
                            </div>
                            <div className="spaces__validation">
                                {this.statepassword && this.spaceValidation(this.state.password) === true ? (
                                    <p className="incorrect"> Password cannot contain spaces </p>
                                ) : this.state.password ? (
                                    <p className="correct"> Password does not contain spaces</p>
                                ) : null }
                            </div>
                        </div>
                        <div className="password__area confirm">
                            <Lock onClick={this.hideConfirmPassword} />
                            <input name="confirmPassword" type="password" placeholder="enter password" onChange={(e)=> this.handleChange(e)} value={this.state.confirmPassword} required />
                            <RemoveRedEye onClick={this.displayConfirmPassword} />
                        </div>
                        {(this.state.password || this.state.confirmPassword) && this.state.password !== this.state.confirmPassword? (
                        <p className="incorrect"> Password Mismatch </p>
                        ) : this.state.password &&  this.state.password === this.state.confirmPassword ? (
                        <p className="correct"> Correct Password </p>
                        ) : ''}
                        <div className="submit__area">
                            <button type="submit"> Create Account </button>
                        </div>
                        <div className="display__error">
                            {authError ? <p className="incorrect"> { authError } </p>  : null }
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
}
const mapStateToProps = (state)=> {
    return {
        authError : state.auth.authError,
        success : state.auth.success,
        emailVerified: state.auth.emailVerified,
    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
        createAccount : (newUserDetails)=> dispatch(signupActions(newUserDetails)),
        updateProfile : (details)=> dispatch(updateProfile(details))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateAccount));


