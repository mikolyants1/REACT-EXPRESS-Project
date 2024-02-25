import { ITime } from "../../../../types/type";

function createTime():ITime {
  const date:Date = new Date();
  const our:number = date.getHours();
  const min:number = date.getMinutes();
  const Our:string = our < 10 ? `0${our}` : `${our}`;
  const Min:string = min < 10 ? `0${min}` : `${min}`;
  return {
    date:`${Our}:${Min}`,
    day:date.getDate(),
    month:date.toLocaleDateString("en-EN",{month:"long"})
  }
}

export default createTime