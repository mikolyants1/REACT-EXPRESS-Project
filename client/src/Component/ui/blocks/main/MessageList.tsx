
import {memo, useCallback} from 'react'
import { IContext, IMess, INewMess } from '../../../../types/type';
import { MainBlock, MessDate, Message } from '../../../../style/style';
import MessageCard from '../../cards/maincards/MessageCard';
import { useOutletContext } from 'react-router-dom';
import Error from '../load/Error';
import { useDelMessMutation } from '../../../../store/api/endpoints/DialogEndpoints';

interface props {
    mess:INewMess[],
    id:number,
    update:(time:number)=>void
}
function MessageList({mess,id,update}:props):JSX.Element {
 const {val,user,translate} = useOutletContext<IContext>();
 if (!translate) return <Error back={val} />
 const [delMess] = useDelMessMutation();

 const deleteMess = useCallback((now:number):void=>{
    if (typeof id!=="undefined"){
      delMess({id1:id,id2:user,now:now});
    };
 },[]);

 const showTime=(arg:IMess[],i:number):boolean=>{
    return arg[i].day!==arg[i-1].day;
   };
  return (
    <MainBlock>
      <Message>
        {mess.map((item:INewMess,i:number):JSX.Element=>{
         const {id:userId,day,month,now,text,date}:INewMess = item;
         const right:boolean = i==0 || showTime(mess,i);
         return (
          <div key={`${i}`}>
           {right&&(
             <MessDate>
               {translate(month)} {day}
             </MessDate>
           )}
            <MessageCard
             now={now}
             text={text}
             date={date}
             col={`${userId!==user}`}
             update={update}
             del={deleteMess}
             />
          </div>
         )})}
        </Message>
      </MainBlock>
  )
}

export default memo(MessageList);