import { createApp } from 'vue';
import App from './App.vue';
import "@/assets/scss/main.scss"
import Input from './components/Input/Input.vue';
import CurrencyInput from '@/components/Input/CurrencyInput.vue';
import SearchInput from '@/components/Input/SearchInput.vue';
import Select from '@/components/Input/Select.vue';
import SelectApi from '@/components/Input/SelectApi.vue';
import Textarea from '@/components/Input/Textarea.vue';
import Button from '@/components/Buttons/Button.vue';
import ButtonEdit from '@/components/Buttons/ButtonEdit.vue';
import ButtonDelete from '@/components/Buttons/ButtonDelete.vue';
import CardPage from '@/components/CardPage/CardPage.vue';
import Tab from '@/components/Tab/Tab.vue';
import Collapse from '@/components/Collapse/Collapse.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import DataDropdown from '@/components/DataDropdown/DataDropdown.vue';
import Modal from '@/components/Modals/Modal.vue';
import baseurl from '@/server/baseurl';
import router from '@/router';
import VueTheMask from 'vue-the-mask';
import util from '@/server/util';
// import store from '@/store';
import i18n from '@/i18n'
import { useTheme } from './composables/useTheme'

const app = createApp(App);
// app.provide('$store', store);
app.provide('$baseurl', baseurl);
app.provide('$util', util);
useTheme()

app
    .component('Textarea', Textarea)
    .component('Select', Select)
    .component('SelectApi', SelectApi)
    .component('SearchInput', SearchInput)
    .component('CardPage', CardPage)
    .component('Collapse', Collapse)
    .component('Input', Input)
    .component('ButtonEdit', ButtonEdit)
    .component('ButtonDelete', ButtonDelete)
    .component('Button', Button)
    .component('Modal', Modal)
    .component('Tab', Tab)
    .component('Pagination', Pagination)
    .component('DataDropdown', DataDropdown)
    .component('CurrencyInput', CurrencyInput)
    .use(router)
    .use(VueTheMask)
    // .use(store)
    .use(i18n)
    .mount('#app')