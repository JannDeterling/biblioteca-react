import * as React from "react";
import {NavLink} from "react-router-dom";
import "./menu.css";
import {UserInformation} from "../login/Login";
import {UserService} from "../../services/UserService";

export class Menu extends React.Component<any, {user: UserInformation} | any> {

    constructor(props: any) {
        super(props);
        this.state = {};

        this.clickLogIn = this.clickLogIn.bind(this);
        this.clickLogOut = this.clickLogOut.bind(this);
        this.subscribeToLogInState = this.subscribeToLogInState.bind(this);

    }

    componentDidMount(): void {
        UserService.registerSubscriber(this.subscribeToLogInState);
    }

    componentWillUnmount(): void {
        UserService.cancelSubscription(this.subscribeToLogInState);
    }

    private subscribeToLogInState(stateChange: UserInformation | undefined) {
        if (stateChange) {
            this.setState({user: stateChange});
        } else {
            this.setState({ user: {}});
        }
    }

    private clickLogIn() {
        this.props.history.push("/login");
    }

    private clickLogOut() {
        UserService.logout(this.state.user.id);
    }

    showCheckOutOption() {
        if (this.state.user && this.state.user.isLoggedIn) {
            return <NavLink to={"/checkout-book"} exact={true} className="nav-item nav-link"
                            activeClassName={"active"}>Checkout</NavLink>
        }
    }

    showReturnOption() {
        if (this.state.user && this.state.user.isLoggedIn) {
            return <NavLink to={"/return-book"} exact={true} className="nav-item nav-link"
                            activeClassName={"active"}>Return</NavLink>
        }
    }

    showCorrectUserButton() {
        if (this.state.user && !this.state.user.isLoggedIn) {
            return <NavLink to={"/login"} exact={true} className="btn btn-outline-success biblioteca-login-btn"
                            type="button" onClick={this.clickLogIn}>Log in</NavLink>;
        }
        return <button className="btn btn-outline-success biblioteca-login-btn" type="button"
                       onClick={this.clickLogOut}>Log out</button>;
    }

    render() {
        return (
            <header className={"biblioteca-header"}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink to={"/"} exact={true} className="navbar-brand">Biblioteca</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse biblioteca-nav" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink to={"/"} exact={true} className="nav-item nav-link"
                                     activeClassName={"active"}>Home <span
                                className="sr-only">(current)</span></NavLink>
                            <NavLink to={"/books"} exact={true} className="nav-item nav-link"
                                     activeClassName={"active"}>Books</NavLink>
                            {this.showCheckOutOption()}
                            {this.showReturnOption()}

                        </div>
                        <form className="form-inline">
                            {this.showCorrectUserButton()}
                        </form>
                    </div>
                </nav>
            </header>
        );
    }
}