import {Observer} from "../../util/Observer";
import * as React from "react";
import "./books.css";
import ReturnBookCard from "../../components/book/ReturnBookCard";
import {connect} from "react-redux";
import {Book} from "../../models/Book";
import {User} from "../../models/User";
import {CheckedOut} from "../../models/CheckedOut";

export const returnObserver: Observer<CheckedOut> = new Observer<CheckedOut>(CheckedOut.NOT_CHECKED_OUT);

interface ReturnContainerProps {
    user: User;
}

interface ReturnContainerState {
    showReturnBanner: CheckedOut;
}

class ReturnContainer extends React.Component<ReturnContainerProps, ReturnContainerState> {

    constructor(props: any) {
        super(props);

        this.state = {
            showReturnBanner: CheckedOut.NOT_CHECKED_OUT
        };
        this.subscribeToReturnObserver = this.subscribeToReturnObserver.bind(this);
    }

    componentDidMount(): void {
        returnObserver.registerSubscriber(this.subscribeToReturnObserver);
    }

    componentWillUnmount(): void {
        returnObserver.cancelSubscription(this.subscribeToReturnObserver);
    }

    buildBooks() {
        if (this.props.user.checkedOutBooks) {
            return this.props.user.checkedOutBooks.map((book: Book, index: number) => {
                    return (<ReturnBookCard key={index} userId={this.props.user.id} book={book}/>)
                }
            );
        }
    }

    private subscribeToReturnObserver(checkOutState: CheckedOut) {
        this.setState({showReturnBanner: checkOutState});
        if (checkOutState !== CheckedOut.NOT_CHECKED_OUT) {
            setTimeout(() => returnObserver.updateState(CheckedOut.NOT_CHECKED_OUT), 1200);
        }
    }

    private renderCheckOutMessage() {
        if (this.state.showReturnBanner === CheckedOut.SUCCESSFUL) {
            return <div className="alert alert-success checkout-message" role="alert">
                Returned book successfully!
            </div>;
        } else if (this.state.showReturnBanner === CheckedOut.UNSUCCESSFUL) {
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

const mapStateToProps = (state: any) => ({
    user: state.user
});

const BookReturnContainer = connect(mapStateToProps)(ReturnContainer);
export default BookReturnContainer;