export interface IProjectServerType {
    projectServerMappingId:number,
    projectId:number,
    projectName:string,
    serverId:number,
    serverName:string,
    actualServerType:string,
    deployedServerTypeId:number,
    deployedAsServerType:string,
    urlToAccess:string,
    deployedLocation:string,
    appLogLocation:string,
    databaseServerName:string,
    dbServerID:number,
    dbName:string,
    notes:string
}
export interface IProjectServerListResolved{
    projectServerList:IProjectServerType[],
    selectedProjectId:number,
    selectedProjectName:string,
    error?:any
}
export interface IProjectServerDetailResolved{
    projectServerDetail:IProjectServerType,
    error?:any
}