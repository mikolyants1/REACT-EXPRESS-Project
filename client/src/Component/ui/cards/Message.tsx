import { useOutletContext } from "react-router-dom";
import { ChanButton, DelButton, MessAction, MessBlock, MessContent,
 MessSpan,MessText, MessTime } from "../../../style/style";
import { newMess, outlet } from "../../../types/type";
import { useState} from 'react';

interface props {
    key:string,
    col:string,
    data:newMess,
    update:(i:number)=>void,
    del:(now:number)=>void
}

function MessageCard(props:props):JSX.Element {
  const {val,translate} = useOutletContext<outlet>();
  const {update,del,data,col}:props = props;
  const [show,setShow] = useState<boolean>(false);
  const showUpdate=():void=>{
    setShow((prev:boolean)=>!prev);
  };
  const remove=():void=>{
    del(data.now);
    setShow(false);
  };
    return (
        <MessBlock col={col}>
          <>
            {show&&col=="false"&&
            <MessAction back={val}>
              <ChanButton onClick={()=>update(data.now)}>
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
                {data.text}
              </MessSpan>
            </MessText>
            <MessTime>
              {data.date}
            </MessTime>
          </MessContent>
        </MessBlock>
    )
}

export default MessageCard