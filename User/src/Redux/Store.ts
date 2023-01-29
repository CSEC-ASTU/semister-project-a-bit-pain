import {combineReducers, createStore} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension'
import { Ilaptop, Iphone, Itv, Ibook, Iaccessories, Iuserautorization } from '../Models/Models';
import laptopReducers from './Reducer';
import { tvReducers } from './Reducer';
import { accessoriesReducers } from './Reducer';
import { bookReducers } from './Reducer';
import { phoneReducers } from './Reducer';
import { userReducer } from './Reducer';
import { allitems } from './Reducer';
import { addtocart } from './Reducer';
import { currentitem } from './Reducer';
import { notificationmessage } from './Reducer';
import { usernames } from './Reducer';

const reducers = combineReducers(
    {
        laptop:laptopReducers, 
        phone:phoneReducers,
        tv:tvReducers,
        accessories:accessoriesReducers,
        books:bookReducers,
        user:userReducer,
        allitems:allitems,
        addtocart:addtocart,
        currentitem:currentitem,
        notification:notificationmessage,
        usernames:usernames,
    });
export const store = createStore(reducers,composeWithDevTools());

export interface IRootStateLaptop{
    laptops:Ilaptop[];
}
export interface IRootStatePhone{
    phone:Iphone[];
}
export interface IRootStateTv{
    tv:Itv[];
}
export interface IRootStateAccessries{
    accessories:Iaccessories[];
}
export interface IRootStateBooks{
    books:Ibook[];
}
export interface IRootStateUser{
    userautorization:Iuserautorization[];
}