import { ActionBooks, Books } from "../../interface/Book";

// Giá trị khởi tạo ban đầu
const bookLocal: Books[] = JSON.parse(localStorage.getItem("listBooks") || "[]")

const bookReducer = (state = bookLocal, action: ActionBooks) => {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload]
        case "DELETE":
            return state.filter((book) => book.id !== action.payload.id)

        case "FILTER":
            let filterBook = state.filter((book) => book.status.toString() === action.payload);
            console.log(11111,filterBook);
            return filterBook
        case "EDIT":
            return state.map((book) =>
                book.id === action.payload.id ? action.payload : book
            );
    
        default:
            return state
    }
}

export default bookReducer