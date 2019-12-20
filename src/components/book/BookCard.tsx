import * as React from "react";
import "./book.css";
import {Book} from "../../models/Book";

interface BookCardProps {
    book: Book;
    children?: any;
}

export class BookCard extends React.Component<BookCardProps, any> {
    render() {
        return (
            <div className={"card book-card"}>
                {this.renderImage()}
                <div className={"card-body"}>
                    <h5 className={"card-title"}>
                        {this.props.book.title}
                    </h5>
                    <h6>{this.props.book.author}&nbsp;{this.props.book.publishedYear}</h6>
                    {this.renderDescription()}
                    {this.props.children}
                </div>
            </div>
        );
    }

    private renderDescription() {
        if (this.props.book.description === ""){
            return <p className="card-text">
                We are sorry, currently we don't provide a good description for this book!
                But we are working on writing one!
            </p>;
        }
        return <p className={"card-text"}>
            {this.props.book.description}
        </p>;
    }

    private renderImage() {
        if (this.props.book.image === "no-image"){
            return <span className="book-card-img">
                <h3>No cover available at the moment!</h3>
            </span>
        }
        return <img src={this.props.book.image} className="card-img-top book-card-img" alt="Test"/>;
    }
}