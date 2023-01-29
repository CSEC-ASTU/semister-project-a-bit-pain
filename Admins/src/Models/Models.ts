export interface Ilaptop{
    ID:string;
    brand:string;
    name:string;
    ram:string;
    display:string;
    storagessd:string;
    storagehdd:string;
    cpuprocessor:string;
    cpugeneration:string;
    graphicscardname:string;
    graphicscardsize:string;
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
    name:string;
    ram:string;
    storage:string;
    color:string;
    screensize:string;
    camerafront:string;
    cameraback:string;
    price:string;
    description:string;
    types:string;
    isdeleted:string;
}
export interface Itv{
    ID:string;
    brand:string;
    name:string;
    screensize:string;
    displaytechnology:string;
    resolution:string;
    refreshrate:string;
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
    usertype:string;
    management:boolean;
    cartoptions:boolean;
}
export interface Iimages{

}
export interface Notifications{
    message:string;
    color:any;
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

