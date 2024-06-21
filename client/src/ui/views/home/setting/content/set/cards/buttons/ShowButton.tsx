import {Dispatch, SetStateAction, memo} from 'react'
import { ProfileBut, ProfileChan } from '../../../../../../../../libs/style/style'
import { NavigateFunction, useNavigate, useOutletContext } from 'react-router-dom'
import { ICheck, IOutlet } from '../../../../../../../../libs/types'
import { getCurrent, getToken, useAppSelector } from '../../../../../../../../model/store/store/store'
import CheckToken from '../../../../../../../../api/auth/CheckToken'
import Error from '../../../../../../../../ui/cards/loading/Error'

interface IProps {
    open:string,
    setShow:Dispatch<SetStateAction<boolean>>,
    setOpen:Dispatch<SetStateAction<string>>,
    show:boolean,
    name:string
}

function ShowButton(props:IProps):JSX.Element {
 const {setOpen,setShow,show,open,name}:IProps = props;
 const {translate,theme} = useOutletContext<IOutlet>();
 const userId:number = useAppSelector(getCurrent);
 const token:string = useAppSelector(getToken);
 const navigate:NavigateFunction = useNavigate();

  const openPass = async ():Promise<void> => {
    try {
      const data:ICheck = await CheckToken(token,userId);
      console.log(data)
      if (data.isValid){
        setOpen((prv:string)=>(
          prv == "text" ? "password" : "text"
        ));
      } else navigate("/");
    } catch {
      navigate("/");
    }
  }
  
   const close = ():void => {
    setShow(false);
    setOpen("password");
   }

 if (!translate) return <Error back={theme} />;

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
      {show && (
      <ProfileBut onClick={close}>
       {translate('close')}
      </ProfileBut>
      )}
    </ProfileChan>
  )
}

export default memo(ShowButton)