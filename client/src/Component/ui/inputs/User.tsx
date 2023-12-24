import { NamedExoticComponent, memo, useState } from "react";
import { EvtC, EvtK, Null, Type, outlet } from "../../../types/type";
import { useOutletContext } from "react-router-dom";
import { ProfileBut, ProfileChan, ProfileInput,
 ProfilePass } from "../../../style/style";

interface props {
    set:(e:EvtC)=>void,
    name:string,
    val?:Type<string>,
    click:(e:EvtK)=>void
  };
  
const UserSetBlock:NamedExoticComponent<props> = memo(
 ({name,set,val,click}:props):Null<JSX.Element>=>{
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
            type={`${name == "name"?"text":open}`}
            onChange={set}
            defaultValue={val}
            onKeyUp={click}
            />
           )}
         </ProfilePass>
      );
  });

export default UserSetBlock