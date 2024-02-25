import {Dispatch, SetStateAction, memo} from 'react'
import { ProfileBut, ProfileChan } from '../../../style/style'
import { useOutletContext } from 'react-router-dom'
import { outlet } from '../../../types/type'
import Error from '../blocks/load/Error'

interface props {
    open:string,
    setShow:Dispatch<SetStateAction<boolean>>,
    setOpen:Dispatch<SetStateAction<string>>,
    show:boolean,
    name:string
}

function Show(props:props):JSX.Element {
 const {setOpen,setShow,show,open,name}:props = props;
 const {translate,val} = useOutletContext<outlet>();

 const openPass = ():void => {
    setOpen((prv:string)=>(
      prv == "text" ? "password" : "text"
    ))
   };
   const close = ():void => {
    setShow(false);
    setOpen("password");
   };
 if (!translate) return <Error back={val} />;
  return (
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
  )
}

export default memo(Show)