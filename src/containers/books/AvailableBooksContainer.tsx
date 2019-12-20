import * as React from "react";
import {BookCard} from "../../components/book/BookCard";
import "./books.css";
import {BookService} from "../../services/BookService";
import {connect} from "react-redux";
import {updateBooks} from "../../state-management/actions/BookActions";
import {Book} from "../../models/Book";


interface AvailableBooksProps {
    books: Book[];
    updateBooks: (books: Book[]) => any;
}

class AvailableBooks extends React.Component<AvailableBooksProps, any> {

    componentDidMount(): void {
        BookService.refreshBookInformation().then(response => this.props.updateBooks(response));
    }

    buildBooks() {
        return this.props.books.map((book, index) => {
                return (<BookCard key={index} book={book}/>)
            }
        );
    }

    render() {
        return (
            <div className={"books-container"}>
                <h1>Our currently available Books</h1>
                <div className={"book-card-container"}>
                    {this.buildBooks()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    books: state.books
});

const mapDispatchToProps = (dispatch: any) => ({
    updateBooks: (books: Book[]) => dispatch(updateBooks(books))
});

const AvailableBooksContainer = connect(mapStateToProps, mapDispatchToProps)(AvailableBooks);
export default AvailableBooksContainer;
