import { Dispatch, SetStateAction } from "react"
import { ProfileChan, ProfileDel,ProfilePass } from "../../../../../libs/style/style";
import { useOutletContext } from "react-router-dom";
import { IContext } from "../../../../../libs/types/type";
import { useDelUserMutation } from "../../../../../model/store/api/endpoints/userEndpoints";
import Error from "../../../../../ui/cards/loading/Error";

interface IProps {
    set:Dispatch<SetStateAction<boolean>>
    id:number
}

export function AccountButton({set,id}:IProps):JSX.Element{
  const {translate,theme} = useOutletContext<IContext>();
  const [delData] = useDelUserMutation();

  const deleteUser = ():void => {
     delData(id);
     set(true);
   }
   
  if (!translate) return <Error back={theme} />;
    return (
      <ProfilePass>
        <ProfileChan>
          <ProfileDel
           onClick={()=>set(true)}>
            {translate("Exit")}
          </ProfileDel>
          <ProfileDel onClick={deleteUser}>
            {translate("Delete account")}
          </ProfileDel>
        </ProfileChan>
      </ProfilePass>
    )
}