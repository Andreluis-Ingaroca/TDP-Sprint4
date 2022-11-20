<template>

  <div class="pt-5 pl-5 pr-5">

    <v-card color="#55B4B0" rounded="xl">
        <v-card-title class="justify-center text-h4 pt-5 pb-5 font-weight-black">AÑADIR UNA MEDICINA</v-card-title>
    </v-card>

    <v-row class="pt-10"> 
      <v-col cols="12" sm="8">
        <v-card color="#55B4B0" rounded="xl">
          <v-card-title class="justify-center text-h5 pt-5 pb-5 font-weight-black">FORMULARIO DE REGISTRO</v-card-title>

          <form @submit.prevent="submit" color="blue lighten-1">
            <vue-title title="Static Title"></vue-title>
            <v-text-field color="white" class="pl-10 pt-2 pr-10" v-model="cant" v-bind="{ placeholder: 'MEDICINE'+ this.cant.toString() }" label="MEDICINA ID" disabled></v-text-field>
            <v-text-field color="white" class="pl-10 pt-2 pr-10" v-model="name" label="Nombre Génerico" required></v-text-field>
            <v-text-field color="white" class="pl-10 pt-2 pr-10" v-model="concentration" label="Concentración" required></v-text-field>
            <v-text-field color="white" class="pl-10 pt-2 pr-10" v-model="form" label="Forma Farmacéutica" required></v-text-field>
            <v-text-field color="white" type="Date" class="pl-10 pt-2 pr-10" v-model="expiration" hint="Fecha de Expiración" required></v-text-field>
            <v-text-field color="white" type="number" class="pl-10 pt-2 pr-10" v-model="quantity" label="Cantidad" required></v-text-field>
            <v-text-field color="white" class="pl-10 pt-2 pr-10" v-model="barcode" label="Lote - Código" required></v-text-field>
            <v-col cols="12" class="pb-3 pl-10 pt-2 pr-10">
              <v-btn @click="submit" block color="blue lighten-1">ENVIAR</v-btn>
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
    id: '',
    name: '',
    concentration: '',
    form: '',
    expiration: '',
    quantity: 0,
    barcode: '',
    qStr: '',
    medicines: [],
    windows: null,
    cant: 0,
    codes: [],
    text: '',
    snb: false,
    multiLine: true,
    snackbar: false
  }),

  created() {
    this.retrieveMedicines();
  },


  methods: {
    async submit() {
      this.retrieveMedicines();
      this.id = 'MEDICINE' + this.cant.toString();
      this.qStr = this.quantity.toString();
      console.log('CANTIDADD '+this.id);
      console.log('QUA '+ this.qStr);



      var tiempoTranscurrido = Date.now();
      var hoy = new Date(tiempoTranscurrido);
      var exp = new Date(this.expiration);
      
      if (exp > hoy) {
        if (this.name.length > 0 && this.concentration.length > 0 && this.form.length > 0
        && this.quantity > 0 && this.barcode.length == 13) {
          for (var i = 0; i < this.cant; i++) {
            if (this.codes[i] == this.barcode) {
              this.snb = true;
              this.snackbar = true;
              this.text = 'CODE REPETIDO';
              console.log('CODE REPETIDO')
              break
            } else if (i == this.cant-1){
              let data = {
                "medicineid": this.id,
                "name": this.name,
                "concentration": this.concentration,
                "form": this.form,
                "expiration": this.expiration,
                "quantity": this.qStr,
                "code": this.barcode
              }

              await axios.post('http://localhost:8080/api/addmedicine', data)
              .then((result) => {
                console.log('SE LOOGROO');
                console.log(result);
              })

              this.$router.push({name: 'Medicines'});
              break
            }
          }
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
        //await this.snb;
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
        this.cant = this.windows.length;
        console.log('cantidad '+this.cant.toString());
        for (var i = 0; i < this.windows.length; i++) {
          this.codes.push(this.windows[i]["Record"].code);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    }
  },
}

</script>

<style scoped>

.add {
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
