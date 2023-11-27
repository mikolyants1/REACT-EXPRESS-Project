import { useOutletContext } from "react-router-dom";
import { MessBlock, MessContent, MessSpan,
 MessText, MessTime } from "../style/style";
import { newMess, outlet } from "../types/type";
import { memo } from "react";

interface props {
    key:string,
    col:string,
    data:newMess,
    update:(i:number)=>void,
}

 function Messages(props:props):JSX.Element {
  const {val} = useOutletContext<outlet>();
  const {update,data,col}:props = props;
  console.log(9)
    return (
        <MessBlock col={`${col}`}>
          <MessContent back={val} col={`${col}`}
           onClick={()=>update(data.now)}>
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

export default memo(Messages)