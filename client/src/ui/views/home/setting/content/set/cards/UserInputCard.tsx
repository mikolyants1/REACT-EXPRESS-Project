import { FC, memo, useContext, useState } from "react";
import { Type, IUserContext } from "../../../../../../../libs/types";
import { ProfileInput,ProfilePass } from "../../../../../../../libs/style/style";
import { UserContext } from "../../../../../../../model/context/UserContext";
import ShowButton from "./buttons/ShowButton";

interface IProps {
  name:string,
  val?:Type<string>,
}
  
const UserSetBlock:FC<IProps> = ({name,val}):JSX.Element=>{
  const {change,click} = useContext<IUserContext>(UserContext);
  const [open,setOpen] = useState<string>("password");
  const [show,setShow] = useState<boolean>(false);

  return (
    <ProfilePass>
      <ShowButton
       setOpen={setOpen}
       setShow={setShow}
       show={show}
       name={name}
       open={open}
      />
      {show && (
        <ProfileInput
         name={name}
         type={`${name == "name" ? "text" : open}`}
         onChange={change}
         defaultValue={val}
         onKeyUp={click}
         />
      )}
    </ProfilePass>
  );
}

export default memo(UserSetBlock)