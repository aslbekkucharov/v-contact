<template>
    <div v-if="contacts?.length" class="container">

        <div class="mb-8 flex items-center justify-between">
            <h2 class="mb-0 text-slate-500 font-medium">Список контактов</h2>

            <div class="flex gap-4 w-1/3">
                <a-input-search v-model:value="searchKey" placeholder="Поиск" size="large" enter-button @search="onSearch" />

                <a-select v-model:value="searchBy" :options="options" size="large">
                    <template v-slot:suffixIcon>
                        <IconOcticonChevronDown16 />
                    </template>
                </a-select>
            </div>
        </div>

        <div class="flex flex-wrap gap-4">
            <ContactCard v-for="contact in contacts" :key="contact.id" :contact="contact" />
        </div>

    </div>

    <NoData v-else text="Пока что нет контактов, пожалуйста добавьте контакт..." />
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import NoData from '@/components/NoData.vue'
import type { ContactModelType } from '@/types'
import type { SelectProps } from 'ant-design-vue'
import ContactCard from '@/components/ContactCard.vue'

const contacts = inject<Array<ContactModelType>>('contacts')

const searchBy = ref<string>('name')
const searchKey = ref<string>('')
const options = ref<SelectProps['options']>([
    {
        value: 'name',
        label: 'По названию'
    },
    {
        value: 'email',
        label: 'По Email'
    },
    {
        value: 'phone',
        label: 'По телефону'
    },
    {
        value: 'tags',
        label: 'По тегам'
    }
])

function onSearch(): void { }

</script>