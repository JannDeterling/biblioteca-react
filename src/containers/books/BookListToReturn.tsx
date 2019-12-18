import {Observer} from "../../Observer";
import {CheckedOut} from "../../components/book/BookToCheckout";
import * as React from "react";
import "./bookList.css";
import {BookToReturn} from "../../components/book/BookToReturn";
import {UserInformation} from "../../components/login/Login";
import {UserService} from "../../services/UserService";
import {BookInformation} from "../../components/book/Book";

export const returnObserver: Observer<CheckedOut> = new Observer<CheckedOut>(CheckedOut.NOT_CHECKED_OUT);

export class BookListToReturn extends React.Component<any, { isCheckedOut: CheckedOut, user: UserInformation | any }> {

    constructor(props: any) {
        super(props);

        this.state = {
            isCheckedOut: CheckedOut.NOT_CHECKED_OUT, user: {}
        };

        this.subscribeToLogInState = this.subscribeToLogInState.bind(this);
        this.subscribeToReturnObserver = this.subscribeToReturnObserver.bind(this);
    }

    componentDidMount(): void {
        UserService.registerSubscriber(this.subscribeToLogInState);
        returnObserver.registerSubscriber(this.subscribeToReturnObserver);
    }

    componentWillUnmount(): void {
        UserService.cancelSubscription(this.subscribeToLogInState);
        returnObserver.cancelSubscription(this.subscribeToReturnObserver);
    }

    buildBooks() {
        if (this.state.user.checkedOutBooks) {
            return this.state.user.checkedOutBooks.map((book: BookInformation, index: number) => {
                    return (<BookToReturn key={index} userId={this.state.user.id} book={book}/>)
                }
            );
        }
    }

    private subscribeToLogInState(stateChange: UserInformation | undefined) {
        if (stateChange) {
            this.setState({user: stateChange});
        }else {
            this.setState( {user: {}})
        }
    }

    private subscribeToReturnObserver(checkOutState: CheckedOut) {
        this.setState({isCheckedOut: checkOutState});
        if (checkOutState !== CheckedOut.NOT_CHECKED_OUT) {
            setTimeout(() => returnObserver.updateState(CheckedOut.NOT_CHECKED_OUT), 1200);
        }
    }

    private renderCheckOutMessage() {
        if (this.state.isCheckedOut === CheckedOut.SUCCESSFUL) {
            return <div className="alert alert-success checkout-message" role="alert">
                Returned book successfully!
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
                <h1>Your currently checked out books</h1>
                <div className={"book-card-container"}>
                    {this.buildBooks()}
                </div>
            </div>
        );
    }

}

