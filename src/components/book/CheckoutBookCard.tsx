import * as React from "react";
import "./book.css";
import {checkOutObserver} from "../../containers/books/BookCheckoutContainer";
import {UserService} from "../../services/UserService";
import {updateBooks} from "../../state-management/actions/BookActions";
import {updateUser} from "../../state-management/actions/UserActions";
import {connect} from "react-redux";
import {BookService} from "../../services/BookService";
import {Book} from "../../models/Book";
import {User} from "../../models/User";
import {CheckedOut} from "../../models/CheckedOut";
import {BookCard} from "./BookCard";


interface CheckoutBookProps {
    userId: number;
    book: Book;
    updateUser: (user: User) => any,
    updateBooks: (books: Book[]) => any
}

class CheckoutBook extends React.Component<CheckoutBookProps, any> {

    constructor(props: CheckoutBookProps) {
        super(props);
        this.handleCheckout = this.handleCheckout.bind(this);
    }

    private handleCheckout() {
        UserService.checkoutBook(this.props.userId, this.props.book.id).then(response => {
            if (response) {
                UserService.refreshUserInformation(this.props.userId).then(userResponse =>
                    BookService.refreshBookInformation().then(response => {
                        checkOutObserver.updateState(CheckedOut.SUCCESSFUL);
                        if (userResponse) {
                            this.props.updateUser(userResponse);
                        }
                        this.props.updateBooks(response)
                    }));
            } else {
                checkOutObserver.updateState(CheckedOut.UNSUCCESSFUL);
            }
        });
    }


    render() {
        return (
            <BookCard book={this.props.book}>
                <button className={"btn btn-outline-secondary"} onClick={this.handleCheckout}>Checkout</button>
            </BookCard>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    updateBooks: (books: Book[]) => dispatch(updateBooks(books)),
    updateUser: (user: User) => dispatch(updateUser(user))
});

const CheckoutBookCard = connect(null, mapDispatchToProps)(CheckoutBook);
export default CheckoutBookCard;


