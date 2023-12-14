import { ProfileDis, ProfileName, ProfilePass,
 ProfileText } from "../../../../style/style"
import { memo } from "react"
interface props {
    name:string,
    value:string
}

function PassCard({name,value}:props):JSX.Element{
    return (
        <ProfilePass>
          <ProfileText>
            <ProfileDis>
              {name}
            </ProfileDis>
            <ProfileName>
             {value}
            </ProfileName>
          </ProfileText>
        </ProfilePass>
    )
};

export default memo(PassCard);