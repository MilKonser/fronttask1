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
export interface Reaction {
  id: number, // уникальный идентификатор реакции
  type: string, // тип реакции (один символ, например эмодзи)
  commentId: number, // id комментария, к которому привязана реакция
  userId: number // id пользователя, который поставил реакцию
}