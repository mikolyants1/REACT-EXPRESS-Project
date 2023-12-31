import { ChangeEvent,KeyboardEvent,MutableRefObject } from 'react'
import styled, { IStyledComponent,keyframes } from 'styled-components'
import { BaseObject } from 'styled-components/dist/types'
import { EvtC, EvtK, Type } from '../types/type'
import Keyframes from 'styled-components/dist/models/Keyframes'

export interface styleObj{
    one:string,
    two:string
}

type back = {
    back:string,
    children:JSX.Element
}
export const avatar:styleObj[]=[
    {
        one:'rgb(14, 191, 61)',
        two:'rgb(52, 52, 247)'
    },
    {
        one:'red',
        two:'blue'
    },
    {
        one:'rgb(129, 20, 232)',
        two:'rgb(254, 149, 1)'
    }
]
export const EntryBlock:IStyledComponent<'web',BaseObject> = styled.div({
margin:'200px auto',
width:300,
textAlign:'center',
})
export const LoginError:IStyledComponent<'web',BaseObject> = styled.div({
width:'100%',
textAlign:'center',
color:'red',
fontSize:16,
marginTop:5
})
export const RegistLink:IStyledComponent<"web",BaseObject> = styled(LoginError)({color:"black"})

export const EntryTitle:IStyledComponent<'web',BaseObject> = styled.div({
width:'100%',
textAlign:'center',
fontSize:28,
fontWeight:'bold'
})
export const EntrySub:IStyledComponent<'web',BaseObject> = styled.div({
width:'80%',
textAlign:'center',
margin:'10px auto',
fontSize:20
})
export const InputBlock:IStyledComponent<'web',BaseObject> = styled.div({
 justifyContent:'center',
 alignItems:'center',
 display:'flex',
 width:'100%'
})
export const EntryInput:IStyledComponent<'web',{
  onChange:(e:EvtC)=>void,
  name:string,
  value:string
}> = styled.input({
 width:260,
 height:40,
 borderRadius:20,
 backgroundColor:'white',
 fontSize:20,
 boxShadow:'1px 3px 2px 0px grey',
 border:'none'
})
export const Span:IStyledComponent<'web',BaseObject> = styled.div({
fontSize:25,
marginTop:'-4px'
})
export const EntryBut:IStyledComponent<'web',{
    children:string,
    onClick:()=>void
}> = styled.button({
width:120,
height:40,
backgroundColor:'rgb(25, 222, 64)',
margin:'10px auto',
borderRadius:20,
color:'white',
fontSize:20,
border:'none'
})
interface contProp{
    back:string,
    val:string,
    show?:string,
    children:JSX.Element[]
}
export const Wrapper:IStyledComponent<'web',back> = styled.div`
border-radius:10px;
overflow:hidden;
background-color:${({back}:back)=>back};
color:${({back}:back)=>back=='black'
 ? 'white' : 'black'};
width:100%;
height:700px;
min-width:300px;
@media(max-width:600px){
    height:600px
}
`
export const MainContent:IStyledComponent<'web',BaseObject> = styled.div`
width:100%;
height:100%;
display:flex;
@media(max-width:600px){
 position:relative
}
`
export const Container:IStyledComponent<'web',Omit<contProp,'val'>> = styled.div`
width:100%;
display:grid;
height:100%;
background-color:
rgb(${({back}:Omit<contProp,'val'>)=>back=='black'?
'25,25,25':'240,240,240'});
grid-template-rows: minmax(50px,auto) 1fr minmax(80px,auto);
grid-template-areas:
 'header'
 'main'
 'footer';
 position:relative;
 @media(max-width:600px){
    position:absolute;
    min-width:300px
 }
`
type back1 = {
    back:string,
    show:string,
    children:JSX.Element[]
}

export const NavBarBlock:IStyledComponent<'web',back1> = styled.div`
min-width:280px;
height:100%;
display:grid;
grid-template-rows: minmax(50px,auto) 1fr minmax(50px,auto);
background-color:${
({back}:back1)=>back=='black'
? 'rgb(50,50,50)' : 'white'};
color:${({back}:back1)=>back=='black'
 ? 'white' : 'black'};
border:1px ;
border-style:solid;
border-color:rgb(240, 240, 240);
transition:transform 1s;
position:relative;
@media(max-width:600px){
display:${({show}:back1)=>show=='true'
 ? 'grid' : 'none'};
 position:absolute;
 z-index:100;
 width:100%;
}
`
export const NavMain:IStyledComponent<'web',BaseObject> = styled.div`
overflow-y:scroll;
::-webkit-scrollbar{
    display: none;
   }
`
interface headProp{
    back:string,
    children:JSX.Element|JSX.Element[]
}
export const HeaderBlock:IStyledComponent<'web',headProp> = styled.div`
width:100%;
height:50px;
grid-area:header;
display:flex;
align-items:center;
background-color:${
({back}:headProp)=>back=='black'
? 'rgb(50,50,50)' : 'white'};
color:${({back}:headProp)=>back=='black'
? 'white' : 'black'};
border:1px ;
border-style:solid;
border-color:rgb(240, 240, 240);
`

 const show:Keyframes = keyframes`
  from {
    opacity:0;
  };
  to {
    opacity:1;
  }
 `
export const NavWrapper:IStyledComponent<"web",BaseObject> = styled.div`
    width:100%;
    height:100%;
    animation:${show} 0.3s linear;
`
interface logoProp{
    start?:string,
    two?:string,
    left?:string,
    right?:string,
    children:(false|JSX.Element)[]|(false|JSX.Element)|string|undefined
}
export const Logo:IStyledComponent<'web',logoProp> = styled.div`
padding:3px 0px;
text-align:center;
min-width:40px;
min-height:32px;
border-radius:50%;
color:white;
font-size:20px;
background:linear-gradient(90deg,
${({start}:logoProp)=>start},${({two}:logoProp)=>two});
font-weight:bold;
margin-left:2px
`
export const MainBlock:IStyledComponent<'web',BaseObject> = styled("div")({
gridArea:'main',
overflowY:'scroll',
position:'relative',
"::-webkit-scrollbar":{
    display: 'none'
   }
})
export const Message:IStyledComponent<'web',BaseObject> = styled("div")({
width:'90%',
margin:'0 auto 10px auto',
left:0,
right:0,
position:'absolute',
bottom:0,
})
export const FootBlock:IStyledComponent<'web',BaseObject> = styled("div")({
width:'100%',
marginTop:20,
marginBottom:10,
display:'flex',
justifyContent:'center',
alignItems:'center',
gridArea:'footer',
})
interface input{
    back:string,
    placeholder:string,
    ref:MutableRefObject<HTMLInputElement>,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    onKeyUp:(e:KeyboardEvent<HTMLInputElement>)=>void
}
export const MainInput:IStyledComponent<'web',input> = styled.input`
 width:90%;
 border:none;
height:35px;
background-color:${
({back}:input)=>back=='black'
? 'rgb(50,50,50)'
: 'white'};
color:${({back}:input)=>back=='black'
 ? 'white' : 'black'};
font-size:16px;
padding:0px 8px;
border-radius:20px;
box-shadow:0px 0.5px 0.5px 0.5px grey;
`

export const Name:IStyledComponent<'web',BaseObject> = styled("div")({
fontSize:20,
marginLeft:6
})
export const NavTitle:IStyledComponent<'web',BaseObject> = styled("div")({
marginTop:10,
textAlign:'center',
fontWeight:'bold',
width:'100%',
fontSize:20,
borderBottom:'1px solid rgb(240, 240, 240)'
})
export const NavMenu:IStyledComponent<'web',BaseObject> = styled("div")({
display:'flex',
justifyContent:'space-between',
alignItems:'center',
width:'100%',
height:'50px',
borderTop:'1px solid rgb(240, 240, 240)'
})
type mess1 = {
    press:string,
    key:string,
    onClick:()=>void,
    children:string
}
export const NavMenuBlock:IStyledComponent<'web',mess1> = styled.div`
width:80px;
text-align:center;
transition:color 0.3s;
cursor:pointer;
color:${({press}:mess1)=>press=='true'
 ? 'rgb(48, 240, 48)' :'grey'}
`
type mess2 = {
    col:string,
    children:JSX.Element[],
    
}

export const MessBlock:IStyledComponent<'web',mess2> = styled.div`
width:100%;
display:flex;
margin-top:10px;
justify-content:${
({col}:mess2)=>col=='true'
 ? 'flex-start' : 'flex-end'}
`
function Back(bool:string,back:string):string{
    if (bool=='true'){
      return back=='black'
      ? 'rgb(50,50,50)'
      : 'white'
    } else {
      return back=='black'
      ? 'rgb(30, 67, 30)'
      : 'rgb(177,248,177)'
    }
}
interface MessProp{
    col:string,
    back:string,
    children:JSX.Element[],
    onClick:()=>void
}
export const MessContent:IStyledComponent<'web',MessProp> = styled.div`
 display:flex;
 min-width:120px;
 padding:5px;
 height:20px;
 border-radius:20px;
 background-color:${
({col,back}:MessProp)=>Back(col,back)
};
 box-shadow:0 1px 1px 0 grey
`
interface actionAProp{
    back:string,
    children:JSX.Element[]
}
export const MessAction:IStyledComponent<'web',actionAProp> = styled(MessContent)`
background-color:white;
box-shadow:0 1px 1px 0 ${({back})=>back!=="black"?"grey":back};
justify-content:space-between;
align-items:center;
margin-right:10px;
height:12px;
min-width:70px;
`
interface buttProp{
    onClick:()=>void,
    children:string
}
export const ChanButton:IStyledComponent<'web',buttProp> = styled.button({
 border:'none',
 background:'transparent',
 fontSize:14
})
export const DelButton:IStyledComponent<"web",buttProp> = styled(ChanButton)({
 borderLeft:'1px solid black',
 color:'red'
})
export const MessDate:IStyledComponent<'web',BaseObject> = styled.div({
width:'100%',
textAlign:'center',
marginTop:5,
marginBottom:5
})
export const MessText:IStyledComponent<'web',BaseObject> = styled.div({
 fontSize:18,
 minWidth:80,
 padding:'0px 5px'
})
export const MessSpan:IStyledComponent<'web',BaseObject> = styled.div({
marginLeft:2,
marginTop:-4
})
export const MessTime:IStyledComponent<'web',BaseObject> = styled.div({
fontSize:13,
textAlign:'center',
color:'grey',
width:40
})
function Mess(back:string):string{
  return back=='black'
  ? 'rgb(50,50,50)'
  : 'white'
}
interface contactProp{
    fill?:string,
    children:JSX.Element[],
    back:string,
    onClick:()=>void
}
export const ContactBlock:IStyledComponent<'web',contactProp> = styled.div`
width:100%;
margin-top:10px;
display:flex;
height:70px;
align-items:center;
transition:background-color 0.3s;
background-color:${
({fill,back}:contactProp)=>fill=='true'
?'rgb(73, 221, 113)'
: Mess(back)};
color:${({back}:contactProp)=>back=='black'
? 'white' : 'black'}
`
export const ContactText:IStyledComponent<"web",BaseObject> = styled.div({marginLeft:"6px"})

interface logoProp{
    left?:string,
    right?:string,
    children:(false|JSX.Element)[]|string|undefined|false|JSX.Element
}
export const ContactLogo:IStyledComponent<'web',logoProp> = styled(Logo)`
background:linear-gradient(90deg,
${({left}:logoProp)=>left},${({right}:logoProp)=>right});
font-weight:bold;
padding:5px 0px;
width:50px;
margin-left:20px;
height:40px;
font-size:25px;
`
export const ContactName:IStyledComponent<'web',BaseObject> = styled.div({fontSize:'20px'})
interface contactTime {
    children:string,
    online:string
}
export const ContactTime:IStyledComponent<'web',contactTime> = styled.div`
color:${({online}:contactTime)=>online!=="undefined"?"rgb(48,240,48)":"grey"};
font-size:15px;
margin-top:-1px
`
interface inputProp{
    back:string,
    type:string,
    onChange:(e:EvtC)=>void,
    placeholder:string
}
export const BlockInput:IStyledComponent<'web',BaseObject> = styled.div({
display:'flex',
marginTop:20,
width:'100%',
justifyContent:'center',
alignItems:'center'
})
export const ContactInput:IStyledComponent<'web',inputProp> = styled.input`
width:240px;
background-color:${
({back}:inputProp)=>back=='black'
 ? 'rgb(80,80,80)'
 : 'rgb(240,240,240)'};
border-radius:20px;
border:none;
padding:0 10px;
font-size:16px;
height:35px;
@media(max-width:600px){
    width:90%;
}

`
export const SetBlock:IStyledComponent<'web',{
 back:string,
 children:JSX.Element[],
 onClick:()=>void,
 fill?:string
}> = styled(ContactBlock)({height:"50px"})

export const SetLogo:IStyledComponent<'web',BaseObject> = styled.div({
 fontSize:26,
 marginLeft:30,
 textAlign:'center',
 color:'gold'
})
export const ThemeLogo:IStyledComponent<'web',BaseObject> = styled(SetLogo)({color:"blue"})

export const SetText:IStyledComponent<'web',BaseObject> = styled.div({
marginLeft:10,
fontSize:18
})
interface contain{
    val:string,
    children:JSX.Element[]
}
export const SetContain:IStyledComponent<'web',contain> = styled(Container)`
background-color:${({val}:contain)=>val=='black'
 ? 'rgb(50,50,50)' : 'white'};
grid-template-rows: minmax(50px,auto) 1fr ;
 grid-template-areas:
 'header'
 'main';
`
export const SetMain:IStyledComponent<'web',BaseObject> = styled.div({gridArea:"main"})

export const SetTitle:IStyledComponent<'web',BaseObject> = styled.div({
textAlign:'center',
width:'100%',
fontWeight:'bold',
fontSize:23
})
export const ProfileBlock:IStyledComponent<'web',BaseObject> = styled.div({
width:'95%',
margin:'10px auto',
display:'flex',
alignItems:'center',
height:80
})
interface logoProf{
    start:string,
    two:string,
    children:JSX.Element
}
export const ProfileLogo:IStyledComponent<'web',logoProf> = styled(Logo)`
padding:0;
width:60px;
height:60px;
font-size:26px;
background-size:100% 100%;
background:${({start,two}:logoProf)=>(
 `linear-gradient(90deg,${start},${two})`
)}
`
export const ProfileText:IStyledComponent<'web',BaseObject> = styled.div({marginLeft:"10px"})

export const ProfileName:IStyledComponent<'web',BaseObject> = styled.div({
fontSize:20,
marginTop:-7
})
export const LogoText:IStyledComponent<'web',BaseObject> = styled.div({marginTop:"10px"})

export const ProfileDis:IStyledComponent<'web',BaseObject> = styled.div({color:"grey"})

export const ProfilePass:IStyledComponent<'web',BaseObject> = styled(ProfileBlock)({
    display:"block"
})

export const ProfileChan:IStyledComponent<'web',BaseObject> = styled.div({
 display:'flex',
 justifyContent:'space-between',
 width:270
})
export const ProfileBut:IStyledComponent<'web',{
    children:string[]|string,
    onClick:()=>void
}> = styled.div`
color:grey;
&::hover{
    color:red
}
`
interface ProfileProp {
    onChange:(e:EvtC)=>void,
    onKeyUp:(e:EvtK)=>void,
    defaultValue:Type<string>,
    name:string,
    type:string,
    accept:string
}
export const ProfileInput:IStyledComponent<'web',Partial<ProfileProp>> = styled.input({
 marginTop:5,
 width:270,
 backgroundColor:'rgb(240,240,240)',
 border:'none',
 height:35,
 borderRadius:15,
 fontSize:18,
 padding:'0 5px'
})
export const ProfileDel:IStyledComponent<'web',{
    children:string,
    onClick:()=>void
}> = styled(ProfileBut)({color:'red'})
export const ThemeInput:IStyledComponent<'web',{
    key:string,
    onChange:(e:EvtC)=>void,
    checked:boolean,
    type:string,
    value:string,
    name:string

}> = styled("input")({
width:20,
height:20
})
export const ThemeBlock:IStyledComponent<'web',BaseObject> = styled("div")({
display:'flex',
alignItems:'center',
 width:'100%',
 fontSize:20
})
export const ThemeText:IStyledComponent<'web',BaseObject> = styled.div({marginLeft:10})
interface MenuProp{
    children:JSX.Element,
    back:string
}
export const HeaderMenu:IStyledComponent<'web',MenuProp> = styled.div`
color:${({back}:MenuProp)=>back=='black'
 ? 'white' : 'black'};
display:none;
justify-content:flex-end;
padding:0 10px;
width:90%;
@media(max-width:600px){
    display:flex
}
`
export const MenuButton:IStyledComponent<'web',{
    onClick:()=>void,
    children:string
}> = styled.div({fontSize:20,fontWeight:600})

interface LoadProp{
    spin:number,
    back:string
}
function LoadBack(arg:string):string{
    return arg=='black'?'white':'black'
}
export const Spin:IStyledComponent<'web',LoadProp>=styled.div`
  width:60px;
  height:60px;
  border-radius:50%;
  border-left:15px solid transparent;
  border-top:15px solid ${({back}:LoadProp)=>LoadBack(back)};
  border-bottom:15px solid ${({back}:LoadProp)=>LoadBack(back)};
  border-right:15px solid ${({back}:LoadProp)=>LoadBack(back)};
  rotate:${({spin}:LoadProp)=>spin}deg
`
interface block{
    back:string,
    children:string[]|JSX.Element
}
export const Block:IStyledComponent<'web',block>=styled.div`
width:100%;
justify-content:center;
display:flex;
text-align:center;
color:${({back}:block)=>LoadBack(back)}
`