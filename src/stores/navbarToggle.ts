import { defineStore } from "pinia";


export const useNavbarToggle = defineStore('navbarToggle',{
    state:()=>({
        toggle:false
    }),
    actions:{
        toggleNavbar(){
            this.toggle = !this.toggle
        }
    }
})

