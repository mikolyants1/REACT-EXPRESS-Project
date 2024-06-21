import { useOutletContext } from "react-router-dom";
import { ChanButton, DelButton, MessAction, MessBlock, MessContent,
 MessSpan,MessText, MessTime } from "../../../../../../libs/style/style";
import { IOutlet } from "../../../../../../libs/types";
import { useState,memo} from 'react';

interface IProps {
  col:string,
  now:number,
  text:string,
  date:string
  update:(i:number)=>void,
  del:(now:number)=>void
}

function MessageCard({update,del,date,now,text,col}:IProps):JSX.Element {
  const {theme,translate} = useOutletContext<IOutlet>();
  const [show,setShow] = useState<boolean>(false);

  const showUpdate = ():void =>{
    setShow((prev:boolean)=>!prev);
  };
  
  const remove = () =>{
    del(now);
    setShow(false);
  };
    return (
        <MessBlock col={col}>
          <>
            {show && col == "false" &&
            <MessAction back={theme}>
              <ChanButton onClick={()=>update(now)}>
                {translate("change")}
              </ChanButton>
              <DelButton onClick={remove}>
                {translate("delete")}
              </DelButton>
            </MessAction>}
          </>
          <MessContent
           back={theme} col={col}
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