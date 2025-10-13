import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { roles, type profile } from '../ts/types'
const users: profile[] = [{
    id: 1,
    name: "nigga",
    role: roles.EMPLOYER,
  },{
    id: 2,
    name: "Xuplet",
    role: roles.STUDENT,
  },{
    id: 3,
    name: "левый чел",
    role: roles.CREATOR,
  }]
export  const useUserStore = defineStore('profile',()=> {
  let user: Ref = ref(users[0]);
  
  const changeUser = (num: number)=> {
  user.value = users[num]
  
  }
  return {user,changeUser};
})
