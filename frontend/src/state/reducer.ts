import {ActionType} from 'typesafe-actions';
import * as actions from "./actions";
import {Person, Request, User} from "./index";
import {combineReducers} from "redux";
import {ActionTypes} from "./actions";

const user = (state: User | null = null, action: ActionType<typeof actions>) => {
    switch (action.type) {
        case ActionTypes.UPDATE_USER:
            return action.payload;
        default:
            return state;
    }
};

const people = (state: Array<Person> = [], action: ActionType<typeof actions>) => {
    switch (action.type) {
        case ActionTypes.UPDATE_PEOPLE:
            return action.payload;
        default:
            return state;
    }
};

const requests = (state: Array<Request> = [], action: ActionType<typeof actions>) => {
    switch (action.type) {
        case ActionTypes.UPDATE_REQUESTS:
            return action.payload;
        default:
            return state;
    }
};

export const reducer = combineReducers({ user, people, requests });
