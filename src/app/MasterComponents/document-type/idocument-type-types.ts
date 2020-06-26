export interface IDocumentTypeDTODetail {
    documentTypeId:number,
    name:string
}
export interface IDocumentTypeListResolved{
    documentTypeList:IDocumentTypeDTODetail[],
    error?:any
}
export interface IDocumentTypeResolved{
    documentType:IDocumentTypeDTODetail,
    error?:any
}
