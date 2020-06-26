export interface IProjectDetail {
    projectId:number,
    name:string,
    about:string,
    notes:string,
    sourceCodeLocation:string
}
export interface IProjectListResolved{
    projectList:IProjectDetail[];
    error?:any
}
export interface IProjectDetailResolved{
    projectDetail:IProjectDetail,
    error?:any
}