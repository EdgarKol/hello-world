const mongoose = require("mongoose");

// Connecting to database
mongoose.connect(
    "mongodb+srv://edgarkol:Joosep1234@cluster0.7pvlf.mongodb.net/TodosApp?retryWrites=true&w=majority", { useNewUrlParser: true }
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