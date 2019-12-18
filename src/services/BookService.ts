import {BookInformation} from "../components/book/Book";
import {Observer} from "../Observer";
import axios from "axios";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const staticBookCover = require("../containers/books/static-book-cover.jpg");

export class BookService {
    private static observer: Observer<BookInformation[]> = new Observer<BookInformation[]>([]);

    public static registerSubscriber(subscriber: (state: BookInformation[]) => void) {
        this.observer.registerSubscriber(subscriber);
    }

    public static cancelSubscription(subscriber: (state: BookInformation[]) => void) {
        this.observer.cancelSubscription(subscriber);
    }

    public static stopService(){
        source.cancel();
    }

    public static async refreshBookInformation(): Promise<void> {
        return axios.get<BookInformation[]>("http://localhost:8080/books", {
            cancelToken: source.token
        }).then(response => {
            this.observer.updateState(this.mapBookInformation(response.data));
        }).finally( () => Promise.resolve());
    }

    private static mapBookInformation(books: BookInformation[]): BookInformation[] {
        return books.map(book => {
            return {
                id: book.id,
                title: book.title,
                author: book.author,
                description: book.description,
                img: staticBookCover,
                publishedYear: book.publishedYear,
                isCheckedOut: book.isCheckedOut
            }
        });
    }
}