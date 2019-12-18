import * as React from "react";
import "./book.css";
import {CheckedOut} from "./BookToCheckout";
import {BookInformation} from "./Book";
import {UserService} from "../../services/UserService";
import {returnObserver} from "../../containers/books/BookListToReturn";

export class BookToReturn extends React.Component<{ userId: number, book: BookInformation }, any>{

    constructor(props: { userId: number, book: BookInformation }) {
        super(props);
        this.handleReturn = this.handleReturn.bind(this);
    }

    private handleReturn() {
        UserService.returnBook(this.props.userId, this.props.book.id).then(response => {
            if (response) {
                returnObserver.updateState(CheckedOut.SUCCESSFUL);
            } else {
                returnObserver.updateState(CheckedOut.UNSUCCESSFUL);
            }
        });
    }


    render() {
        return (
            <div className={"card book-card"}>
                <img src={this.props.book.img} className="card-img-top" alt="Test"/>
                <div className={"card-body"}>
                    <h5 className={"card-title"}>
                        {this.props.book.title}
                    </h5>
                    <p className={"card-text"}>
                        {this.props.book.description}
                    </p>
                    <button className={"btn btn-outline-primary"} onClick={this.handleReturn}>Return</button>
                </div>
            </div>
        );
    }
}