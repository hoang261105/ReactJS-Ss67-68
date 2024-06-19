import { ActionBooks, Books } from "../../model/Book";

const bookLocal: Books[] = JSON.parse(localStorage.getItem("listBooks") || "[]")

const bookReducer = (state = bookLocal, action: ActionBooks) => {
    switch (action.type) {
        case "ADD":
            return [...state, action.payload]
        case "DELETE":
            return state.filter((book) => book.id !== action.payload.id)
            
    
        default:
            return state
    }
}

export default bookReducer