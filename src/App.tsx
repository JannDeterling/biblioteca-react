import React from 'react';
import './App.css';
import Menu from "./components/menu/Menu";
import AvailableBooksContainer from "./containers/books/AvailableBooksContainer";
import {Route, Router, Switch} from "react-router-dom";
import {Home} from "./components/home/Home";
import Login from "./components/login/Login";
import history from "./util/History";
import BookCheckoutContainer from "./containers/books/BookCheckoutContainer";
import BookReturnContainer from "./containers/books/BookReturnContainer";
import {connect} from "react-redux";

class AppComponent extends React.Component<any, any> {

    private registerCheckoutRouteWhenLoggedIn() {
        if (this.props.user.isLoggedIn) {
            return (
                <Route path={"/checkout-book"} component={BookCheckoutContainer}/>
            );
        }
    }

    private registerReturnRouteWhenLoggedIn() {
        if (this.props.user.isLoggedIn) {
            return (
                <Route path={"/return-book"} component={BookReturnContainer}/>
            );
        }
    }

    render() {
        return (
            <Router history={history}>
                <div className="App">
                    <Menu history={history}/>
                    <Switch>
                        <Route path={"/"} exact component={Home}/>
                        <Route path={"/login"} exact component={Login}/>
                        <Route path={"/books"} component={AvailableBooksContainer}/>
                        {this.registerCheckoutRouteWhenLoggedIn()}
                        {this.registerReturnRouteWhenLoggedIn()}
                        <Route render={() => <h1>We don't know this page</h1>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user
});

const App = connect(mapStateToProps)(AppComponent);
export default App;
