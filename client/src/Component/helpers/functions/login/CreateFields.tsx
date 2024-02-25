import { InputProps } from "../../../../types/type";

export default ():InputProps[] => {
    return [
        {
            Name:'name',
            title:'username'
        },
        {
            Name:'pass',
            title:"password"
        }
    ]
}