import { combineReducers, createStore } from "redux"
import bookReducer from "./reducer/bookReducer"

const rootReducer = combineReducers({
    bookReducer
})

const combineReducer = createStore(rootReducer)

export default combineReducer