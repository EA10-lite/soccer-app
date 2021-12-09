import React, { Component } from 'react';
import './Auth.css';
import { Link, withRouter} from 'react-router-dom';
import { Email, Lock, RemoveRedEye }  from '@material-ui/icons';
import { connect } from 'react-redux'
import { loginActions } from '../../store/actions/authActions';
class Login extends Component {
    state = {
        email: '',
        password :''
    }
    handleChange = (e)=> {
        this.setState({[e.target.name] : e.target.value})
    }
    handleSubmit = (e)=> {
        e.preventDefault();
        this.props.login(this.state);
        const { success } = this.props;
        if(success){
            setTimeout(() => {
                this.props.history.push()
            }, 1000);
        }
    }
    displayPassword = ()=> {
        document.querySelector(".password__area input").setAttribute('type','text')
    }
    hidePassword = ()=> {
        document.querySelector(".password__area input").setAttribute('type','password')
    }
    render(){
        const { authError, success } = this.props;
        if(success){
            setTimeout(()=>{
                this.props.history.push('/')
            },1000)
        }
        return (
            <div className="login">
                <form onSubmit={(e)=> this.handleSubmit(e)}>
                    <div className="form__title">
                        <h3> Login </h3>
                    </div>
                    <div className="field">
                        <div className="email__area">
                            <Email />
                            <input name="email" type="email" required placeholder="enter email" value={this.state.email} onChange={(e)=> this.handleChange(e)} />
                        </div>
                        <div className="password__area">
                            <Lock onClick={ this.hidePassword} />
                            <input name="password" type="password" required placeholder="enter your password" value={this.state.password} onChange={(e)=> this.handleChange(e)} />
                            <RemoveRedEye onClick={this.displayPassword} />
                        </div>
                        <div className="submit__area">
                            <button type="submit"> Login </button>
                        </div>
                        <div className="display__error">
                            {authError ? <p className="incorrect"> { authError } </p> :null }
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
}
const mapStateToProps = (state)=>{
    return {
        authError : state.auth.authError,
        success : state.auth.success
    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
        login : (userDetails)=> dispatch(loginActions(userDetails))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
