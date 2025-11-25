<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Sheet Music Inventory</h1>
    <button
      @click="createNew"
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
    >
      Create New Sheet Music
    </button>
    <table class="min-w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100 dark:bg-gray-700">
          <th class="border border-gray-300 px-4 py-2">Title</th>
          <th class="border border-gray-300 px-4 py-2">Composer</th>
          <th class="border border-gray-300 px-4 py-2">Quantity</th>
          <th class="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in sheetMusic"
          :key="item.id"
          class="hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td class="border border-gray-300 px-4 py-2">{{ item.title }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ item.composer }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ item.quantity }}</td>
          <td class="border border-gray-300 px-4 py-2">
            <button
              @click="editItem(item.id)"
              class="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              @click="deleteItem(item.id)"
              class="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for creating new sheet music -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">Create New Sheet Music</h2>
        <form @submit.prevent="submitCreate">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="title"
            >
              Title
            </label>
            <input
              v-model="newItem.title"
              type="text"
              id="title"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="composer"
            >
              Composer
            </label>
            <input
              v-model="newItem.composer"
              type="text"
              id="composer"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="quantity"
            >
              Quantity
            </label>
            <input
              v-model.number="newItem.quantity"
              type="number"
              id="quantity"
              min="1"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const sheetMusic = ref([]);
const showModal = ref(false);
const newItem = ref({
  title: "",
  composer: "",
  quantity: 1,
});

const API_BASE_URL = "http://localhost:3000/api";

const fetchSheetMusic = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sheetmusic`);
    sheetMusic.value = response.data;
  } catch (error) {
    console.error("Error fetching sheet music:", error);
  }
};

const createNew = () => {
  showModal.value = true;
};

const submitCreate = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/sheetmusic`,
      newItem.value
    );
    sheetMusic.value.push(response.data);
    closeModal();
  } catch (error) {
    console.error("Error creating sheet music:", error);
  }
};

const closeModal = () => {
  showModal.value = false;
  newItem.value = { title: "", composer: "", quantity: 1 };
};

const editItem = async (id) => {
  const item = sheetMusic.value.find((item) => item.id === id);
  if (!item) return;

  // For simplicity, just update with new values (in real app, use a form)
  const updatedItem = { ...item, title: item.title + " (Edited)" };
  try {
    await axios.put(`${API_BASE_URL}/sheetmusic/${id}`, updatedItem);
    const index = sheetMusic.value.findIndex((item) => item.id === id);
    sheetMusic.value[index] = updatedItem;
  } catch (error) {
    console.error("Error updating sheet music:", error);
  }
};

const deleteItem = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/sheetmusic/${id}`);
    sheetMusic.value = sheetMusic.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error("Error deleting sheet music:", error);
  }
};

onMounted(() => {
  fetchSheetMusic();
});
</script>
