<style >
.content {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);
    height: 50%;
    width: 50%;
    padding: 2%;
    position: relative;
}
</style>
<template>
    <modal>
        <div class="content">
            <h2>Compartir con:</h2>
            <lo class="list-group">
                <li v-if="listPeople" v-for="(element) in listPeople" class=" list-group-item "
                    :key="element.idusuario">
                    {{ element.nameUsuario }}
                </li>
            </lo>
            <button @click="closeModal" class="btn btn-primary m-5">Cerrar</button>
        </div>
    </modal>
</template>

<script>
export default {


    data() {

        return {
            listPeople: [],
        }
    }, props: {
        file: String
    }, methods: {
        closeModal() {
            this.$emit('closeModal'); // Emitir un evento para indicar que el modal se ha cerrado
        },
        getpeople() {
            const jwt = localStorage.getItem('jwtToken');
            if (jwt) {
                fetch('http://localhost:3000/api/users/people', {
                    method: 'get',
                    headers: {
                        "content-type": "application/json",
                        Authorization: jwt
                    },
                }).then(response => {
                    if (response.status == 200) {
                        response.json()
                            .then(data => {
                                data.response.forEach(element => {
                                    this.listPeople.push(element);
                                });
                            })
                    }
                    if (response.status == 401) {
                        return;
                    }
                }).catch(() => {
                    console.log("error")
                })

            }
        }
    }, mounted() {
        this.getpeople();
    }

}




</script>
