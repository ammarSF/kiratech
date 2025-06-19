<template>
  <div class="relative w-full max-w-sm">
    <!-- Search Icon -->
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
      </svg>
    </div>

    <!-- Input Field -->
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      placeholder="Search by name or email..."
      class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
    />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import type { PropType } from 'vue';

interface UserItem {
  id: number;
  name?: string;
  email?: string;
}

const props = defineProps({
 
  modelValue: {
    type: String,
    default: ''
  },
  
  list: {
    type: Array as PropType<UserItem[]>,
    default: () => []
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void,
  (e: 'update:filteredList', list: UserItem[]): void
}>();

watch(
  [() => props.modelValue, () => props.list], 
  ([searchQuery, fullList]) => {
    if (!searchQuery) {
      emit('update:filteredList', fullList);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    const filtered = fullList.filter(item => 
      item.name?.toLowerCase().includes(lowerCaseQuery) ||
      item.email?.toLowerCase().includes(lowerCaseQuery)
    );
    emit('update:filteredList', filtered);
  }, 
  { immediate: true } 
);
</script>
