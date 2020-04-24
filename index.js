// Using ES6 imports
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
//objectId, not really needed, created by default
const ObjectId = mongoose.ObjectId;

const mongoDBUrl = "localhost";
const mongoDBPort = "27017";
const mongoDBDatabase = "StudentRegBackend";

//student schema
const studentSchema = new Schema({
    fName: {type: "String", required: true},
    lName: {type: "String", required: true},
    email: {type: "String", required:true}, 
    phone: {type: "String", required: true},
    date: {type: Date, default: Date.now, required: true},
    status: {type: "Boolean", default: false, required:true}

});

//create student model
const Student = mongoose.model("Student",studentSchema, "Students");

// Add a new Student document
const addStudent = async(studentObj) => { 
    try {
        //create new student object 
        const newStudent = new Student(studentObj); 
        //save student to database
        let savePromise = newStudent.save();  
       
        //return promise so we can print it after save
        return savePromise;
       
    }
    catch (err) {
        console.log(err);
    }
}


  //get all students from the student collection
  const getAllStudents = async() => {
      try{
          //return Promise
          return Student.find().exec();
      }
      catch(err){
          console.log("error is " + err);

      }

  }


  

//connect to the database
const connectToDB = async() => {
    try{
        const connectionInfo = `mongodb://${mongoDBUrl}:${mongoDBPort}/${mongoDBDatabase}`;
        const mongoDBConfigObject = {
            useNewUrlParser : true,
            useUnifiedTopology : true
        }
       await mongoose.connect(connectionInfo, mongoDBConfigObject );
    }
    catch(err){
        console.log(err);
    }
}

const main = async() => {

    try{

        await connectToDB();

        //create new student object
        const student = new Student();
        student.fName = "Fred";
        student.lName = "Johnson";
        student.email =  "fred.johnson@amarillocollege.com";
        student.phone =  "8062345383";
        student.status =  true;
        student.date =  Date.now();

        //call addStudent to save the new student to the database
        await addStudent(student);

        //get and print the students in the database
        let allStudents = await getAllStudents();
        console.log("All Students: "  +  allStudents);

    }
    catch(error){
        console.log(`main error: ${error}`);
    }
}


main();