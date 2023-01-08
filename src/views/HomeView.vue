<script setup>
import TheWelcome from "../components/TheWelcome.vue";
import TodoEditor from "../components/TodoEditor.vue";
import { ref } from "vue";

const selectedTodo = ref();
const selectTodo = (todo) => {
  selectedTodo.value = todo;
};

const todos = [
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
];

const saveTest = (text) => {
  selectedTodo.value.text = text;
};

const deleteText = (text) => {
  console.log("deleteText....");
  console.log(text);
};
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <div>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <button @click="selectTodo(todo)">{{ todo.text }}</button>
        </li>
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
