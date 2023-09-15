<script >
import { mapState } from 'vuex'; // Importa mapState desde Vuex

import formulario from './dashboard/formulario.vue';
import configUsuario from './dashboard/configUsuario.vue';
import listElements from './dashboard/listElements.vue';
import modalShare from './dashboard/modalShare.vue';

export default {

    methods: {
        navigateLogin() {
            this.$router.push("/");
        }, openModal(file) {

            this.file = file;
            console.log(this.file);
            this.showModalPeople = true
        }

    },
    data() {
        return {
            showModal: false,
            showModalPeople: false,
            file: ''
        }
    },
    components: {
        formulario,
        configUsuario,
        listElements,
        modalShare
    }, computed: {
        ...mapState(['user'])

    }
};
</script>


<template >
    <modalShare class="modal" :file="file" v-if="showModalPeople" @closeModal="showModalPeople = false"></modalShare>
    <div id="dashboard">
        <div id="divConfigUser" class="bg-black">
            <button @click="showModal = true" id="btnModal" class="p-3" v-if="!showModal">
                <img src="../assets/configuracion.png" class="responsive"></button>
            <configUsuario v-if="showModal" @close="showModal = false"></configUsuario>
        </div>
        <div id="divContent">
            <div id="divForm">
                <formulario :usuario="usuario" />
            </div>
            <div id="divlistElements">
                <listElements @modal-open="openModal"></listElements>
            </div>
        </div>
    </div>
</template>

<style>
#dashboard {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 12fr;
}

#btnModal {
    position: sticky;
    top: 50vh;
    align-self: center;
    transform: translate(0%, -50%);
    border: none;
    background: none;
    padding: 0;
    margin: 0;
}

#divContent {
    min-height: 100vh;
}

.responsive {
    width: 100%;
    height: auto;
}

.modal {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    /* Fondo oscuro semitransparente */
}

@media (max-width: 500px) {
    #divConfigUser img {
        width: 2rem;
    }
}
</style>