const mongoose = require('mongoose');
const mongoURI="mongodb+srv://kartik:123@cluster0.93n9df0.mongodb.net/inotebook"
// const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDb%20Compass&directConnection=true&ssl=true"



const connectToMongo=async()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully")
    })
}
// mongoose.connect(mongoURI, {
//     useNewURLParser: true,
//     useUnifiedTopology: true
//   },6000000).then(console.log("connected to server")).catch((err) => console.log(err));

module.exports=connectToMongo;