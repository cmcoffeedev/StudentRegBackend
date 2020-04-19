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
    status: {type: "Boolean", default: false, required:true}

});

const Student = mongoose.model("Student",studentSchema, "Students");

//save a dummy student
  const saveStudent = async() => {

    const student = new Student();
    student.fName = "Chris";
    student.lName = "Coffee";
    student.email =  "cmcoffee@amarillocollege.com",
    student.phone =  "8062368672",
    student.status =  true
   
    student.save(function (err) {
        console.log("saved data");
        getAll();
        //
      });

  }

  //get all students from the student collection
  const getAllStudents = async() => {
      try{
          await Student.find().exec((err, StudentCollection) => {
              if(err){
                  console.log("error getting tree collection");
              }
              console.log({ StudentCollection });
          });
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
    await connectToDB();
    // await saveStudent();
    await getAllStudents();

}


main();