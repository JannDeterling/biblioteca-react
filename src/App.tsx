import React from 'react';
import './App.css';
import {Menu} from "./components/menu/Menu";
import {BookList} from "./containers/books/BookList";
import {Route, Router, Switch} from "react-router-dom";
import {Home} from "./containers/home/Home";
import {Login, UserInformation} from "./components/login/Login";
import history from "./History";
import {BookListToCheckout} from "./containers/books/BookListToCheckout";
import {BookListToReturn} from "./containers/books/BookListToReturn";
import {UserService} from "./services/UserService";

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {isLoggedIn: false};

        this.subscribeToLogInState = this.subscribeToLogInState.bind(this);
        UserService.registerSubscriber(this.subscribeToLogInState);
    }

    private subscribeToLogInState(stateChange: UserInformation | undefined) {
        if (stateChange) {
            this.setState({isLoggedIn: stateChange.isLoggedIn});
        }
    }

    private registerCheckoutRouteWhenLoggedIn() {
        if (this.state.isLoggedIn) {
            return (
                    <Route path={"/checkout-book"} component={BookListToCheckout}/>
            );
        }
    }

    private registerReturnRouteWhenLoggedIn() {
        if (this.state.isLoggedIn) {
            return (
                <Route path={"/return-book"} component={BookListToReturn}/>
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
                        <Route path={"/books"} component={BookList}/>
                        {this.registerCheckoutRouteWhenLoggedIn()}
                        {this.registerReturnRouteWhenLoggedIn()}
                        <Route render={() => <h1>We don't know this page</h1>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
