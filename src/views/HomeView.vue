<script setup>
import TodoEditor from "../components/TodoEditor.vue";
import { ref } from "vue";

const selectedTodo = ref();
const selectTodo = (todo) => {
  selectedTodo.value = todo;
};

const todos = ref([]);
if (localStorage.todos !== undefined) {
  todos.value = JSON.parse(localStorage.getItem("todos"));
}

const extractFirstLine = (text) => {
  return text.split("\n")[0];
};

const reset = () => {
  localStorage.clear();
};

const createTodo = () => {
  const id = detectMaxId();
  const todo = {
    id: id + 1,
    text: "",
  };

  todos.value.push(todo);
  selectTodo(todo);
};

const detectMaxId = () => {
  if (todos.value.length === 0) {
    return 0;
  }

  return Math.max(...todos.value.map((todo) => todo.id));
};

const saveTest = (text) => {
  selectedTodo.value.text = text;
  localStorage.setItem("todos", JSON.stringify(todos.value));
};

const deleteText = (targetTodo) => {
  todos.value = todos.value.filter((todo) => todo !== targetTodo);
  localStorage.setItem("todos", JSON.stringify(todos.value));
};
</script>

<template>
  <main>
    <div>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <button @click="selectTodo(todo)">
            {{ extractFirstLine(todo.text) }}
          </button>
        </li>
        <li><button @click="createTodo">+</button></li>
        <li><button @click="reset">reset</button></li>
      </ul>
    </div>

    <TodoEditor
      :selected-todo="selectedTodo"
      @save="saveTest"
      @delete="deleteText"
    />
  </main>
</template>
