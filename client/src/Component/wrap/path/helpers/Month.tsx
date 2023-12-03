
export default (month:string):string=>{
   switch (month) {
    case "январь":
      return "January";
    case "февраль":
      return "February";
    case "март":
      return "March";
    case "апрель":
      return "April";
    case "май":
      return "May";
    case "июнь":
      return "June";
    case "июль":
      return "July";
    case "август":
      return "August";
    case "сентябрь":
      return "September";
    case "октябрь":
      return "October";
    case "ноябрь":
      return "November";
    case "декабрь":
      return "December";
    default:
      return "";
   };
};