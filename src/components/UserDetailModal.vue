<template>
  <transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 bg-grey bg-opacity-60 z-50 flex justify-center items-center p-4" @click.self="close">
      <div v-if="user" class="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all" :class="isOpen ? 'scale-100' : 'scale-95'">

        <!-- User Details Section -->
        <div class="p-6 text-center">
            <h2 class="text-2xl font-bold text-gray-800">{{ user.name }}</h2>
            <p class="text-sm text-gray-500">{{ user.email }}</p>

            <ul class="mt-6 text-left space-y-4">
              <li class="flex flex-col">
                <span class="text-sm font-semibold text-gray-500">DOB</span>
                <span class="text-gray-800">{{ user.date }}</span>
              </li>
              <li class="flex flex-col">
                <span class="text-sm font-semibold text-gray-500">Gender</span>
                <span class="text-gray-800">{{ user.gender }}</span>
              </li>
              <li class="flex flex-col">
                <span class="text-sm font-semibold text-gray-500">Country</span>
                <span class="text-gray-800">{{ user.country }}</span>
              </li>
            </ul>
        </div>

        <!-- Modal Footer with Close Button -->
        <div class="px-6 pb-6 text-right">
             <button @click="close" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                Close
            </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

interface UserItem {
  id: number;
  date?: string;
  name?: string;
  gender?: string;
  country?: string;
  email?: string;
}

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object as PropType<UserItem | null>,
    default: null
  }
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active .transform,
.fade-leave-active .transform {
    transition: all 0.3s ease;
}
</style>


