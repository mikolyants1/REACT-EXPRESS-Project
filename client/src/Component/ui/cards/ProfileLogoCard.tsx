import { LogoText, ProfileBlock, ProfileDis,
ProfileLogo,ProfileName, ProfileText, avatar,
styleObj } from "../../../style/style";
import { memo } from "react";

interface props {
    name:string,
    logoText:string
}

function ProfileLogoCard({name,logoText}:props):JSX.Element{
 const {one,two}:styleObj = avatar[Math.floor(Math.random()*3)];
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