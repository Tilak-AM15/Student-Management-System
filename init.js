const mongoose=require("mongoose");
const Student=require("./models/student.js");
main().then((res)=>console.log("success")).catch((err)=>console.log(err));
async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/stdntapp");
  
}
  Student.insertMany([
    {
    name:"tilak",
    usn:"4UB22CS055",
    mail:"tilak@gmail.com",
    percent:95
  },
    {
    name:"guru",
    usn:"4UB22CS016",
    mail:"guru@gmail.com",
    percent:98
  },
    {
    name:"akhil",
    usn:"4UB22CS053",
    mail:"akhil@gmail.com",
    percent:99
  },
])