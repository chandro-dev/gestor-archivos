<template>
    <div class="border border-black rounded-2  p-3 m-2  ">
        <form @submit.prevent="subirArchivo(), cleanform()" id="formulario" class="form-group d-flex flex-column w-100">
            <span>name</span>
            <div id="inputName">
                <input type="text" name="nombre" v-model="nombre" class="form-control bg-black text-white ">
            </div>
            <span>file</span>

            <div id="inputFile">
                <input type="file" name="file" id="inputfile" class="form-control bg-black text-white ">

            </div><button type="submit" class="btn btn-white border border-black m-3 w-50 align-self-center">Subir
                archivo</button>
        </form>

    </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            nombre: undefined,
            archivo: undefined
        }
    },
    methods: {
        ...mapMutations(['increment']),
        subirArchivo() {

            const formulario = new FormData(document.querySelector('#formulario'));
            const jwt = localStorage.getItem('jwtToken');
            this.nombre = formulario.get('nombre');
            this.archivo = formulario.get('file');
            if (jwt && this.nombre && this.archivo) {
                fetch('http://localhost:3000/api/files/addFile', {
                    method: 'POST',
                    headers: {
                        Authorization: jwt
                    },
                    body: formulario
                }).then(response => {
                    if (response.status === 200) {
                        const inputName = document.querySelector('#inputName');
                        inputName.classList.remove('warning');
                        const inputFile = document.querySelector('#inputFile');
                        inputFile.classList.remove('warning');
                        this.increment();
                    }
                })
                    .catch(error => {

                        console.log(error)
                    });

            } else {
                const inputName = document.querySelector('#inputName');
                inputName.classList.add('warning');
                const inputFile = document.querySelector('#inputFile');
                inputFile.classList.add('warning');
                return;
            }
        },
        cleanform() {
            this.name = '';
            document.querySelector('#inputfile').value = '';
        }
    },
    props: {
        usuario: Object,
    }
}
</script>

<style>
form * {
    padding: 10px;
}

.warning {
    border: 3px solid red;
    border-radius: 10px;
    padding: 1px;
}
</style>