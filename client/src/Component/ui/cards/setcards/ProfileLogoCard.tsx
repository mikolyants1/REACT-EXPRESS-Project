import { LogoText, ProfileBlock, ProfileDis,ProfileLogo,
ProfileName,ProfileText } from "../../../../style/style";
import { memo } from "react";
import CreateLogo from "../../../helpers/functions/CreateLogo";
import { IStyleObj } from "../../../../types/type";

interface props {
    name:string,
    logoText:string
}

function ProfileLogoCard({name,logoText}:props):JSX.Element{
 const {one,two}:IStyleObj = CreateLogo();
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
};

export default memo(ProfileLogoCard)