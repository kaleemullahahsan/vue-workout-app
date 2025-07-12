<script setup>
import { workoutProgram } from '../workoutsData.js';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const startWorkout = (workout, idx) => {
    router.push({ path: '/workout/', query: { day: idx, workout: workout } });
};
const completedWorkout = JSON.parse(localStorage.getItem("completedWorkouts") || "[]");

const getUnlockedIndex = () => {
    let i = 0;
    while (completedWorkout.includes(i)) {
        i++;
    }
    return i;
};
const unlockedIndex = getUnlockedIndex();

</script>
<template>
    <div class="bg-blue-600">
        <section class="py-5">
            <div class="flex justify-center flex-col items-center gap-5">
                <RouterLink to="/" class="text-xl font-semibold text-white border-2 border-white p-2 md:p-3 rounded-md"><i
                        class="fa-solid fa-dumbbell rotate-90 text-xl md:text-xl"></i> Daily Work</RouterLink>
                <ul class="text-white flex gap-10 font-medium navBar">
                    <li :class="{ active: route.path === '/' }">
                        <RouterLink to="/">Home</RouterLink>
                    </li>

                    <li :class="{ active: route.path === '/dashboard' }">
                        <RouterLink to="/dashboard">Dashboard</RouterLink>
                    </li>

                    <li :class="{ active: route.path.startsWith('/workout') }">

                        <button
                            @click="startWorkout(workoutProgram[unlockedIndex]?.name || '', unlockedIndex)">Start Workout</button>
                    </li>
                </ul>
            </div>

        </section>
    </div>
</template>