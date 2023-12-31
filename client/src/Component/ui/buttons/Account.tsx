import { memo } from "react"
import { ProfileChan, ProfileDel, ProfilePass } from "../../../style/style";

interface props {
    exit:()=>void,
    del:()=>void,
    exitText:string,
    delText:string
}

function AccButton(props:props):JSX.Element{
  const {exit,exitText,del,delText}:props = props;
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