import { styleObj } from "../../../style/style"

export default ():styleObj => {
 const avatar:styleObj[] = [
        {
            one:'rgb(14, 191, 61)',
            two:'rgb(52, 52, 247)'
        },
        {
            one:'red',
            two:'blue'
        },
        {
            one:'rgb(129, 20, 232)',
            two:'rgb(254, 149, 1)'
        }
    ];

  return avatar[Math.floor(Math.random()*3)];
}