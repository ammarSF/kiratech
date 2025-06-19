<template>
  <div 
    class="bg-white rounded-lg shadow-sm mb-3 flex items-center transition-all duration-200 hover:shadow-md cursor-pointer"
    :class="{ 'ring-2 ring-indigo-500': isSelected }"
    @click="$emit('card-click', user)"
  >

    <!-- User data grid -->
    <div class="grid grid-cols-5 gap-4 w-full text-sm text-gray-700 py-4 pr-4 px-4">
        <div class="truncate">{{ user.date || 'N/A' }}</div>
        <div class="font-medium text-gray-900 truncate">{{ user.name|| 'N/A' }}</div>
        <div class="truncate">{{ user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'N/A' }}</div>
        <div class="truncate">{{ user.country || 'N/A' }}</div>
        <div class="text-gray-500 truncate">{{ user.email || 'N/A' }}</div>
    </div>
  </div>
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
  user: {
    type: Object as PropType<UserItem>,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
});

defineEmits(['selection-changed', 'card-click']);
</script>
