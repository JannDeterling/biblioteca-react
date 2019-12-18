import * as React from "react";
import "./book.css";


export interface BookInformation {
    id: number;
    title: string;
    author: string;
    description: string;
    img: string;
    publishedYear: string
    isCheckedOut: boolean;
}

export class Book extends React.Component<BookInformation, any> {
    render() {
        return (
            <div className={"card book-card"}>
                <img src={this.props.img} className="card-img-top" alt="Test"/>
                <div className={"card-body"}>
                    <h5 className={"card-title"}>
                        {this.props.title}
                    </h5>
                    <p className={"card-text"}>
                        {this.props.description}
                    </p>
                </div>
            </div>
        );
    }
}