import { NamedExoticComponent, memo, useContext, useState } from "react";
import { Type, UserContext, outlet } from "../../../types/type";
import { useOutletContext } from "react-router-dom";
import { ProfileBut, ProfileChan, ProfileInput,
 ProfilePass } from "../../../style/style";
import { UserTheme } from "../../helpers/Context";

interface props {
    name:string,
    val?:Type<string>,
  };
  
const UserSetBlock:NamedExoticComponent<props> = memo(
 ({name,val}:props):JSX.Element=>{
   const {change,click} = useContext<UserContext>(UserTheme);
   const [show,setShow] = useState<boolean>(false);
   const [open,setOpen] = useState<string>("password");
   const {translate} = useOutletContext<outlet>();

   const openPass = ():void => {
    setOpen((prv:string)=>(
      prv == "text" ? "password" : "text"
    ))
   }
   const close = ():void => {
    setShow(false);
    setOpen("password");
   };
      return (
         <ProfilePass>
           <ProfileChan>
             <ProfileBut onClick={()=>setShow(true)}>
                {translate('change')} {translate(name)}
             </ProfileBut>
             {(name=="pass")&&show&&(
             <ProfileBut onClick={openPass}>
                {open == "text"
                 ? translate("hide")
                 : translate('show')}
             </ProfileBut>
             )}
            {show&&(
             <ProfileBut onClick={close}>
                {translate('close')}
             </ProfileBut>
             )}
           </ProfileChan>
           {show&&(
           <ProfileInput
            name={name}
            type={`${name == "name" ? "text" :open}`}
            onChange={change}
            defaultValue={val}
            onKeyUp={click}
            />
           )}
         </ProfilePass>
      );
  });

export default UserSetBlock