
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    file_name: { type: String, required: true },
    saved_name: { type: String, required: true },
    relative_path: { type: String, required: true },
    label: { type: String },
    added: { type: Date, delete: new Date() },
});

ImageSchema
    .virtual('full_path')
    .get(() => {
        return this.relative_path + this.file_name;
    });

//Export model
module.exports = mongoose.model('Image', ImageSchema);