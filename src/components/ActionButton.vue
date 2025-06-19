<template>
  <button
    @click="$emit('perform-action', action)"
    :disabled="loading"
    class="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-70 disabled:cursor-wait"
  >
    <!-- Loading Spinner (shown when loading is true) -->
    <svg 
      v-if="loading" 
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>

    <!-- Icon (shown when not loading and action matches) -->
    <div v-else-if="action === 'refresh-users'" class="mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
      </svg>
    </div>

    <!-- Button Text -->
    <span>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
// Props definition
defineProps({
  // The specific action this button should perform (e.g., 'refresh-users')
  action: {
    type: String,
    required: true
  },
  // Controls the loading state and disables the button
  loading: {
    type: Boolean,
    default: false
  },
  // The text displayed on the button
  text: {
    type: String,
    required: true
  }
});

// Emits definition
defineEmits<{
  (e: 'perform-action', action: string): void
}>();
</script>
