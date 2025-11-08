import { type comment, roles, type profile, type commentFiles } from "./types";

const COMMENTS: comment[] = [{
    name: "Джон Слэйер",
    time: "23:12 20.09.25",
    role: roles.CREATOR,
    id: 1,
    msg: "Да я не силен в придумывании букв поэтому текст будем таким",
    kidsCount: 2,
    papa: 0,
    kidsRendered: false,
    showFrom: false,
    
}, {
    name: "Сол Гудман",
    time: "23:12 20.09.25",
    role: roles.STUDENT,
    id: 2,
    msg: "Да я не силен в придумывании букв поэтому текст будем таким",
    kidsCount: 0,
    papa: 1,
    kidsRendered: false,
    showFrom: false,
}, {
    name: "Сол Гудман 2",
    time: "23:12 20.09.25 22",
    role: roles.STUDENT,
    id: 3,
    msg: "Да я не силен в придумывании букв поэтому текст будем таким",
    papa: 0,
    kidsCount: 0,
    kidsRendered: false,
    showFrom: false,
}, {
    "name": "gZwB0youLD",
    "id": 4,
    "time": "2020-11-28",
    "role": roles.STUDENT,
    "msg": "9nZqEjUcXmnqiaYExKko6Eruxm",
    "papa": 0,
    "kidsCount": 0,
    kidsRendered: false,
    showFrom: false,
  },
  {
    "name": "GTKFnOUHCd",
    "id": 5,
    "time": "2020-07-13",
    "role": roles.EMPLOYER,
    "msg": "zn3RIkKMoEwGWWCX4pNv1JC5hu",
    "papa": 1,
    "kidsCount": 0,
    kidsRendered: false,
    showFrom: false,
  },
  {
    "name": "3k1iISXxN5",
    "id": 6,
    "time": "2024-02-01",
    "role": roles.STUDENT,
    "msg": "SiQat9iJRqSfiMWafvwFYe4x3d",
    "papa": 0,
    "kidsCount": 0,
    kidsRendered: false,
    showFrom: false,
  },
  {
    "name": "ObM964FTp2",
    "id": 7,
    "time": "2020-04-08",
    "role": roles.EMPLOYER,
    "msg": "I0QZtsWYQAFr7gPJbV5nbUxM2R",
    "papa": 0,
    "kidsCount": 0
    ,
    kidsRendered: false,
    showFrom: false,
  },
  {
    "name": "PpIJ6aHipf",
    "id": 8,
    "time": "2020-03-24",
    "role": roles.STUDENT,
    "msg": "zvayPXdoqlJzO3x2xiiIbzdbIc",
    "papa": 0,
    "kidsCount": 0,
    kidsRendered: false,
    showFrom: false,

  }]
const FILES = [ {
    id: 1,
    commentid: 1,
    path: "https://ya.ru/images/search?text=%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8&img_url=https%3A%2F%2Fimage.winudf.com%2Fv2%2Fimage%2FbW9iaS5hbmRyb2FwcC5wcm9zcGVyaXR5YXBwcy5jNTExMV9zY3JlZW5fN18xNTI0MDQxMDUwXzAyMQ%2Fscreen-7.jpg%3Ffakeurl%3D1%26amp%3Btype%3D.jpg&pos=0&rpt=simage&stype=image&lr=18&parent-reqid=1760386221787955-9960761456699019926-balancer-l7leveler-kubr-yp-vla-163-BAL&source=serp",
    name: "nigger",
    type: "image/"
},{
    id: 2,
    commentid:3,
    path: "https://www.bing.com/ck/a?!&&p=ac99d3702751b4fc315144603580834a1cfe9c7294ff563d86561f35570c7598JmltdHM9MTc2MDMxMzYwMA&ptn=3&ver=2&hsh=4&fclid=18478da2-6cea-67f3-1bec-9bc86df86673&u=a1L2ltYWdlcy9zZWFyY2g_cT0lZDAlYmElZDAlYjAlZDElODAlZDElODIlZDAlYjglZDAlYmQlZDAlYmElZDAlYjgmaWQ9MEQzNjdCRUM1ODgzOTQyNzNGN0MxMTA4MjZFN0NGNjM5ODNCOTQ4RiZGT1JNPUlRRlJCQQ",
    name: "niggedsar",
    type: "image/"
},{
    id: 3,
    commentid:1,
    path: "/text.txt",
    name: "niggedsar",
    type: "text/html"
},{
    id: 4,
    commentid:2,
    path: "/nigertiger.jpg",
    name: "niggedsar",
    type: "image/"
}

]
export class API {
    static COMMENTS: comment[] = COMMENTS;
    static FILES: commentFiles[] = FILES;
    
  
    static getComments(start: number, count: number,papa: number): comment[] {
       let newComments: comment[] = [];
       let i: number = 0;
        for (let e of this.COMMENTS) {

            if(e.papa == papa && i>=start) newComments.push(e);
            if(e.papa == papa) i++
            if(newComments.length == count)  break;
        }
      
        return newComments;
    }
    static getCommentsById(ids: number[]): comment[] {
        return COMMENTS.filter(e => ids.includes(e.id));
    }
    static getFilesByCommentId(id:number):commentFiles[] {
      return this.FILES.filter(file=> file.commentid == id);
    }
    static getFiles() {
      return this.FILES;
    }
}
