import mongoose,{Schema, Document} from "mongoose"
import bcrypt from 'bcryptjs'


export interface UserDetails extends Document {
    name:string,
    email : string,
    password : string,
    mobile : number,
    matchPassword(enteredPassword: string): Promise<boolean>;
}


const userSchema = new Schema<UserDetails>({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require: true,
        unique: true
    },
    mobile:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    
})


// hashing password
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

// comaring the password when the user login
userSchema.methods.matchPassword = async function(enteredPassword:string){
    return await bcrypt.compare(enteredPassword, this.password)
}



export const User = mongoose.model<UserDetails>('User',userSchema)
