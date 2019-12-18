import * as React from "react";
import "./book.css";
import {BookInformation} from "./Book";
import {checkOutObserver} from "../../containers/books/BookListToCheckout";
import {UserService} from "../../services/UserService";

export enum CheckedOut {
    SUCCESSFUL, UNSUCCESSFUL, NOT_CHECKED_OUT
}


export class BookToCheckout extends React.Component<{ userId: number, book: BookInformation }, any> {

    constructor(props: { userId: number, book: BookInformation }) {
        super(props);
        this.handleCheckout = this.handleCheckout.bind(this);
    }

    private handleCheckout() {
        UserService.checkoutBook(this.props.userId, this.props.book.id).then(response => {
            if (response) {
                checkOutObserver.updateState(CheckedOut.SUCCESSFUL);
            } else {
                checkOutObserver.updateState(CheckedOut.UNSUCCESSFUL);
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
                    <button className={"btn btn-outline-secondary"} onClick={this.handleCheckout}>Checkout</button>
                </div>
            </div>
        );
    }
}