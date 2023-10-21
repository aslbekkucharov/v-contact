import '@/assets/style/style.scss'
import 'ant-design-vue/dist/reset.css'

import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import Antd from 'ant-design-vue'

const app = createApp(App)

app.use(Antd)
app.use(router)

app.mount('#app')
