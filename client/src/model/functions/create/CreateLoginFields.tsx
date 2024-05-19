import { InputProps } from "../../../libs/types/type";

export const createLoginField = ():InputProps[] => {
    return [
        {
            name:'name',
            title:'username'
        },
        {
            name:'pass',
            title:"password"
        }
    ]
}