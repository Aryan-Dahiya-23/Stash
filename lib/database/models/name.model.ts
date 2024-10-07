import { Schema, model, models } from "mongoose";

const NameSchema = new Schema({
    customName: {type: String, required: true, unique: true},
    walletAddress: {type: String, required: true, unique: true}
})

const Name = models.Name || model('Name', NameSchema);

export default Name;