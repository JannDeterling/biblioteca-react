
import axios from "axios";
import {Book} from "../models/Book";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export class BookService {

    public static cancelAllRequest() {
        source.cancel();
    }

    public static async refreshBookInformation(): Promise<Book[]> {
        return axios
            .get<Book[]>("http://localhost:8080/books", {cancelToken: source.token})
            .then(response => Promise.resolve(response.data))
            .catch(() => Promise.resolve([]));
    }
}