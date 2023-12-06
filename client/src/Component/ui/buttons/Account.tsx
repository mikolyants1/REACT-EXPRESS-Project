import { memo } from "react"
import { ProfileChan, ProfileDel, ProfilePass } from "../../../style/style";

interface props {
    exit:()=>void,
    del:()=>void,
    exitText:string,
    delText:string
}

function AccButton({exit,del,exitText,delText}:props):JSX.Element{
    return (
      <ProfilePass>
        <ProfileChan>
          <ProfileDel onClick={exit}>
            {exitText}
          </ProfileDel>
          <ProfileDel onClick={del}>
            {delText}
          </ProfileDel>
        </ProfileChan>
      </ProfilePass>
    )
};

export default memo(AccButton);