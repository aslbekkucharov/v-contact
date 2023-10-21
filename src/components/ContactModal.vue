<template>
    <a-modal v-model:open="isModalVisible" :ok-text="okButtonLabel" :title="modalTitle" @ok="onOkPress">
        <a-space class="my-5 w-full" :size="15" direction="vertical">

            <a-input v-model:value="form.name" placeholder="Введите Ф.И.О." size="large">
                <template v-slot:prefix>
                    <IconOcticonPerson16 />
                </template>
            </a-input>

            <a-input v-model:value="form.phone" placeholder="Введите номер телефона" size="large">
                <template v-slot:prefix>
                    <IconMaterialSymbolsPhoneEnabled />
                </template>
            </a-input>

            <a-input v-model:value="form.email" placeholder="Введите Email" size="large">
                <template v-slot:prefix>
                    <IconMaterialSymbolsAlternateEmail />
                </template>
            </a-input>

            <a-input v-model:value="form.tags" placeholder="Введите теги через запятую" size="large">
                <template v-slot:prefix>
                    <IconOcticonPencil16 />
                </template>
            </a-input>
        </a-space>
    </a-modal>
</template>

<script setup lang="ts">
import { generateUniqueId } from '@/shared'
import type { ContactModelType } from '@/types'
import { computed, reactive, defineEmits, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },

    contact: {
        type: Object,
        default: {}
    }
})

const emit = defineEmits<{
    (event: 'update:modelValue', payload: boolean): void,
    (event: 'okButtonPress', paylaod: ContactModelType): void
}>()

const isModalVisible = computed({
    set(val: boolean) {
        return emit('update:modelValue', val)
    },

    get() {
        return props.modelValue
    }
})

const isEditing = computed(() => !!(props.contact && Object.keys(props.contact).length))
const okButtonLabel = computed<string>(() => isEditing.value ? 'Сохранить' : 'Создать')
const modalTitle = computed<string>(() => isEditing.value ? 'Редактирование контакта' : 'Создание контакта')

const form = reactive<ContactModelType>({
    id: props.contact?.id || '',
    name: props.contact?.name || '',
    phone: props.contact?.phone || '',
    email: props.contact?.email || '',
    tags: props.contact?.tags || ''
})

function resetForm(): void {
    form.id = ''
    form.name = ''
    form.email = ''
    form.phone = ''
    form.tags = ''
}

function onOkPress(): void {
    emit('okButtonPress', form)
    isModalVisible.value = false
    isEditing.value ? '' : resetForm()
}

watch(isModalVisible, (newValue) => {
    if (newValue && !form.id) {
        form.id = generateUniqueId()
    }
})

</script>