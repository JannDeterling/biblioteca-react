import * as React from "react";
import {Book, BookInformation} from "../../components/book/Book";
import "./bookList.css";
import {BookService} from "../../services/BookService";



export interface BookListState {
    books: BookInformation[];
}

export class BookList extends React.Component<any, BookListState> {

    constructor(props: any) {
        super(props);
        this.state = {
            books: []
        };

        this.subscribeToBookState = this.subscribeToBookState.bind(this);

        BookService.refreshBookInformation().then( () => {});
    }

    componentDidMount(): void {
        BookService.registerSubscriber(this.subscribeToBookState);
    }

    componentWillUnmount(): void {
        BookService.cancelSubscription(this.subscribeToBookState);
    }

    private subscribeToBookState(stateChange: BookInformation[]) {
        this.setState({books: stateChange});
    }

    buildBooks() {
        return this.state.books.map((book,index) => {
                return (<Book key={index}
                              id={book.id}
                              title={book.title}
                              description={book.description}
                              author={book.author}
                              publishedYear={book.publishedYear}
                              isCheckedOut={book.isCheckedOut}
                              img={book.img}/>)
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