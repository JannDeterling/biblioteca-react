import * as React from "react";
import "./login.css";
import {BookInformation} from "../book/Book";
import {UserService} from "../../services/UserService";

interface LoginState {
    username: string;
    password: string;
}

export interface UserInformation {
    id: number;
    username: string;
    isLoggedIn: boolean;
    checkedOutBooks: BookInformation[];
}

export class Login extends React.Component<any, LoginState> {

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
                            <input id="username" type="text" value={this.state.username}
                                   onChange={this.handleUsernameChange} className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className={"col-sm-2 col-form-label"}>Password</label>
                        <div className="col-sm-10">
                            <input id="password" type="password" value={this.state.password}
                                   onChange={this.handlePasswordChange} className="form-control"/>
                        </div>
                    </div>
                    <input type="submit" value="Log in" className={"btn btn-success"}/>
                </form>
            </div>
        );
    }
}