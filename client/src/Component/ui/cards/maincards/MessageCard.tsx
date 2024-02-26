import { useOutletContext } from "react-router-dom";
import { ChanButton, DelButton, MessAction, MessBlock, MessContent,
 MessSpan,MessText, MessTime } from "../../../../style/style";
import { IOutlet } from "../../../../types/type";
import { useState,memo} from 'react';

interface props {
  col:string,
  now:number,
  text:string,
  date:string
  update:(i:number)=>void,
  del:(now:number)=>void
}

function MessageCard({update,del,date,now,text,col}:props):JSX.Element {
  const {val,translate} = useOutletContext<IOutlet>();
  const [show,setShow] = useState<boolean>(false);

  const showUpdate = ():void =>{
    setShow((prev:boolean)=>!prev);
  };
  
  const remove = ():void =>{
    del(now);
    setShow(false);
  };
    return (
        <MessBlock col={col}>
          <>
            {show&&col=="false"&&
            <MessAction back={val}>
              <ChanButton onClick={()=>update(now)}>
                {translate("change")}
              </ChanButton>
              <DelButton onClick={remove}>
                {translate("delete")}
              </DelButton>
            </MessAction>}
          </>
          <MessContent back={val} col={col}
           onClick={showUpdate}>
            <MessText>
              <MessSpan>
                {text}
              </MessSpan>
            </MessText>
            <MessTime>
              {date}
            </MessTime>
          </MessContent>
        </MessBlock>
    )
}

export default memo(MessageCard)