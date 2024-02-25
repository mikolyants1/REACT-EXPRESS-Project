import { Type, data, message } from "../../../../types/type";

const getUser=(arg:number,data1:Type<data>,data2:unknown):Type<message>=>{
  if (!data1||!Array.isArray(data2)) return undefined;
  const {id,message}:data = data2.find((i:data)=>i.id==arg);
  const item1:Type<message> = data1.message.find((i:message)=>i.id==id);
  const item2:Type<message> = message.find((i:message)=>i.id==data1.id);
  return item1||item2;
 };

export default getUser