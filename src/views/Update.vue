<template>
    <div class="pt-5 pl-5 pr-5">
      <v-card color="#55B4B0" rounded="xl">
        <v-card-title class="justify-center text-h3 pt-5 pb-5 font-weight-black">UPDATE QUANTITY</v-card-title>
      </v-card>

    <v-row class="pt-10"> 
        <v-col cols="12" sm="8">
                <v-card color="#55B4B0" rounded="xl">
                    <v-card-title class="justify-center text-h5 pt-5 pb-5 font-weight-black">ENTER MEDICINE ID</v-card-title>

                    <form @submit.prevent="submit" color="blue lighten-1">
                    <v-select :items="ids" label="ID MEDICINE" class="pl-10 pt-2 pr-10" v-model="selectId"></v-select>
                    <v-col cols="12" class="pb-3 pl-10 pt-2 pr-10">
                        <v-btn @click="submit(selectId)" block color="blue lighten-1">SUBMIT</v-btn>
                    </v-col>
                    </form>
                </v-card>
                <!-- <h1 class="pt-10"></h1>
                <v-card v-if="hide == false" color="#55B4B0" rounded="xl">
                    <v-card-title class="justify-center text-h5 pt-5 pb-5 font-weight-black">SELECTED MEDICINE</v-card-title>
                    <form @submit.prevent="update" color="blue lighten-1">
                    <vue-title title="Static Title"></vue-title>
                    <v-text-field class="pl-10 pt-2 pr-10" v-bind="{ placeholder: name}" disabled></v-text-field>
                    <v-text-field class="pl-10 pt-2 pr-10" v-bind="{ placeholder: concentration }" disabled></v-text-field>
                    <v-text-field class="pl-10 pt-2 pr-10" v-bind="{ placeholder: form }" disabled></v-text-field>
                    <v-text-field class="pl-10 pt-2 pr-10" v-bind="{ placeholder: expiration }" disabled></v-text-field>
                    <v-text-field type="number" v-model="quantity" class="pl-10 pt-2 pr-10" v-bind="{ placeholder: quantity }" hint="Quantity"></v-text-field>
                    <v-text-field class="pl-10 pt-2 pr-10" v-bind="{ placeholder: barcode }" disabled></v-text-field>
                    <v-col cols="12" class="pb-3 pl-10 pt-2 pr-10">
                        <v-btn @click="update" block color="blue lighten-1">UPDATE</v-btn>
                    </v-col>
                    </form>
                </v-card> -->
        </v-col>

        <v-col cols="12" sm="3">
        <v-img :src="require('../assets/sym.png')" class="pl-20" contain height="400"/>
        </v-col>
    </v-row>
    </div>
</template>

<script>

import MedicinesApiService from "@/services/medicines-api.service";
import axios from "axios";

export default {
    data: () => ({
        windows: null,
        ids: [],
        selectId: null,
        hide: true,
        name: '',
        concentration: '',
        form: '',
        expiration: '',
        quantity: '',
        barcode: '',
    }),

    created() {
        this.retrieveMedicines();
    },
    
    methods: {
        async submit(id) {
            console.log('SUBMIT: ' + id);
            // if (id != null){
            //     this.retrieveMedicineById(id);
            //     this.hide = false;
            //     console.log('NAME: ' + this.name);
            // } else {
            //     console.log('NO ID SELECTED')
            // }
        
        },

        async update() {
            let data = {
                "quantity": this.quantity
            }
            await axios.put(`http://localhost:8080/api/changequantity/${this.selectId}`, data)
            .then((result) => {
                console.log(result);
            })

            this.$router.push({name: 'Medicines'});
        },

        retrieveMedicines(){
            MedicinesApiService.getAllMedicines()
            .then(response => {
                console.log(response.data.response)
                //this.medicines = response.data.response;
                let respDataStr = response.data.response;
                let jsObject = JSON.parse(respDataStr);
                this.windows = jsObject;
                for (var i = 0; i < this.windows.length; i++) {
                    this.ids.push('MEDICINE' + i.toString())
                }
                console.log('IDS '+ this.ids.toString());
            })
            .catch((e) => {
                console.log(e);
            });
        },

        retrieveMedicineById(id){
            MedicinesApiService.getMedicineById(id)
            .then(response => {
                let respDataStr = response.data.response;
                let jsObject = JSON.parse(respDataStr);
                console.log(jsObject);
                this.name = jsObject.name;
                this.concentration = jsObject.concentration,
                this.form = jsObject.form,
                this.expiration = jsObject.expiration,
                this.quantity = jsObject.quantity,
                this.barcode = jsObject.code,
                console.log('na '+ this.name);
            })
            .catch((e) => {
                console.log(e);
            });
        }
        
    }
}
</script>

<style scoped>
.profile {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 40px;
    color: rgb(167, 167, 167);
    font-weight: 600;
}
</style>