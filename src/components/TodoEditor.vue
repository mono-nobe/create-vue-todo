<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  selectedTodo: Object,
});
const emits = defineEmits(["save", "delete"]);

const todoText = computed({
  get: () => {
    if (props.selectedTodo === undefined) {
      return "";
    }

    return props.selectedTodo.text;
  },
  set: (value) => {
    editedTodoText.value = value;
  },
});

const editedTodoText = ref("");
const saveTodo = () => {
  if (editedTodoText.value === "") {
    return;
  }

  emits("save", editedTodoText.value);
};
const deleteTodo = () => emits("delete", props.selectedTodo);
</script>

<template>
  <div>
    <form id="todo-form">
      <textarea
        cols="30"
        rows="15"
        placeholder="文字を入力してください"
        v-model="todoText"
        required
      ></textarea>
    </form>
    <div>
      <button @click="saveTodo" form="todo-form" class="save-btn">保存</button>
      <button @click="deleteTodo" class="delete-btn">削除</button>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
}

.save-btn {
  margin-right: 5%;
  width: 70%;
}

.delete-btn {
  width: 25%;
}
</style>
