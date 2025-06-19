<template>
  <div class="p-4 md:p-6 bg-gray-50 rounded-lg">
    <!-- Header Row -->
    <div class="grid grid-cols-5 gap-4 w-full px-4 mb-3 text-sm font-semibold text-gray-500 ml-9">
      <!-- ml-9 is to offset for the checkbox width in the rows -->
      <div class="truncate">Date</div>
      <div class="truncate">Name</div>
      <div class="truncate">Gender</div>
      <div class="truncate">Country</div>
      <div class="truncate">Email</div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center text-gray-500 py-8">
      Loading users...
    </div>
    
    <!-- Empty State -->
    <div v-else-if="!items || items.length === 0" class="text-center text-gray-500 py-8">
      No users to display.
    </div>

    <!-- User List -->
    <div v-else>
      <UserCard
        v-for="item in items"
        :key="item.id"
        :user="item"
        :isSelected="selectedItems.has(item.id)"
        @selection-changed="handleSelection"
        @card-click="openDetailModal"
      />
    </div>

    <!-- User Detail Modal -->
    <UserDetailModal
      :isOpen="isDetailModalOpen"
      :user="focusedUser"
      @close="closeDetailModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { PropType } from 'vue';
import UserCard from './UserCard.vue';
import UserDetailModal from './UserDetailModal.vue';

interface UserItem {
  id: number;
  date?: string;
  name?: string;
  gender?: string;
  country?: string;
  email?: string;
}

const props = defineProps({
  items: {
    type: Array as PropType<UserItem[]>,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits<{
  (e: 'selection-update', ids: number[]): void
}>();

const selectedItems = ref<Set<number>>(new Set());

const isDetailModalOpen = ref(false);
const focusedUser = ref<UserItem | null>(null);

const handleSelection = ({ id, selected }: { id: number; selected: boolean }) => {
  if (selected) {
    selectedItems.value.add(id);
  } else {
    selectedItems.value.delete(id);
  }
};

const openDetailModal = (user: UserItem) => {
  focusedUser.value = user;
  isDetailModalOpen.value = true;
};

const closeDetailModal = () => {
  isDetailModalOpen.value = false;
};

watch(selectedItems, (newSelection) => {
  emit('selection-update', Array.from(newSelection));
}, { deep: true });

</script>