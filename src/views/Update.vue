<template>
    <div class="pt-5 pl-5 pr-5">
      <v-card color="#55B4B0" rounded="xl">
        <v-card-title class="justify-center text-h4 pt-5 pb-5 font-weight-black">ACTUALIZAR POR EL ID DE LA MEDICINA</v-card-title>
      </v-card>

    <v-row class="pt-10"> 
        <v-col cols="12" sm="8">
                <v-card color="#55B4B0" rounded="xl">
                    <v-card-title class="justify-center text-h5 pt-5 pb-5 font-weight-black">INGRESAR ID DE LA MEDICINA</v-card-title>

                    <form @submit.prevent="submit" color="blue lighten-1">
                    <v-select :items="ids" label="ID MEDICINA" class="pl-10 pt-2 pr-10" v-model="selectId" color="white"></v-select>
                    <v-col cols="12" class="pb-3 pl-10 pt-2 pr-10">
                        <v-btn @click="submit(selectId)" block color="blue lighten-1">ENVIAR</v-btn>
                    </v-col>
                    </form>
                </v-card>
                <h1 class="pt-10"></h1>
                <v-card v-if="hide == false" color="#55B4B0" rounded="xl">
                    <v-card-title class="justify-center text-h5 pt-5 pb-5 font-weight-black">MEDICINA SELECCIONADA</v-card-title>
                    <form @submit.prevent="update" color="blue lighten-1">
                    <vue-title title="Static Title"></vue-title>
                    <v-text-field color="white" v-model="name" class="pl-10 pt-2 pr-10" v-bind="{ placeholder: name}" label="Nombre Génerico"></v-text-field>
                    <v-text-field color="white" v-model="concentration" class="pl-10 pt-2 pr-10" v-bind="{ placeholder: concentration }" label="Concentración"></v-text-field>
                    <v-text-field color="white" v-model="form" class="pl-10 pt-2 pr-10" v-bind="{ placeholder: form }" label="Forma Farmacéutica"></v-text-field>
                    <v-text-field color="white" type="date" v-model="expiration" class="pl-10 pt-2 pr-10" v-bind="{ placeholder: expiration }" label="Fecha de Expiración"></v-text-field>
                    <v-text-field color="white" type="number" v-model="quantity" class="pl-10 pt-2 pr-10" v-bind="{ placeholder: quantity }" label="Cantidad"></v-text-field>
                    <v-text-field color="white" class="pl-10 pt-2 pr-10" v-model="barcode" v-bind="{ placeholder: barcode }" label="Lote - Código" disabled></v-text-field>
                    <v-col cols="12" class="pb-3 pl-10 pt-2 pr-10">
                        <v-btn @click="update" block color="blue lighten-1">ACTUALIZAR</v-btn>
                    </v-col>
                    </form>
                </v-card>
        </v-col>

        <v-col cols="12" sm="3">
        <v-img :src="require('../assets/sym.png')" class="pl-20" contain height="400"/>
        </v-col>
    </v-row>

    <div v-if="snb == true">
      <v-snackbar v-model="snackbar" :timeout="-1" :value="true" bottom :multi-line="multiLine" color="primary">{{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar> 
    </div>

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
        text: '',
        snb: false,
        multiLine: true,
        snackbar: false
    }),

    created() {
        this.retrieveMedicines();
    },
    
    methods: {
        async submit(id) {
            // console.log('SUBMIT: ' + id);
            if (id != null){
                this.retrieveMedicineById(id);
                this.hide = false;
                console.log('NAME: ' + this.name);
            } else {
                this.snb = true;
                this.snackbar = true;
                this.text = 'NO EXISTE ID SELECCIONADO';
                console.log('NO ID SELECTED')
            }
        
        },

        async update() {

            var tiempoTranscurrido = Date.now();
            var hoy = new Date(tiempoTranscurrido);
            var exp = new Date(this.expiration);
            
            if (exp > hoy) {
                if (this.name.length > 0 && this.concentration.length > 0 && this.form.length > 0
                && this.quantity > 0) {
                    let data = {
                    "name": this.name,
                    "concentration": this.concentration,
                    "form": this.form,
                    "expiration": this.expiration,
                    "quantity": this.quantity
                    }
                    await axios.put(`http://localhost:8080/api/updatemedicine/${this.selectId}`, data)
                    .then((result) => {
                        console.log(result);
                    })

                    this.$router.push({name: 'Medicines'});
                } else {
                    this.snb = true;
                    this.snackbar = true;
                    this.text = 'REVISAR LOS DATOS ENTRANTES';
                    console.log('REVISAR LOS DATOS ENTRANTES')    
                }
                
            } else {
                this.snb = true;
                this.snackbar = true;
                this.text = 'FECHA NO ACEPTADA';
                console.log('FECHA NO ACEPTADA')
            }

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
                    console.log('NAMEXD: ' + this.windows[i]["Record"].name)
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
                //this.expiration = '2020-10-10',
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
</style>
