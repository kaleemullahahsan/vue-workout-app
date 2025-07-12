<script setup>
</script>

<template>
   <section class="my-10 min-h-[70vh] flex items-center">
      <div class="flex flex-col gap-5 items-center justify-center m-auto text-center">
         <h2 class="text-4xl leading-11 md:text-5xl md:leading-15 font-bold max-w-200">Daily Work is<span
               class="underline underline-offset-3 underline-bluee-100 decoration-4 decoration-blue-600 "> Best
               Gym</span> Progress Tracking App!</h2>
         <div class="text-left">
            <span
               class="text-lg font-semibold text-blue-600">Features :</span>
            <ul class="my-2 space-y-2 list-disc ml-5">
               <li>Save your daily weights to find your progress!</li>
               <li>Proffesional's choice Workouts!</li>
               <li>Workouts contain a most used/poupular splite known as PPL</li>
            </ul>
         </div>
         <RouterLink to="/dashboard" class="btn-primary">Start Now! <i class="fa-solid fa-bolt text-sm"></i>
         </RouterLink>
      </div>
   </section>
</template>