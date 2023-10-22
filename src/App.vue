<template>
  <a-config-provider :theme="theme" :locale="ruLocalization">

    <Header @data-received="receiveData" />
    <Main />

  </a-config-provider>
</template>

<script setup lang="ts">
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { reactive, provide, watch } from 'vue'
import { theme } from '@/config/theme'
import Main from '@/components/Main.vue'
import Header from '@/components/Header.vue'
import type { ContactModelType } from './types'
import ruRU from 'ant-design-vue/es/locale/ru_RU'
import type { Locale } from 'ant-design-vue/es/locale';

dayjs.locale('ru')
const ruLocalization: Locale = ruRU

const dataFromLocalStorage = JSON.parse(localStorage.getItem('contacts') || '[]')
const contacts = reactive<Array<ContactModelType>>(dataFromLocalStorage)

provide('contacts', contacts)

function receiveData(payload: ContactModelType): void {
  contacts.push(payload)
}

watch(contacts, (newValue) => {
  localStorage.setItem('contacts', JSON.stringify(newValue))
})

</script>