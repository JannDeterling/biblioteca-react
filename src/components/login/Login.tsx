import * as React from "react";
import "./login.css";
import {UserService} from "../../services/UserService";
import {loginUser} from "../../state-management/actions/UserActions";
import {connect} from "react-redux";
import {User} from "../../models/User";

interface LoginState {
    username: string;
    password: string;
}

class LoginComponent extends React.Component<any, LoginState> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    handleLogIn(event: any) {
        event.preventDefault();
        UserService.login(this.state.username, this.state.password).then( response => {
            this.props.loginUser(response);
            if (response) this.props.history.push("/");
        });
    }

    handleUsernameChange(event: any) {
        this.setState({username: event.target.value, password: this.state.password});
    }

    handlePasswordChange(event: any) {
        this.setState({password: event.target.value, username: this.state.username});
    }

    render() {
        return (
            <div className={"login-container"}>
                <h1>Login to Biblioteca</h1>
                <form onSubmit={this.handleLogIn}>
                    <div className="form-group row">
                        <label htmlFor="username" className={"col-sm-2 col-form-label"}>Username</label>
                        <div className="col-sm-10">
                            <input id="username" type="text" autoComplete="username" value={this.state.username}
                                   onChange={this.handleUsernameChange} className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className={"col-sm-2 col-form-label"}>Password</label>
                        <div className="col-sm-10">
                            <input id="password" type="password" autoComplete="current-password" value={this.state.password}
                                   onChange={this.handlePasswordChange} className="form-control"/>
                        </div>
                    </div>
                    <input type="submit" value="Log in" className={"btn btn-success"}/>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    loginUser: (user: User) => dispatch(loginUser(user))
});

const Login = connect(null, mapDispatchToProps)(LoginComponent);
export default Login;