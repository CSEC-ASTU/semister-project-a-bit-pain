import { Ilaptop, Iphone,Itv, Iaccessories, Ibook, Iuserautorization, Notifications } from "../Models/Models";
import { ADD_LAPTOP, ADD_PHONE, ADD_TV, ADD_ACCESSORIES, ADD_BOOK, ADD_USER_AUTORIZATION,ADD_ALL,ADD_TO_CART,CURRENT_ITEM,ADD_QUANTITY,DECREASE_QUANTITY,REMOVE_ITEM, NOTIFICATION,USER_NAMES, REMOVE_ALL_CART } from "./ActionTypes";

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
export const addtocart = (addtocart:any) => {
    return{
        type:ADD_TO_CART,
        payload:addtocart,
    }
}
export const addquantity = (addquantity:any) => {
    return{
        type:ADD_QUANTITY,
        payload:addquantity,
    }
}
export const decreasequantity = (decreasequantity:any) => {
    return {
        type:DECREASE_QUANTITY,
        payload:decreasequantity,
    }
}
export const removeitem = (removeitem:any) => {
    return{
        type:REMOVE_ITEM,
        payload:removeitem,
    }
}

export const currentitem = (currentitem:any) => {
    return{
        type:CURRENT_ITEM,
        payload:currentitem,
    }
}
export const notification = (notify:Notifications) => {
    return{
        type:NOTIFICATION,
        payload:notify,
    }
}
export const usernames = (username:any) => {
    return{
        type:USER_NAMES,
        payload:username,
    }
}
export const removeallcart = (removeallcart:any) =>{
    return{
        type:REMOVE_ALL_CART ,
        payload:removeallcart,
    }
}