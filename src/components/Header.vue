<template>
    <header class="header">
        <div class="container">
            <div class="header__row">
                <RouterLink to="/" class="logo">
                    <img :src="logo" alt="" class="logo__img">
                </RouterLink>

                <a-button @click="toggleModal" type="primary" size="large" class="flex items-center gap-2">
                    <template v-slot:icon>
                        <IconOcticonPlus16 />
                    </template>

                    <span>Добавить контакт</span>
                </a-button>
            </div>
        </div>

        <ContactModal v-model="isModalVisible" @okButtonPress="handleOkPress" />

    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import logo from '@/assets/img/logo.svg'
import ContactModal from './ContactModal.vue'
import type { ContactModelType } from '@/types'

const isModalVisible = ref<boolean>(false)

const emit = defineEmits<{
    (event: 'dataReceived', payload: ContactModelType): void,
}>()

function toggleModal(): void {
    isModalVisible.value = true
}

function handleOkPress(payload: ContactModelType): void {
    const copyOfPayload = Object.assign({}, payload)
    emit('dataReceived', copyOfPayload)
}

</script>