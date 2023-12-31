
import {memo, useCallback} from 'react'
import { Context, Null, mess, newMess } from '../../../types/type';
import { MainBlock, MessDate, Message } from '../../../style/style';
import MessageCard from '../cards/maincards/MessageCard';
import Month from '../../helpers/functions/Month';
import { useOutletContext } from 'react-router-dom';
import Error from './load/Error';
import { useDelMessMutation } from '../../../store/api/endpoints/DialogEndpoints';

interface props {
    mess:newMess[],
    id:number,
    update:(time:number)=>void
}
function MessageList({mess,id,update}:props):JSX.Element {
 const {val,user,translate} = useOutletContext<Context>();
 if (!translate) return <Error back={val} />
 const [delMess] = useDelMessMutation();

 const deleteMess=useCallback((now:number):void=>{
    if (typeof id!=="undefined"){
      delMess({id1:id,id2:user,now:now});
    };
 },[]);

 const showTime=(arg:mess[],i:number):boolean=>{
    return arg[i].day!==arg[i-1].day;
   };
  return (
    <MainBlock>
      <Message>
        {mess.map((item:newMess,i:number):JSX.Element=>{
         const {id:userId,day,month,now,text,date}:newMess = item;
         const right:Null<boolean> = i==0 ? null : showTime(mess,i);
         return (
          <div key={`${i}`}>
           {(right||i==0)&&(
             <MessDate>
               {translate(Month(month))} {day}
             </MessDate>
           )}
            <MessageCard
             key={`${now}`}
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