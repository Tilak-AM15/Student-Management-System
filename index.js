const express=require ("express");
const app=express ();
const session = require("express-session");
const flash = require("connect-flash");
const mongoose=require("mongoose");
const Teacher = require("./models/teacher.js");//require teachers
const Student=require ("./models/student.js");
const methodOverride=require("method-override")
let port=3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"))
app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true
}));

app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

const path=require ("path");
app.set;("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))

main().then((res)=>console.log("success")).catch((err)=> console.log(err));

async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/stdntapp");
}

 app.listen(port,()=>console.log(`listening to port 3000.....
enter http://localhost:3000/ `));
 app.get("/", (req, res) => {
  res.render("dashboard.ejs");
});


 app.get("/students",async(req,res)=>
  {
    let students=await Student.find();
    res.render("students/index.ejs",{students});
  })
app.get("/students/new",(req,res)=>{
  res.render("students/new.ejs");
})

app.post("/students",(req,res)=>{
  let{name,usn,mail,percent}=req.body;

  let newStudent=new Student({
    name:name,
    usn:usn,
    mail:mail,
    percent:percent
  });


  newStudent.save().then((res)=>console.log("data saved"))
  .catch((err)=>console.log(err));
  res.redirect("/students");
})

app.get("/students/:id/edit",async(req,res)=>{
  let {id}=req.params;
  let student= await Student.findById(id);
  res.render("students/edit.ejs",{student})
})


app.put("/students/:id",async(req,res)=>{
  let{id}=req.params;
  let{name:newName}=req.body;
  let{usn:newUsn}=req.body;
  let{mail:newMail}=req.body;
  let{percent:newPercent}=req.body;
  let updateStudent=await Student.findByIdAndUpdate(
    id,
    {
      name:newName,
      usn:newUsn,
      mail:newMail,
      percent:newPercent
    }
  );
  res.redirect("/students");
})


app.delete("/students/:id",async(req,res)=>{
  let{id}=req.params;
  let deleteStudent=await Student.findByIdAndDelete(id);
  res.redirect("/students");
});



const { body, validationResult } = require("express-validator");


app.get("/teachers", async (req, res) => {
  const teachers = await Teacher.find();
  res.render("teachers/index.ejs", { teachers, success: req.flash("success") });
});


app.get("/teachers/new", (req, res) => {
  res.render("teachers/new.ejs", { errors: [] });
});


app.post(
  "/teachers",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("subject").notEmpty().withMessage("Subject is required"),
    body("email").isEmail().withMessage("Invalid email")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("teachers/new.ejs", { errors: errors.array() });
    }

    const { name, subject, email } = req.body;
    await new Teacher({ name, subject, email }).save();
    req.flash("success", "Teacher added successfully");
    res.redirect("/teachers");
  }
);

app.get("/teachers/:id/edit", async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  res.render("teachers/edit.ejs", { teacher });
});


app.put("/teachers/:id", async (req, res) => {
  const { name, subject, email } = req.body;
  await Teacher.findByIdAndUpdate(req.params.id, { name, subject, email });
  req.flash("success", "Teacher updated");
  res.redirect("/teachers");
});


app.delete("/teachers/:id", async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  req.flash("success", "Teacher deleted");
  res.redirect("/teachers");
});

