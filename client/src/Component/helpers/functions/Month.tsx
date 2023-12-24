
type map = ReadonlyMap<string,string> 

export default (month:string):string=>{  
   const months:map = new Map([
      ["январь","January"],
      ["февраль","February"],
      ["март","March"],
      ["апрель","April"],
      ["май","May"],
      ["июнь","June"],
      ["июль","July"],
      ["август","August"],
      ["сентябрь","September"],
      ["октябрь","October"],
      ["ноябрь","November"],
      ["декабрь","December"]
   ]);
   
  return months.get(month) ?? "";
};