import { Ilaptop, Iphone,Itv, Iaccessories, Ibook, Iuserautorization,Notifications } from "../Models/Models";
import { ADD_LAPTOP, ADD_PHONE, ADD_TV, ADD_ACCESSORIES, ADD_BOOK, ADD_USER_AUTORIZATION,ADD_ALL,NOTIFICATION_TYPES ,NOTIFICATION} from "./ActionTypes";

export const addLaptop = (laptop: Ilaptop) => {
    return{
        type: ADD_LAPTOP,
        payload: laptop,
    };
};

export const addPhone = (phone:Iphone) => {
    return{
        type: ADD_PHONE,
        payload:phone,
    };
};

export const addtv = (tv:Itv) => {
    return{
        type: ADD_TV,
        payload:tv,
    };
};

export const addaccessories = (accessories:Iaccessories) => {
    return{
        type: ADD_ACCESSORIES,
        payload: accessories,
    };
};

export const addbooks = (books:Ibook) => {
    return{
        type:ADD_BOOK,
        payload:books,
    };
};
export const adduserautorization = (userautorization:Iuserautorization) => {
    return{
        type:ADD_USER_AUTORIZATION,
        payload:userautorization,
    };
};

export const addall = (addall:any) => {
    return{
        type:ADD_ALL,
        payload:addall,
    }
}
export const notification = (notify:Notifications) => {
    return{
        type:NOTIFICATION,
        payload:notify,
    }
}