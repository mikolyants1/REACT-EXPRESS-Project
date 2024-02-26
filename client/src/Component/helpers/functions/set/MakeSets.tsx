import { ISets } from "../../../../types/type"

export default (name:string,pass:string):ISets[] => {
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