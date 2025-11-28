<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Sheet Music Inventory</h1>
    <button
      @click="createNew"
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
    >
      Create New Sheet Music
    </button>
    <input
      type="file"
      accept=".xlsx,.xls"
      @change="handleFileUpload"
      ref="fileInput"
      style="display: none"
    />
    <button
      @click="$refs.fileInput.click()"
      class="bg-green-500 text-white px-4 py-2 rounded mb-4 ml-2"
    >
      Upload Excel
    </button>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Composer</th>
            <th>Genre</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sheetMusic" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.composer }}</td>
            <td>{{ item.genre }}</td>
            <td>
              <a
                v-if="item.link"
                :href="item.link"
                target="_blank"
                class="text-blue-500 hover:text-blue-700 underline"
              >
                View </a
              ><span v-else>-</span>
            </td>
            <td>
              <button
                @click="openEditModal(item.id)"
                class="px-2 py-1 rounded mr-2 cursor-pointer"
              >
                <Icon icon="line-md:edit" class="h-5 w-5" />
              </button>
              <button
                @click="deleteItem(item.id)"
                class="px-2 py-1 rounded mr-2 cursor-pointer"
              >
                <Icon icon="line-md:document-delete" class="h-5 w-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for creating new sheet music -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center z-50"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">Create New Sheet Music</h2>
        <form @submit.prevent="submitCreate">
          <div class="mb-4">
            <label
              class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              for="title"
            >
              Title
            </label>
            <input
              v-model="newItem.title"
              type="text"
              id="title"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              for="composer"
            >
              Composer
            </label>
            <input
              v-model="newItem.composer"
              type="text"
              id="composer"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              for="genre"
            >
              Genre
            </label>
            <input
              v-model="newItem.genre"
              type="text"
              id="genre"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              for="link"
            >
              Link
            </label>
            <input
              v-model="newItem.link"
              type="url"
              id="link"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="https://example.com"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              for="quantity"
            >
              Quantity
            </label>
            <input
              v-model.number="newItem.quantity"
              type="number"
              id="quantity"
              min="1"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
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

    <!-- Modal for editing sheet music -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">Edit Sheet Music</h2>
        <form @submit.prevent="submitEdit">
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="edit-title"
            >
              Title
            </label>
            <input
              v-model="editItem.title"
              type="text"
              id="edit-title"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="edit-composer"
            >
              Composer
            </label>
            <input
              v-model="editItem.composer"
              type="text"
              id="edit-composer"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="edit-genre"
            >
              Genre
            </label>
            <input
              v-model="editItem.genre"
              type="text"
              id="edit-genre"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="edit-link"
            >
              Link
            </label>
            <input
              v-model="editItem.link"
              type="url"
              id="edit-link"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="https://example.com"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="edit-quantity"
            >
              Quantity
            </label>
            <input
              v-model.number="editItem.quantity"
              type="number"
              id="edit-quantity"
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
              Update
            </button>
            <button
              type="button"
              @click="closeEditModal"
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
import * as XLSX from "xlsx";
import {
  getAllSheetMusic,
  createSheetMusic,
  updateSheetMusic,
  deleteSheetMusic,
} from "../crud/sheetMusic.js";

const sheetMusic = ref([]);
const showModal = ref(false);
const showEditModal = ref(false);
const newItem = ref({
  title: "",
  composer: "",
  genre: "",
  link: "",
  quantity: 1,
});
const editItem = ref({
  id: "",
  title: "",
  composer: "",
  genre: "",
  link: "",
  quantity: 1,
});
const fileInput = ref(null);

const fetchSheetMusic = async () => {
  try {
    sheetMusic.value = await getAllSheetMusic();
  } catch (error) {
    console.error("Error fetching sheet music:", error);
  }
};

const createNew = () => {
  showModal.value = true;
};

const submitCreate = async () => {
  try {
    const newSheetMusic = await createSheetMusic(newItem.value);
    sheetMusic.value.push(newSheetMusic);
    closeModal();
  } catch (error) {
    console.error("Error creating sheet music:", error);
  }
};

const closeModal = () => {
  showModal.value = false;
  newItem.value = { title: "", composer: "", genre: "", link: "", quantity: 1 };
};

const submitEdit = async () => {
  try {
    const { id, ...updateData } = editItem.value;
    const result = await updateSheetMusic(id, updateData);
    const index = sheetMusic.value.findIndex((item) => item.id === id);
    sheetMusic.value[index] = result;
    closeEditModal();
  } catch (error) {
    console.error("Error updating sheet music:", error);
  }
};

const closeEditModal = () => {
  showEditModal.value = false;
  editItem.value = {
    id: "",
    title: "",
    composer: "",
    genre: "",
    link: "",
    quantity: 1,
  };
};

const openEditModal = (id) => {
  const item = sheetMusic.value.find((item) => item.id === id);
  if (!item) return;

  editItem.value = { ...item };
  showEditModal.value = true;
};

const deleteItem = async (id) => {
  try {
    await deleteSheetMusic(id);
    sheetMusic.value = sheetMusic.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error("Error deleting sheet music:", error);
  }
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Assume first row is headers: title, composer, genre, link, quantity
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];
        if (row.length >= 5) {
          const sheetData = {
            title: row[0] || "",
            composer: row[1] || "",
            genre: row[2] || "",
            link: row[3] || "",
            quantity: parseInt(row[4]) || 1,
          };
          const newItem = await createSheetMusic(sheetData);
          sheetMusic.value.push(newItem);
        }
      }
      alert("Excel data uploaded successfully!");
    } catch (error) {
      console.error("Error processing Excel file:", error);
      alert("Error uploading Excel file. Please check the file format.");
    }
  };
  reader.readAsArrayBuffer(file);
  // Reset file input
  event.target.value = "";
};

onMounted(() => {
  fetchSheetMusic();
});
</script>
