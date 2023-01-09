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

  selectedTodo.value = undefined;
};
</script>

<template>
  <main>
    <div class="container">
      <div class="item todo-first-lines">
        <ul>
          <li v-for="todo in todos" :key="todo.id">
            <button
              @click="selectTodo(todo)"
              :class="
                todo !== selectedTodo
                  ? 'link-style-btn todo-first-line'
                  : 'selected-todo'
              "
            >
              {{ extractFirstLine(todo.text) }}
            </button>
          </li>
          <li>
            <button @click="createTodo" class="link-style-btn">＋</button>
          </li>
        </ul>
      </div>

      <div class="item todo-editor">
        <TodoEditor
          :selected-todo="selectedTodo"
          @save="saveTest"
          @delete="deleteText"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
ul {
  list-style: none;
}

.container {
  display: flex;
}

.todo-first-lines {
  width: 150px;
  word-break: break-all;
}

.link-style-btn {
  text-align: left;
  cursor: pointer;
  border: none;
  background: none;
  color: #0033cc;
}
.link-style-btn:hover {
  text-decoration: underline;
  color: #002080;
}

.todo-first-line {
  text-decoration: underline;
}

.selected-todo {
  border: none;
  background: none;
}

.todo-editor {
  margin-left: 30px;
}
</style>
