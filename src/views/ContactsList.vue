<template>
    <div v-if="contacts?.length" class="container">

        <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
            <h2 class="sm:mb-0 mb-4 text-slate-500 font-medium">Список контактов</h2>

            <div class="flex gap-4 md:w-1/3">
                <a-input v-model:value="searchKey" :placeholder="searchInputPlaceholder" size="large">
                    <template v-slot:addonAfter>
                        <a-select v-model:value="searchBy" :options="options"  size="large">
                            <template v-slot:suffixIcon>
                                <IconOcticonChevronDown16 />
                            </template>
                        </a-select>
                    </template>
                </a-input>
            </div>
        </div>

        <div class="flex flex-wrap gap-4">
            <ContactCard v-for="contact in filteredContacts" :key="contact.id" :contact="contact" />
        </div>

    </div>

    <NoData v-else text="Пока что нет контактов, пожалуйста добавьте контакт..." />
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
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

const filteredContacts = computed(() => {
    const searchTerm = searchKey.value.toLowerCase()
    if (!searchTerm) {
        return contacts
    } else {
        return contacts?.filter(contact => contact[searchBy.value as keyof ContactModelType].toLowerCase().includes(searchTerm))
    }
})


const searchInputPlaceholder = computed(() => {
    return 'Поиск ' + options.value?.filter(options => options.value === searchBy.value)[0].label.toLowerCase()
})

</script>