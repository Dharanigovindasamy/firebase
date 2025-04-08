<template>
  <div class="delete-icon" :style="{ width: 25 + 'px' }" @click="handleDelete">
    <!-- <p>Component Loaded!</p> ✅ Debugging -->
    <!-- <img :src="closeImage" alt="Delete Icon" width="30" height="30" /> -->
    <!-- <img src="/images/close-image.png" alt="Delete Icon" width="30" height="30" /> -->
    <!-- <font-awesome-icon icon="fa-solid fa-trash" /> -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
      <path
        d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
      />
    </svg>
  </div>
</template>


<script setup>
import { defineProps } from "vue";
//import deleteIconSrc from "../../assets/delete-icon.png";
//import deleteIconSrc from "@/assets/close-image.png";
//console.log("deleteIcon", deleteIconSrc);
//import closeImage from "@/assets/close-image.png";
const props = defineProps({
  params: {
    type: Object,
    required: true,
  },
});

const handleDelete = (param) => {
  console.log(param, "inside click");
  if (!props.params || !props.params.data) {
    console.error("Params or Data is missing in DeleteButtonRenderer");
    return;
  }
  const taskId = props.params.data.taskId;
  console.log("Delete task with id111: ", taskId, props.params);
  props.params?.context(taskId);
  console.log("Delete task with id: ", taskId);
  console.log("Props Params Context:", props.params.context);
};

// const deleteIcon = computed(() => deleteIconSrc);
//const deleteIcon = deleteIconSrc;
console.log("-----------------------------------------------");
//console.log("deleteIcon: ", deleteIcon);
</script>

<style scoped>
.delete-icon {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  /* height: 100%; */
  width: 30px;
  height: 30px;
}
.delete-icon img {
  transition: transform 0.2s;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  /* justify-content: center;
  align-items: center; */
}
.delete-icon img:hover {
  transform: scale(1.2);
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>