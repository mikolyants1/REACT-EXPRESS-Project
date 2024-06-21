import { ISets } from "../../../libs/types"

export const createProfileField = (name:string,pass:string):ISets[] => {
     return [
        {
            name:"name",
            val:name
        },
        {
            name:"pass",
            val:pass
        }
      ]
}