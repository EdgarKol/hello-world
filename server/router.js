const express = require("express");
const router = express.Router();
const { Todos } = require("./dbConnection");

router.get("/calc", function(req, res) {
    const a = 4;
    const b = 4;
    const result = a + b;
    res.send({ result });
});

// request === req ja response === res
router.get("/get-todos", async function(request, response) {
    const result = await Todos.find();
    console.log(result);
    response.send(result);
});

router.get("/get-todo/:id", async function(request, response) {
    const result = await Todos.findOne({ _id: request.params.id });
    console.log(result);
    response.send(result);
});

router.post("/add-todo", async function(request, response) {
    if (request.body.title) {
        await Todos.create(request.body);
        console.log("Lisa todo");
    }
    response.send("done");
});


router.delete("/:id", async(request, response, next) => {
    try {
        let toDo = await Todos.findById(request.body._id);
        if (!toDo) {
            return response
                .status(400)
                .json({ success: false, msg: "Task Todo not exist" });
        }
        toDo = await Todos.findByIdAndDelete(request.params._id);

        response.status(200).json({
            success: true,
            msg: "Successfully Deleted task.",
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;