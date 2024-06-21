import { LogoText, ProfileBlock, ProfileDis,ProfileLogo,
ProfileName,ProfileText } from "../../../../../../libs/style/style";
import { memo } from "react";
import { IStyleObj } from "../../../../../../libs/types";
import { createLogo } from "../../../../../../model/functions/create/CreateLogo";

interface props {
    name:string,
    logoText:string
}

function ProfileLogoCard({name,logoText}:props):JSX.Element{
 const {one,two}:IStyleObj = createLogo();

  return (
    <ProfileBlock>
      <ProfileLogo two={two} start={one}>
        <LogoText>
          {name.slice(0,1).toUpperCase()}
        </LogoText>
      </ProfileLogo>
      <ProfileText>
        <ProfileDis>
          {logoText}
        </ProfileDis>
        <ProfileName>
          {name}
        </ProfileName>
      </ProfileText>
    </ProfileBlock> 
  );
}

export default memo(ProfileLogoCard)