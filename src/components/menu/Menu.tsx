import * as React from "react";
import {NavLink} from "react-router-dom";
import "./menu.css";
import {UserService} from "../../services/UserService";
import {connect} from "react-redux";
import {logoutUser} from "../../state-management/actions/UserActions";
import {User} from "../../models/User";

interface MenuProps {
    user: User;
    logout: (isLoggedOut: boolean) => any;
    history: any;
}

class MenuComponent extends React.Component<MenuProps, any> {

    constructor(props: any) {
        super(props);
        this.clickLogIn = this.clickLogIn.bind(this);
        this.clickLogOut = this.clickLogOut.bind(this);
    }

    private clickLogIn() {
        this.props.history.push("/login");
    }

    private clickLogOut() {
        UserService.logout(this.props.user.id).then( res => {
            this.props.logout(res);
        });
    }

    showCheckOutOption() {
        if (this.props.user.isLoggedIn) {
            return <NavLink to={"/checkout-book"} exact={true} className="nav-item nav-link"
                            activeClassName={"active"}>Checkout</NavLink>
        }
    }

    showReturnOption() {
        if (this.props.user.isLoggedIn) {
            return <NavLink to={"/return-book"} exact={true} className="nav-item nav-link"
                            activeClassName={"active"}>Return</NavLink>
        }
    }

    showCorrectUserButton() {
        if (!this.props.user.isLoggedIn) {
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

const mapStateToProps = (state: any) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
    logout: (isLoggedOut: boolean) => dispatch(logoutUser(isLoggedOut))
});

const Menu = connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
export default Menu;