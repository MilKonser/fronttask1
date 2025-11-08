import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type commentFiles } from '../ts/types'

import { API } from "@/ts/api"

//тут жестко заебланил этот стор нахер вроде не нужен файлы будут с сервака браться
export const useCommentFilesStore = defineStore('commentFiles', {
  state: () => ({
    index: 4 as number,
    files: [] as commentFiles[],
  }),
  actions: {
    getFilesByCommentId(id: number): commentFiles[] {
        return this.files.filter(file=> file.id == id);
    },
    
    addfile(commentid: number, file: any) {
        const newFile:commentFiles = {
            id: this.index++,
            name: file.name,
            commentid: commentid,
            path: file.path,
            type: file.type
        }
    }
  }
});