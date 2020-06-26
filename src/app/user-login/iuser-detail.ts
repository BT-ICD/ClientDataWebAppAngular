export interface IUserDetail {
    username:string
}
export interface IUserLogin{
    username:string,
    password:string
}
export interface IUserToken{
    token:string,
    expiration:Date,
    roles:string
}