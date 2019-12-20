import * as React from "react";
import "./books.css";
import CheckoutBookCard from "../../components/book/CheckoutBookCard";
import {Observer} from "../../util/Observer";
import {BookService} from "../../services/BookService";
import {connect} from "react-redux";
import {updateBooks} from "../../state-management/actions/BookActions";
import {Book} from "../../models/Book";
import {User} from "../../models/User";
import {CheckedOut} from "../../models/CheckedOut";

export const checkOutObserver: Observer<CheckedOut> = new Observer<CheckedOut>(CheckedOut.NOT_CHECKED_OUT);

interface CheckoutContainerProps {
    user: User;
    books: Book[];
    updateBooks: (books: Book[]) => any;
}

interface CheckoutContainerState {
    showCheckoutBanner: CheckedOut;
}

class CheckoutContainer extends React.Component<CheckoutContainerProps, CheckoutContainerState> {

    constructor(props: any) {
        super(props);
        this.state = {
            showCheckoutBanner: CheckedOut.NOT_CHECKED_OUT
        };

        this.subscribeToCheckOutObserver = this.subscribeToCheckOutObserver.bind(this);


    }

    componentDidMount(): void {
        checkOutObserver.registerSubscriber(this.subscribeToCheckOutObserver);
        BookService.refreshBookInformation().then(response => this.props.updateBooks(response));
    }

    componentWillUnmount(): void {
        checkOutObserver.cancelSubscription(this.subscribeToCheckOutObserver);
    }

    buildBooks() {
        return this.props.books.map((book: Book, index: number) => {
                return (<CheckoutBookCard key={index} userId={this.props.user.id} book={book}/>)
            }
        );
    }

    private subscribeToCheckOutObserver(checkOutState: CheckedOut) {
        this.setState({showCheckoutBanner: checkOutState});
        if (checkOutState !== CheckedOut.NOT_CHECKED_OUT) {
            setTimeout(() => checkOutObserver.updateState(CheckedOut.NOT_CHECKED_OUT), 1200);
        }
    }

    private renderCheckOutMessage() {
        if (this.state.showCheckoutBanner === CheckedOut.SUCCESSFUL) {
            return <div className="alert alert-success checkout-message" role="alert">
                Checked out book successfully!
            </div>;
        } else if (this.state.showCheckoutBanner === CheckedOut.UNSUCCESSFUL) {
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

const mapStateToProps = (state: any) => ({
    user: state.user,
    books: state.books
});

const mapDispatchToProps = (dispatch: any) => ({
    updateBooks: (books: Book[]) => dispatch(updateBooks(books))
});

const BookCheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
export default BookCheckoutContainer;