export interface IProjectDocumentTypes {
}
export interface IProjectDocumentDetail{
    projectDocumentMappingId:number,
    projectId:number,
    projectName:string,
    documentTypeId:number,
    documentType:string,
    actualFileName:string,
    storeAsFileName:string,
    notes:string
}
export interface IProjectDocumentListResolved{
    projectDocumentList:IProjectDocumentDetail[],
    selectedProjectId:number
    selectedProjectName:string;
    error?:any
}
export interface IProjectDocumentDetailResolved{
    projectDocumentDetail:IProjectDocumentDetail,
    error?:any
}
export interface IProjectDocumentAdd{
    projectId:number,
    documentTypeId:number,
    notes:string,
    file:File
}