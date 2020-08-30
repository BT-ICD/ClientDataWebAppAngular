export interface IProjectDeploymentDetail {
    projectDeploymentId:number,
    projectId:number,
    projectName:string,
    deploymentDate:Date,
    serverId:number,
    serverName:string,
    features:string,
    version:string,
    actualFileName:string,
    storeAsFileName:string,
    notes:string
}
export interface IProjectDeploymentListResolved{
    projectDeploymentList:IProjectDeploymentDetail[],
    selectedProjectId:number,
    selectedProjectName:string,
    error?:any
}
export interface IProjectDeploymentResolved{
    projectDeployment:IProjectDeploymentDetail,
    selectedProjectId:number,
    selectedProjectName:string,
    error?:any
}
export interface IProjectDeploymentAdd{
    projectId:number,
    deploymentDate:Date,
    serverId:number,
    features:string,
    version:string,
    notes:string,
    file:File
}
export interface IProjectDeploymentEdit{
    projectDeploymentId:number,
    projectId:number,
    deploymentDate:Date,
    serverId:number,
    features:string,
    version:string,
    notes:string,
    file:File
}
