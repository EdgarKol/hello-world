<template>
  <div>
    <div class="row">
      <div class="col">
        <h2>{{ title }}</h2>

        <ul class="list-group mb-3">
          <li
            v-for="(todo, _id) in todosFromServer"
            :key="todo"
            class="list-group-item"
            @click="getTodo(todo._id)"
          >
            {{ todo.title }} {{ todo.status }}
            <button
              @click="updateStatus"
              class="btn btn-primary w-10"
              display="hidden"
            >
              Complete
            </button>
            <button
              @click="deleteTodo(todo, _id)"
              key="todo, _id"
              class="btn btn-primary w-10"
            >
              Remove
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <input
          v-model="newTodo"
          type="text"
          name="newTodo"
          class="form-control"
        />
      </div>
      <div class="col">
        <button @click="addTodo" type="submit" class="btn btn-primary w-100">
          Add new todo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "TodoList",
  props: {
    title: String,
  },


  setup() {
    const todos = ref(["Read a book", "Go for a walk", "Eat food"]);
    const newTodo = ref("");

    const todosFromServer = ref([]);
    const singleTodo = ref({});

    async function getTodos() {
      const result = await axios.get("/api/get-todos");
      todosFromServer.value = result.data;
      console.log(result.data);
    }
    async function deleteTodo(id){
      const result = await axios.delete("/api/delete-todo/" + id)
      todosFromServer.value = result.data;
      console.log(result.data);
    }

    async function getTodo(id) {
      const result = await axios.get("/api/get-todo/" + id);
      singleTodo.value = result.data;
      console.log(result.data);
    }

    async function addTodo() {
      await axios.post("/api/add-todo", {
        title: newTodo.value,
        status: "ACTIVE",
      });
      newTodo.value = "";
      await getTodos();
    }
    getTodos();

    function addNewTodo() {
      todos.value.push(newTodo.value);
      newTodo.value = "";
    }

    return {
      todos,
      newTodo,
      addNewTodo,
      todosFromServer,
      addTodo,
      singleTodo,
      getTodo,
      deleteTodo
    };
  },
};
</script>
