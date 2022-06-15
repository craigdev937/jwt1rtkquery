import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name: { type: "String", required: true },
    email: {
        type: "String", lowercase: true,
        unique: true, index: true,
        required: [true, "Can't be empty"],
        match:[/\S+@\S+\.\S/, "Is invalid"]
    },
    password: { 
        type: "String", 
        required: [true, "Enter the password"]
    },
    tokens: [],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "NoteModel"
    }]
});

UserSchema.pre("save", function(next){
    const user = this;
    if (!user.isModified("password"))
    return next();
    bcrypt.genSalt(10, function(error, salt){
        if (error) return next(error);
        bcrypt.hash(user.password, salt, 
                function(error, hash){
            if (error) return next(error);
            user.password = hash;
            next();
        })
    });
});

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};

UserSchema.methods.generateAuthToken = 
async function() {
    const user = this;
    const token = jwt.sign(
        {_id: user._id.toString()}, 
        process.env.JWT_SECRET);
    console.log(token);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

UserSchema.statics.findByCredentials = 
async function(email, password) {
    const user = await UserModel.findOne({email});
    if (!user) throw new Error("Invalid Email and Password");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Email and Password");
    return user;
};

export const UserModel = new mongoose.model("User", UserSchema);


