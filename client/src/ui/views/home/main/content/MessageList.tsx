
import {memo, useCallback} from 'react'
import { IContext, INewMess } from '../../../../../libs/types/type';
import { MainBlock, MessDate, Message } from '../../../../../libs/style/style';
import MessageCard from './cards/MessageCard';
import { useOutletContext } from 'react-router-dom';
import { useDelMessMutation } from '../../../../../model/store/api/dialog/dialogEndpoints';
import showTime from '../../../../../model/functions/time/showTime';
import Error from '../../../../../ui/cards/loading/Error';

interface IProps {
  mess:INewMess[],
  id:number,
  update:(time:number)=>void
}

function MessageList({mess,id,update}:IProps):JSX.Element {
 const {theme,user,translate} = useOutletContext<IContext>();
 const [delMess] = useDelMessMutation();
 const deleteMess = useCallback((now:number):void=>{
    if (typeof id!=="undefined"){
      delMess({id1:id,id2:user,now:now});
    }
 },[]);

 if (!translate) return <Error back={theme} />
 
  return (
    <MainBlock>
      <Message>
        {mess.map((item:INewMess,i:number):JSX.Element=>{
         const {id:userId,day,month,now,text,date}:INewMess = item;
         const right:boolean = showTime(mess,i);
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