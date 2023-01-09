<script setup>
import TodoEditor from "../components/TodoEditor.vue";
import { ref } from "vue";

const selectedTodo = ref();
const selectTodo = (todo) => {
  selectedTodo.value = todo;
};

let todos = ref([
  {
    id: 1,
    text: "hoge",
  },
  {
    id: 2,
    text: "piyo",
  },
  {
    id: 3,
    text: "fuga",
  },
]);

function createTodo() {
  const id = detectMaxId();
  const todo = {
    id: id + 1,
    text: "",
  };

  todos.value.push(todo);
  selectTodo(todo);
}

function detectMaxId() {
  if (todos.value.length === 0) {
    return 0;
  }

  return Math.max(...todos.value.map((todo) => todo.id));
}

const saveTest = (text) => {
  selectedTodo.value.text = text;
};

const deleteText = (targetTodo) => {
  todos.value = todos.value.filter((todo) => todo !== targetTodo);
};
</script>

<template>
  <main>
    <div>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <button @click="selectTodo(todo)">{{ todo.text }}</button>
        </li>
        <li><button @click="createTodo">+</button></li>
      </ul>
    </div>

    <TodoEditor
      :selected-todo="selectedTodo"
      @save="saveTest"
      @delete="deleteText"
    />
    <div>-----------------------------------</div>
    <div>{{ selectedTodo }}</div>
  </main>
</template>
