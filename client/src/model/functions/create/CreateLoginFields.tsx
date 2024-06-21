import { InputProps } from "../../../libs/types";

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