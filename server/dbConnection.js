const mongoose = require("mongoose");

// Connecting to database
mongoose.connect(
   env
);
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: { type: String },
    status: { type: String },
});

const Todos = mongoose.model("Todos", TodoSchema);

module.exports = {
    Todos,
};
