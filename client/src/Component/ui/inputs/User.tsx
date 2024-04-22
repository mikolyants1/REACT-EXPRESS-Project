import { FC, memo, useContext, useState } from "react";
import { Type, IUserContext } from "@/types/type";
import { ProfileInput,ProfilePass } from "@/style/style";
import { UserTheme } from "../../helpers/Context";
import ShowButtons from "../buttons/Show";

interface IProps {
    name:string,
    val?:Type<string>,
  }
  
const UserSetBlock:FC<IProps> = ({name,val}):JSX.Element=>{
  const {change,click} = useContext<IUserContext>(UserTheme);
  const [open,setOpen] = useState<string>("password");
  const [show,setShow] = useState<boolean>(false);

  return (
    <ProfilePass>
      <ShowButtons
       setOpen={setOpen}
       setShow={setShow}
       show={show}
       name={name}
       open={open}
       />
      {show&&(
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
  };

export default memo(UserSetBlock)