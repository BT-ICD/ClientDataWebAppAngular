export interface IServerForProjects{
    projectId:number,
    serverId:number,
    serverName:string
}
export interface IServerForProjectsResolved{
    serverList:IServerForProjects[],
    error?:any
}
