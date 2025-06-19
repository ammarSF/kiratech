<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { apiService } from '@/services/apiService'
import Profile from '@/components/Profile.vue'
import SelectableList from '@/components/SelectableList.vue'
import ActionButton from '@/components/ActionButton.vue';
import Search from '@/components/SearchFunction.vue';

interface ApiUser {
  id: number;
  name: string;
  email: string;
}

interface UserItem {
  id: number;
  name: string;
  email: string;
  date: string;
  gender: string;
  country: string;
}

const userList = ref<UserItem[]>([]);
const isLoading = ref<boolean>(true);
const isRefreshing = ref(false);
const searchQuery = ref('');

const fetchUsers = async (): Promise<void> => {
    isLoading.value = true;
    try {
        const usersFromApi: ApiUser[] = await apiService.getUsers();
        userList.value = usersFromApi.results.map((u: ApiUser): UserItem => ({
            id: u.id,
            name: u.name.title + ' ' + u.name.first + ' ' + u.name.last,
            email: u.email,
            date: new Date(u.dob.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
            gender: u.gender,
            country: u.location.country       
        }));

    } catch (error: unknown) { 
        console.error("Failed to fetch users:", error);
    } finally {
        isLoading.value = false;
    }
};

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return userList.value;
  }
  const lowerCaseQuery = searchQuery.value.toLowerCase();
  return userList.value.filter(user => 
    user.name?.toLowerCase().includes(lowerCaseQuery) ||
    user.email?.toLowerCase().includes(lowerCaseQuery)
  );
});

const handleAction = (actionName: string) => {
  if (actionName === 'refresh-users') {
    fetchUsers();
  }
};


onMounted(fetchUsers);
</script>


<template>
  <main>
    
    <Profile />
    <br />
    <div v-if="!isLoading" >
      <div class="w-full flex justify-center mb-4">
        <Search 
          v-model="searchQuery"
          :list="originalUserList"
          @update:filteredList="filteredUserList = $event"
        />
      </div>
      <SelectableList :items="filteredUsers" :loading="isLoading"  />
      <div class="w-full flex justify-center py-4">
        <ActionButton
          action="refresh-users"
          text="Refresh"
          :loading="isRefreshing"
          @perform-action="handleAction"
        />
      </div>
    </div>
    
    
  </main>
</template>

