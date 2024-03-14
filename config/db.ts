import mongoose from "mongoose";
const dbConfiq :string | undefined= "mongodb://127.0.0.1:27017/typeScript-auth"

const conectDb = async()=>{
    try {
        const conect = await mongoose.connect(dbConfiq)
        console.log(`MongoDb conected: ${conect.connection.host}`);
    } catch (error) {
        console.error(`Error:${error}`)
        process.exit(1);
    }

}

export default conectDb