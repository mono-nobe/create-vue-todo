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
  <div v-show="selectedTodo !== undefined">
    <form>
      <textarea
        cols="30"
        rows="10"
        placeholder="文字を入力してください"
        v-model="todoText"
        required
      ></textarea>
      <div>
        <input type="submit" value="保存" @click="saveTodo" />
        <input type="submit" value="削除" @click="deleteTodo" />
      </div>
    </form>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
}
</style>
