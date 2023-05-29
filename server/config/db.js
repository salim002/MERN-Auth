import mongoose from "mongoose";

const URI = `mongodb+srv://salim_md:mdsalim@cluster0.5lx7gov.mongodb.net/mern-auth-project`;

const connectToMongo = async ()=>{
    const res = await mongoose.connect(URI);
    if(res){
        console.log("Database Connected successfully");
    }
    else{
        console.log("Some error occured while connecting to the Database");
    }
}

export default connectToMongo;