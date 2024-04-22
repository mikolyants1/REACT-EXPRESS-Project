import { Type, IData, IMess, IMessage, INewMess } from "@/types/type";

const getMessage = (d1:IData,d2:IData):INewMess[] => {
  const user1:Type<IMessage> = d1.message.find((i:IMessage)=>i.id==d2.id);
  const user2:Type<IMessage> = d2.message.find((i:IMessage)=>i.id==d1.id);
  const newUser1:Type<INewMess[]> = user1?.mess.map((i:IMess)=>({id:d2.id,...i}));
  const newUser2:Type<INewMess[]> = user2?.mess.map((i:IMess)=>({id:d1.id,...i}));
  const item1:INewMess[] = typeof newUser1 !== 'undefined' ? newUser1 : [];
  const item2:INewMess[] = typeof newUser2 !== 'undefined' ? newUser2 : [];
  const arr:INewMess[] = d2.id==d1.id ? [...item1] : [...item1,...item2];
  return arr.sort((x:INewMess,y:INewMess)=>x.now-y.now);
 };
 
export default getMessage