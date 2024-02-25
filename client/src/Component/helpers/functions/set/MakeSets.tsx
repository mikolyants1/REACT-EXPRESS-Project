import { sets } from "../../../../types/type"

export default (name:string,pass:string):sets[] => {
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