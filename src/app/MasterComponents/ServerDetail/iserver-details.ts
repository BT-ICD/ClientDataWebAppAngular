export interface IServerDetail {
    serverId:number,
    name:string,
    serverTypeId:number,
    serverTypeName:string,
    internalIP:string,
    externalIP:string,
    urlToAccess:string,
    notes:string  
}
export interface IServerListResolved{
    serverList:IServerDetail[],
    error?:any
}
export interface IServerDetailResolved{
    serverDetail:IServerDetail,
    error?:any
}
export interface IServerDTOFORLOV{
    serverId:number,
    name:string
}
export interface IServerDTOForLOVListResolved{
    serverListForLOV:IServerDTOFORLOV[],
    error?:any
}
