<template>
    <RouterLink :to="{ name: 'detail', params: { id: contact.id } }" class="contact-card">
        <span class="contact-card__img">
            <img :src="PhoneEmoji" alt="">
        </span>

        <span class="contact-card__details">
            <span class="contact-card-item">
                <span class="contact-card-item__key">Ф.И.О.: </span>
                <span class="contact-card-item__val">{{ contact.name }}</span>
            </span>
            <span class="contact-card-item">
                <span class="contact-card-item__key">Номер телефона: </span>
                <span class="contact-card-item__val">{{ contact.phone }}</span>
            </span>
            <span v-if="contact.email" class="contact-card-item">
                <span class="contact-card-item__key">E-mail: </span>
                <span class="contact-card-item__val">{{ contact.email }}</span>
            </span>
            <span v-if="contact.tags.length" class="contact-card-item">
                <span class="contact-card-item__key">Теги: </span>
                <span class="contact-card-tags">
                    <span v-for="(tag, index) in contactTags" :key="index" class="contact-card-tag">
                        <span class="contact-card-tag__text">{{ tag }}</span>
                    </span>
                </span>
            </span>
        </span>
    </RouterLink>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { ContactModelType } from '@/types'
import PhoneEmoji from '@/assets/img/phone.png'

const props = defineProps({
    contact: {
        type: Object as () => ContactModelType,
        default: () => {}
    }
})

const contactTags = props.contact.tags.split(',').map(el => el.trim())

</script>