import mongoose from "mongoose";

const crudSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    hobbies: {
        type: String,
        required: true
    }
})

const Crud = mongoose.model("Crud", crudSchema);

export default Crud;