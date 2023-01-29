import { Ilaptop,ILaptopActionModel } from "../Models/Models";
import { Itv,ITvActionModel } from "../Models/Models";
import { Iphone,IPhoneActionModel } from "../Models/Models";
import { Iaccessories,IAccessoriesActionModel,Notifications } from "../Models/Models";
import { Ibook,IBookActionModel } from "../Models/Models";
import { Iuserautorization,IUserAutorizationACtionModel } from "../Models/Models";
import { ADD_LAPTOP,ADD_ACCESSORIES, ADD_BOOK, ADD_IMAGES, ADD_PHONE, ADD_TV, ADD_USER_AUTORIZATION, ADD_ALL,NOTIFICATION_TYPES,NOTIFICATION } from "./ActionTypes";
const initialState:Ilaptop[]=[];
const initialStates:Iphone[]=[];
const initialStatess:Itv[]=[];
const initialStatesss:Iaccessories[]=[];
const initialStatebook:Ibook[]=[];
const initialStateall = {
    allitems:[],
}
const initialStateuser:Iuserautorization={
    userlogged:false,
    usertype: "notlogged",
    management: false,
    cartoptions: false,
};
const initialStateNotification:Notifications = {
    message:"",
    color:"",
}

const laptopReducers = (state=initialState, action:ILaptopActionModel) => {
    const {type, payload} = action;
    switch(type){
        case ADD_LAPTOP:
            return [...state,payload];
        default:
            return state;
    };
};

export const phoneReducers = (state=initialStates, action:IPhoneActionModel) => {
    const {type, payload} = action;
    switch(type){
        case ADD_PHONE:
            return [...state,payload];
        default:
            return state;
    };
};

export const tvReducers = (state=initialStatess, action:ITvActionModel) => {
    const {type,payload} = action;
    switch(type){
        case ADD_TV:
            return [...state,payload];
        default:
            return state;
    };
};

export const accessoriesReducers = (state=initialStatesss, action:IAccessoriesActionModel) => {
    const {type,payload} = action;
    switch(type){
        case ADD_ACCESSORIES:
            return [...state,payload];
        default:
            return state;
    };
};

export const bookReducers = (state=initialStatebook, action:IBookActionModel) => {
    const {type,payload} = action;
    switch(type){
        case ADD_BOOK:
            return [...state,payload];
        default:
            return state;
    };
};

export const allitems = (state=initialStateall, action:any) => {
    const {type,payload} = action;
    switch(type){
        case ADD_ALL:
            return {...state, allitems:action.payload};
        default:
            return state;
    }
}

export const userReducer = (state=initialStateuser, action:IUserAutorizationACtionModel) => {
    const {type,payload} = action;
    switch(type){
        case ADD_USER_AUTORIZATION:
            return payload;
        default:
            return state;
    }
}
export const notificationmessage = (state=initialStateNotification,action:any) => {
    const {type,payload} = action;
    switch(type){
        case NOTIFICATION:
            return payload;
        default:
            return state;
    }
}
export default laptopReducers;