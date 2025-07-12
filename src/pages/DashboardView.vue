<script setup>
import { gymHealthFacts, workoutProgram } from '../workoutsData.js';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const todayTip = Math.floor(Math.random() * gymHealthFacts.length);

// Get completed workouts from localStorage
const completedWorkout = ref(JSON.parse(localStorage.getItem("completedWorkouts") || "[]"));

// Get the highest consecutive day completed (no gaps allowed)
const getUnlockedIndex = () => {
    let i = 0;
    while (completedWorkout.value.includes(i)) {
        i++;
    }
    return i;
};
const unlockedIndex = ref(getUnlockedIndex());

// Navigate to workout
const startWorkout = (workout, idx) => {
    router.push({ path: '/workout', query: { day: idx, workout: workout } });
};

// Only unlock the next available day
const isDayUnlocked = (idx) => {
    return idx <= unlockedIndex.value;
};

// Reset progress
const resetProgress = () => {
  // Remove completed workouts
  localStorage.removeItem("completedWorkouts");

  // Remove all saved weights
  for (let key in localStorage) {
    if (key.startsWith("weights_day_")) {
      localStorage.removeItem(key);
    }
  }

  // Reset reactive state
  completedWorkout.value = [];
  unlockedIndex.value = 0;

  // Optional: Reload the page if reactivity doesn't reflect immediately
  // location.reload();
};

</script>


<template>
    <section class="my-10">
        <div class="bg-blue-100 p-7 rounded-md">
            <h2 class="text-2xl font-bold">Welcome</h2>
            <div class="my-5 text-lg">
                <span class="font-semibold mr-2">Tip:</span>{{ gymHealthFacts[todayTip] }}
            </div>

            <button class="btn-primary" @click="startWorkout(workoutProgram[unlockedIndex]?.name || '', unlockedIndex)">
                Start Workout <i class="fa-solid fa-dumbbell ml-2"></i>
            </button>
            <button class="btn-danger ml-3" @click="resetProgress()">
                Reset Progress <i class="fa-solid fa-trash-can-arrow-up"></i>
            </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 max-w-200 my-10 gap-3">
            <button
                v-for="(workout, idx) in workoutProgram"
                :key="idx"
                :disabled="!isDayUnlocked(idx)"
                class="flex flex-col gap-2 rounded-md p-7 border-4 text-white transition duration-200"
                :class="[
                    isDayUnlocked(idx) ? 'bg-blue-400 hover:bg-blue-500 hover:border-blue-400 cursor-pointer' : 'bg-gray-400 border-gray-300 cursor-not-allowed'
                ]"
                @click="startWorkout(workout.name, idx)"
            >
                <span class="text-lg">
                    Day {{ (parseInt(idx) + 1) < 9 ? "0" + (parseInt(idx) + 1) : (parseInt(idx) + 1) }}
                </span>
                <span class="text-2xl font-semibold">{{ workout.name }}</span>
            </button>
        </div>
    </section>
</template>
