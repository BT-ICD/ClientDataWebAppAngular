export interface ITeamMemberDTOList {
    teamMemberId:number
    name:string,
    email:string,
    mobile:string
}
export interface ITeamMemberDTO{
    teamMemberId:number
    name:string,
    email:string,
    mobile:string,
    alternateContact:string,
    doj:Date,
    notes:string
}
export interface ITeamMemberListResolve {
    teamMembers:ITeamMemberDTOList[],
    error?:any
}
export interface ITeamMemberListResolve {
    teamMembers:ITeamMemberDTOList[],
    error?:any
}
export interface ITeamMemberResolve{
    teamMember: ITeamMemberDTO,
    error?:any
}
export interface ITeamMemberDTOAdd{
    name:string,
    email:string,
    mobile:string,
    alternateContact:string,
    doj:Date,
    notes:string
}