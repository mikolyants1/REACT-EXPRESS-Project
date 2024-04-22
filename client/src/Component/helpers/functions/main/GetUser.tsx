import { Type, IData, IMessage } from "@/types/type";

const getUser=(arg:number,data1:Type<IData>,data2:unknown):Type<IMessage>=>{
  if (!data1||!Array.isArray(data2)) return undefined;
  const {id,message}:IData = data2.find((i:IData)=>i.id==arg);
  const item1:Type<IMessage> = data1.message.find((i:IMessage)=>i.id==id);
  const item2:Type<IMessage> = message.find((i:IMessage)=>i.id==data1.id);
  return item1||item2;
 };

export default getUser