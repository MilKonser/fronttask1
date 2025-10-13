export interface comment {
    id: number, 
    name: string,
    time: string| Date,
    role: roles,
    msg: string,

    papa: number,
    kidsCount: number,
    kidsRendered: boolean,
    showFrom: boolean,
}
export enum roles {
    STUDENT = "Student",
    EMPLOYER = "Employer",
    CREATOR = "Creator"
}
export interface profile {
    id: number,
    name: string,
    role: roles,
}
export interface commentFiles {
    id: number,
    commentid: number,
    path: string,
    name: string,
    type: string
}