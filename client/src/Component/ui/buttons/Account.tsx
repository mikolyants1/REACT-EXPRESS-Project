import { Dispatch, SetStateAction, memo } from "react"
import { ProfileChan, ProfileDel,ProfilePass } from "@/style/style";
import { useOutletContext } from "react-router-dom";
import { IContext } from "@/types/type";
import Error from "../blocks/load/Error";
import { useDelUserMutation } from "@/store/api/endpoints/UserEndpoints";

interface props {
    set:Dispatch<SetStateAction<boolean>>
    id:number
}

function AccButton({set,id}:props):JSX.Element{
  const {translate,val} = useOutletContext<IContext>();
  const [delData] = useDelUserMutation();

  const deleteUser = ():void => {
    delData(id);
    set(true);
   };
  if (!translate) return <Error back={val} />;
    return (
      <ProfilePass>
        <ProfileChan>
          <ProfileDel
           onClick={()=>set(true)}>
            {translate("Exit")}
          </ProfileDel>
          <ProfileDel onClick={deleteUser}>
            {translate("Delete accoutn")}
          </ProfileDel>
        </ProfileChan>
      </ProfilePass>
    )
}

export default memo(AccButton);