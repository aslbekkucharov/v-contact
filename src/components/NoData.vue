<template>
    <div class="flex flex-col items-center justify-center">
        
        <div class="no-data-illustration">
            <img :src="noDataImage" alt="">
        </div>

        <h2 class="text-slate-500 font-medium max-w-sm sm:max-w-md text-center text-lg sm:text-xl">{{ text }}</h2>
    </div>
</template>

<script setup lang="ts">
import noDataImage from '@/assets/img/no-data.svg'

defineProps({
    text: {
        type: String,
        required: true
    }
})

</script>