import * as React from "react";
import "./book.css";
import {UserService} from "../../services/UserService";
import {returnObserver} from "../../containers/books/BookReturnContainer";
import {updateBooks} from "../../state-management/actions/BookActions";
import {BookService} from "../../services/BookService";
import {updateUser} from "../../state-management/actions/UserActions";
import {connect} from "react-redux";
import {Book} from "../../models/Book";
import {User} from "../../models/User";
import {CheckedOut} from "../../models/CheckedOut";
import {BookCard} from "./BookCard";

interface BookToReturnProps {
    userId: number;
    book: Book;
    updateUser: (user: User) => any,
    updateBooks: (books: Book[]) => any
}

export class BookToReturnComponent extends React.Component<BookToReturnProps, any> {

    constructor(props: BookToReturnProps) {
        super(props);
        this.handleReturn = this.handleReturn.bind(this);
    }

    private handleReturn() {
        UserService.returnBook(this.props.userId, this.props.book.id).then(response => {
            if (response) {
                UserService.refreshUserInformation(this.props.userId).then(userResponse =>
                    BookService.refreshBookInformation().then(response => {
                        returnObserver.updateState(CheckedOut.SUCCESSFUL);
                        this.props.updateBooks(response);
                        if (userResponse) {
                            this.props.updateUser(userResponse);
                        }
                    }));
            } else {
                returnObserver.updateState(CheckedOut.UNSUCCESSFUL);
            }
        });
    }

    render() {
        return (
            <BookCard book={this.props.book}>
                <button className={"btn btn-outline-primary"} onClick={this.handleReturn}>Return</button>
            </BookCard>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    updateBooks: (books: Book[]) => dispatch(updateBooks(books)),
    updateUser: (user: User) => dispatch(updateUser(user))
});

const ReturnBookCard = connect(null, mapDispatchToProps)(BookToReturnComponent);
export default ReturnBookCard;
