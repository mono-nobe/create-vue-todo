<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  selectedTodo: Object,
});
const emits = defineEmits(["save", "delete"]);

const editedTodoText = ref("");
const saveTodo = () => emits("save", editedTodoText.value);
const deleteTodo = () => emits("delete");

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
</script>

<template>
  <div>
    <textarea
      cols="30"
      rows="10"
      placeholder="文字を入力してください"
      v-model="todoText"
    ></textarea>
  </div>
  <div>
    <button @click="saveTodo">保存</button>
    <button @click="deleteTodo">削除</button>
  </div>

  <div>-----------------------------------</div>

  <div>this is todo!!!</div>
  <div>{{ todoText }}</div>
  <div>-----------------------------------</div>
</template>

<style scoped>
textarea {
  resize: none;
}
</style>
