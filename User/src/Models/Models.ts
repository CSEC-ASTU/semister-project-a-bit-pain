export interface Ilaptop{
    ID:string;
    brand:string;
    name:string;
    ram:string;
    display:string;
    storage:string;
    cpu:string;
    graphicscard:string;
    battery:string;
    screensize:string;
    price:string;
    description:string;
    types:string;
    isdeleted:string;

}
export interface Iphone{
    ID:string;
    brand:string;
    ram:string;
    storage:string;
    operatingsystem:string;
    connectivity:string;
    color:string;
    screensize:string;
    wirlessnetwork:string;
    price:string;
    description:string;
    types:string;
    isdeleted:string;
}
export interface Itv{
    ID:string;
    brand:string;
    screensize:string;
    displaytechnology:string;
    resolution:string;
    refreshrate:string;
    modelname:string;
    connectivity:string;
    price:string;
    description:string;
    types:string;
    isdeleted:string;
}
export interface Iaccessories{
    ID:string;
    brand:string;
    name:string;
    price:string;
    description:string;
    types:string;
    isdeleted:string;
}
export interface Ibook{
    BID:string;
    UID:string;
    ID:string;
    quantity:string;
}
export interface Iuserautorization{
    userlogged:boolean;
    userid:string;
    usertype:string;
    username:string;
    firstname:string;
    lastname:string;
    email:string;
    phone:string;
}
export interface Notifications{
    message:string;
    color:any;
}
export interface Iimages{

}

export interface ILaptopActionModel{
    type:string;
    payload:Ilaptop | any;
}
export interface IPhoneActionModel{
    type:string;
    payload:Iphone | any;
}
export interface ITvActionModel{
    type:string;
    payload:Itv | any;
}
export interface IAccessoriesActionModel{
    type:string;
    payload:Iaccessories | any;
}
export interface IBookActionModel{
    type:string;
    payload:Ibook | any;
}
export interface IUserAutorizationACtionModel{
    type:string;
    payload:Iuserautorization | any;
}
