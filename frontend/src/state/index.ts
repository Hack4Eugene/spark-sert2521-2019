import {createStore} from "redux";
import {reducer} from "./reducer";

export interface AppState {
    user: User
    people: Array<Person>
    requests: Array<Request>
}

export interface Request {
    delivered: number
    funds: number
    itemId: number
    ordered: number
    quantity: number
    id: number
    complete: boolean
    item: Item
    person: Person
    totalPrice: number
    success: boolean
}

export interface User {
    username: string
    email: string
}

export interface Person {
    id: number
    name: string
    bio: string
    slug: string
    funds: number
}

export interface Item {
    name: string
    price: number
    id: number
}

export const store = createStore(reducer);
