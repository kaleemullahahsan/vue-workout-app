<script setup>
import { workoutProgram } from "../workoutsData"
import { reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const selectedWorkout = parseInt(route.query.day) || 0;
const selectedDay = selectedWorkout + 1;

const workout = route.query.workout || "Today's";
const weights = reactive([]);

// Load saved weights or initialize
onMounted(() => {
  const saved = localStorage.getItem(`weights_day_${selectedWorkout}`);
  if (saved) {
    const parsed = JSON.parse(saved);
    parsed.forEach((val, idx) => weights[idx] = val);
  } else {
    for (let i = 0; i < workoutProgram[selectedWorkout].workout.length; i++) {
      weights[i] = "";
    }
  }
});

// Save Weights
const saveWeights = () => {
  localStorage.setItem(`weights_day_${selectedWorkout}`, JSON.stringify(weights));
  router.push({ path: '/dashboard' });
};

// Disable Complete if any field is empty
const isCompleteDisabled = computed(() => {
  return weights.length === 0 || weights.some(val => !val || val.trim() === '');
});

// Complete Workout
const completeWorkout = () => {
  localStorage.setItem(`weights_day_${selectedWorkout}`, JSON.stringify(weights));

  // Save current day (0-based) to completedWorkouts
  const completed = JSON.parse(localStorage.getItem("completedWorkouts") || "[]");
  if (!completed.includes(selectedWorkout)) {
    completed.push(selectedWorkout);
    completed.sort((a, b) => a - b);
    localStorage.setItem("completedWorkouts", JSON.stringify(completed));
  }

  // Move to next workout if exists
  const nextDay = selectedWorkout + 1;
  if (nextDay < workoutProgram.length) {
    router.push({ path: "/workout", query: { day: nextDay, workout: workoutProgram[nextDay].name } });
  } else {
    alert("🎉 You've completed all workouts!");
    router.push({ path: '/dashboard' });
  }
};
</script>

<template>
  <section class="my-10">
    <div class="bg-blue-100 p-7 rounded-md">
      <div class="text-lg">
        <span class="font-semibold mr-2">Day {{ selectedDay < 10 ? "0" + selectedDay : selectedDay }}</span>
      </div>
      <h2 class="my-3 text-2xl md:text-3xl font-bold">{{ workout }} Workout</h2>
    </div>

    <div class="grid grid-cols-5 max-w-250 m-auto my-12 mb-5 gap-2 md:gap-8 border p-3 md:p-5 rounded-md">
      <!-- Headers -->
      <div class="workoutHead col-span-2">Exercise</div>
      <div class="workoutHead">Sets</div>
      <div class="workoutHead">Reps</div>
      <div class="workoutHead">Weights</div>

      <!-- Warmup Section -->
      <h3 class="text-xl font-bold">WarmUp</h3>
      <div
        class="workoutTable col-span-5 grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-10 text-center bg-gray-100 p-5 rounded-md"
        v-for="(workoutItem, idx) in workoutProgram[selectedWorkout].warmup"
        :key="'warmup-' + idx"
      >
        <div class="col-span-3 md:col-span-2 font-semibold">{{ workoutItem.name }}</div>
        <div>{{ workoutItem.sets }} Sets</div>
        <div>{{ workoutItem.reps }} Reps</div>
        <div>
          <input
            type="text"
            placeholder="15kg"
            disabled
            class="bg-blue-100 w-full p-1 md:p-2 rounded-md border-blue-200 border-4 opacity-50 cursor-not-allowed"
          />
        </div>
      </div>

      <!-- Main Workouts -->
      <h3 class="text-xl font-bold">Workouts</h3>
      <div
        class="workoutTable col-span-5 grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-10 text-center bg-gray-100 p-5 rounded-md"
        v-for="(workoutItem, idx) in workoutProgram[selectedWorkout].workout"
        :key="'workout-' + idx"
      >
        <div class="col-span-3 md:col-span-2 font-semibold">{{ workoutItem.name }}</div>
        <div>{{ workoutItem.sets }} Sets</div>
        <div>{{ workoutItem.reps }} Reps</div>
        <div>
          <input
            type="text"
            placeholder="15kg"
            v-model="weights[idx]"
            class="bg-blue-100 w-full p-2 rounded-md border-blue-200 border-4"
          />
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="max-w-250 m-auto mb-12 flex gap-5">
      <button class="btn-secondary" @click="saveWeights">Save & Exit</button>
      <button class="btn-primary" :disabled="isCompleteDisabled" @click="completeWorkout">Complete</button>
    </div>
  </section>
</template>
