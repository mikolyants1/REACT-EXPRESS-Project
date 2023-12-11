class Socket {
  current:number
  users:number[]

  constructor(){
    this.current = -1;
    this.users = []
  }
    
  addUser(id:number):void{
    this.current = id;
    const set:Set<number> = new Set([...this.users,id]);
    this.users = Array.from(set);
  };
      
  delUser():void{
    this.users = this.users
    .filter((i:number)=>i!==this.current);
  };
}

export default Socket