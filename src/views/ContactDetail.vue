<template>
    <div class="container">
        <div v-if="contact">
            <h2 class="mb-8">Детали контакта</h2>

            <div class="mb-5 flex flex-col gap-2">
                <span class="flex items-center gap-2">
                    <span class="text-lg sm:text-xl text-slate-950">Ф.И.О:</span>
                    <span class="text-lg sm:text-xl text-slate-500">{{ contact.name }}</span>
                </span>
                <span class="flex items-center gap-2">
                    <span class="text-lg sm:text-xl text-slate-950">E-mail:</span>
                    <span class="text-lg sm:text-xl text-slate-500">{{ contact.email }}</span>
                </span>
                <span class="flex items-center gap-2">
                    <span class="text-lg sm:text-xl text-slate-950">Номер телефона:</span>
                    <span class="text-lg sm:text-xl text-slate-500">{{ contact.phone }}</span>
                </span>
                <span class="flex items-center gap-2">
                    <span class="text-lg sm:text-xl text-slate-950">Теги:</span>
                    <span class="contact-card-tags">
                        <span v-for="(tag, index) in contactTags" :key="index" class="contact-card-tag">
                            <span class="contact-card-tag__text">{{ tag }}</span>
                        </span>
                    </span>
                </span>
            </div>

            <a-space :size="15">
                <a-button type="primary" size="large" @click="onContactDelete" danger class="inline-flex items-center gap-2">
                    <template v-slot:icon>
                        <IconOcticonTrash16 />
                    </template>
                    <span>Удалить</span>
                </a-button>

                <a-button type="primary" size="large" @click="onContactEdit" class="inline-flex items-center gap-2">
                    <template v-slot:icon>
                        <IconOcticonPencil16 />
                    </template>
                    <span>Отредактировать</span>
                </a-button>
            </a-space>
        </div>

        <NoData v-else text="Нет данных про выбранный контакт..." />

        <ContactModal v-model="isModalVisible" @ok-button-press="handleContactSave" :contact="contact" />
    </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import NoData from '@/components/NoData.vue'
import type { ContactModelType } from '@/types'
import { useRoute, useRouter } from 'vue-router'
import ContactModal from '@/components/ContactModal.vue'

const contacts = inject<Array<ContactModelType>>('contacts') || []

const route = useRoute()
const router = useRouter()

const contact = computed(() => {
    return contacts?.filter(c => c.id === route.params.id)[0]
})

const contactIndex: number = contacts?.findIndex(c => c.id === route.params.id)

const isModalVisible = ref<boolean>(false)

const contactTags = computed(() => {
    return contact.value?.tags.split(',').map(el => el.trim())
})

function onContactDelete(): void {

    if (contactIndex === 0 || contactIndex) {
        contacts?.splice(contactIndex, 1)
        localStorage.setItem('contacts', JSON.stringify(contacts))
        router.push({ name: 'main' })
    }
}

function onContactEdit(): void {
    isModalVisible.value = true
}

function handleContactSave(payload: ContactModelType) {
    if (contactIndex > -1) {
        contacts?.splice(contactIndex, 1, payload)
    }
}

</script>