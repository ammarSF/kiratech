<template>
  <!-- Main container for the banner -->
  <div class="bg-cyan-400 w-full">
    <!-- Centered content container -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-start py-10">
        
        <!-- Profile Picture -->
        <!-- The negative margin pulls the image down to overlap the bottom edge -->
        <div class="flex-shrink-0 -mb-20">
          <img 
            class="h-32 w-32 rounded-lg object-cover border-4 border-white shadow-lg" 
            :src="avatarUrl" 
            alt="User profile picture"
            onerror="this.onerror=null;this.src='https://placehold.co/128x128/e2e8f0/e2e8f0?text=...'"
          >
        </div>
        
        <!-- User Info -->
        <div class="ml-6">
          <h1 class="text-3xl font-bold text-white">{{ name }}</h1>
          <p class="text-sm text-cyan-100 mt-1">{{ lastOnline }}</p>
        </div>
        
        <!-- Action Buttons -->
        <!-- ml-auto pushes this block to the far right -->
        <div class="ml-auto flex items-center space-x-4">
          
          <!-- Send Message Button -->
          <button class="bg-white text-cyan-600 font-semibold px-4 py-2 rounded-md shadow-sm hover:bg-cyan-50 transition-colors duration-200 flex items-center space-x-2">
            <!-- Paper plane icon SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            <span>Send Message</span>
          </button>
          
          <!-- Add Friend Button -->
          <button class="border-2 border-white text-white font-semibold px-4 py-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors duration-200 flex items-center space-x-2">
            <!-- Plus icon SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span>Add Friend</span>
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Use defineProps to make the component reusable.
// You can pass these values when you use the component.
defineProps({
  name: {
    type: String,
    default: 'John Doe'
  },
  lastOnline: {
    type: String,
    default: 'Last online: 2 days ago'
  },
  avatarUrl: {
    type: String,
    // Using a placeholder image if no URL is provided
    default: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
});
</script>

<style scoped>
/* Scoped styles can be added here if needed, but Tailwind handles most of it. */
</style>

