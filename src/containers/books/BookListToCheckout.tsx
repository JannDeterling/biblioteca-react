import * as React from "react";
import "./bookList.css";
import {BookToCheckout, CheckedOut} from "../../components/book/BookToCheckout";
import {Observer} from "../../Observer";
import {UserInformation} from "../../components/login/Login";
import {BookInformation} from "../../components/book/Book";
import {UserService} from "../../services/UserService";
import {BookService} from "../../services/BookService";

export const checkOutObserver: Observer<CheckedOut> = new Observer<CheckedOut>(CheckedOut.NOT_CHECKED_OUT);

export class BookListToCheckout extends React.Component<any, { books: BookInformation[], user: UserInformation | any, isCheckedOut: CheckedOut }> {

    constructor(props: any) {
        super(props);
        this.state = {
            isCheckedOut: CheckedOut.NOT_CHECKED_OUT, user: {}, books: []
        };

        this.subscribeToCheckOutObserver = this.subscribeToCheckOutObserver.bind(this);
        this.subscribeToLogInState = this.subscribeToLogInState.bind(this);
        this.subscribeToBookState = this.subscribeToBookState.bind(this);

        BookService.refreshBookInformation().then( () => {});
    }

    componentDidMount(): void {
        checkOutObserver.registerSubscriber(this.subscribeToCheckOutObserver);
        UserService.registerSubscriber(this.subscribeToLogInState);
        BookService.registerSubscriber(this.subscribeToBookState);
    }

    componentWillUnmount(): void {
        checkOutObserver.cancelSubscription(this.subscribeToCheckOutObserver);
        UserService.cancelSubscription(this.subscribeToLogInState);
        BookService.cancelSubscription(this.subscribeToBookState);
    }

    private subscribeToBookState(stateChange: BookInformation[]){

        this.setState( {books: stateChange});
    }

    private subscribeToLogInState(stateChange: UserInformation | undefined) {
        if (stateChange) {
            this.setState({user: stateChange});
        }else {
            this.setState( {user: {}})
        }
    }

    buildBooks() {
        return this.state.books.map( (book, index) => {
                return (<BookToCheckout key={index} userId={this.state.user.id} book={book}/>)
            }
        );
    }

    private subscribeToCheckOutObserver(checkOutState: CheckedOut) {
        this.setState({isCheckedOut: checkOutState});
        if (checkOutState !== CheckedOut.NOT_CHECKED_OUT) {
            setTimeout(() => checkOutObserver.updateState(CheckedOut.NOT_CHECKED_OUT), 1200);
        }
    }

    private renderCheckOutMessage() {
        if (this.state.isCheckedOut === CheckedOut.SUCCESSFUL) {
            return <div className="alert alert-success checkout-message" role="alert">
                Checked out book successfully!
            </div>;
        } else if (this.state.isCheckedOut === CheckedOut.UNSUCCESSFUL) {
            return <div className="alert alert-danger checkout-message" role="alert">
                Something went wrong!
            </div>
        } else {
            return;
        }
    }

    render() {
        return (
            <div className={"books-container"}>
                {this.renderCheckOutMessage()}
                <h1>Our currently available Books for you</h1>
                <div className={"book-card-container"}>
                    {this.buildBooks()}
                </div>
            </div>
        );
    }

}