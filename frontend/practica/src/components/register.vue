<script>
import { ref } from 'vue';

export default {
    data() {
        return {
            inputClass: ["form-group ", "mb-4","text-white", "d-flex ", "flex-column", "bg-black", "border", "border-dark", "rounded-2", "h5"],
            user: {
                email: undefined,
                pwd: undefined,
                username: undefined
            },
            validcorreo: ref(false)
        }
    },
    methods: {
        async register() {

            console.log(import.meta.env.VITE_BASE_URL);
            const url=import.meta.env.VITE_BASE_URL+'users/Register';
            if (this.validcorreo)
                await fetch(url,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user: this.user }),
                    })
                    .then(() => { console.log("hola") }).catch((error) => { console.log(error) })

        }, isValidEmail() {
            console.log(this.validcorreo)
            this.validcorreo = /^[^@]+@\w+(\.\w+)+\w$/.test(this.user.email);
            return this.validcorreo;
        },
        computed: {

        }
    }


}

</script>

<template>
    <div id="register" class="border border-black border-primary rounded-4">
        <div class="m-5 d-flex flex-column">
            <form id="formularioRegistro" @submit.prevent="register()" class="form-group d-flex flex-column">
                <h1 class="mb-4">Registro De usuarios</h1>
                <input placeholder="Usuario" type="text" required :class="inputClass" v-model="user.username">
                <input placeholder="Corrreo Electronico" type="text" @input="isValidEmail" required :class=inputClass
                    v-model="user.email">
                <p v-if="!validcorreo">Correo invalido</p>
                <input placeholder="password" type="password" required :class=inputClass v-model="user.pwd">
                <input placeholder="passsword repeat" required type="password" :class=inputClass>

                <button type="submit" class="btn btn-black border border-black align-self-center">
                    <p class="h6 m-0 p-1">Registrarse</p>
                </button>
            </form>
            <router-link class="mx-auto btn btn-white m-3 border border-black " to="/">Iniciar sesion</router-link>
        </div>
    </div>
</template>

<style>
#register{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}
</style>