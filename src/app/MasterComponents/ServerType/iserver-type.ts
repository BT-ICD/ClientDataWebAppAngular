export interface IServerType {
}
export interface IServerTypeDTODetail{
    serverTypeId:number,
    name:string
}
//To access by Resolver 
export interface IServerTypeDTODetailListResolved{
    ServerTypeDTODetailList:IServerTypeDTODetail[],
    error?:any
}
export interface IServerTypeDTODetailResolved{
    serverTypeDTO:IServerTypeDTODetail,
    error?:any
}