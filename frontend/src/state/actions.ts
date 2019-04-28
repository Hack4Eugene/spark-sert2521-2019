import { action } from 'typesafe-actions';
import { Person, Request, User } from './index';

export enum ActionTypes {
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_PEOPLE = 'UPDATE_PEOPLE',
  UPDATE_REQUESTS = 'UPDATE_REQUESTS',
}

export const updateUser = (user: User) => action(ActionTypes.UPDATE_USER, user);
export const updatePeople = (...people: Array<Person>) => {
  return action(ActionTypes.UPDATE_PEOPLE, people);
};
export const updateRequests = (...requests: Array<Request>) =>
  action(ActionTypes.UPDATE_REQUESTS, requests);
