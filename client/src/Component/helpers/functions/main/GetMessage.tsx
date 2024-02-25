import { Type, data, mess, message, newMess } from "../../../../types/type";

const getMessage = (d1:data,d2:data):newMess[] => {
  const user1:Type<message> = d1.message.find((i:message)=>i.id==d2.id);
  const user2:Type<message> = d2.message.find((i:message)=>i.id==d1.id);
  const newUser1:Type<newMess[]> = user1?.mess.map((i:mess)=>({id:d2.id,...i}));
  const newUser2:Type<newMess[]> = user2?.mess.map((i:mess)=>({id:d1.id,...i}));
  const item1:newMess[] = typeof newUser1 !== 'undefined' ? newUser1 : [];
  const item2:newMess[] = typeof newUser2 !== 'undefined' ? newUser2 : [];
  const arr:newMess[] = d2.id==d1.id ? [...item1] : [...item1,...item2];
  return arr.sort((x:newMess,y:newMess)=>x.now-y.now);
 };
 
export default getMessage