<template>
    <div class="pt-5 pl-5 pr-5">
      <v-card color="#55B4B0" rounded="xl">
        <v-card-title class="justify-center text-h4 pt-5 pb-5 font-weight-black">LISTA DE MEDICINAS REGISTRADAS</v-card-title>
      </v-card>

      <v-container fluid class="pt-10">
        <v-row dense>
          <v-col v-for="medicine in medicines" :key="medicine.id" :cols="3" class="pb-10">
            <v-card color="#6495ed" class="mx-auto">
              <v-row>            
                <v-btn class="mx-5" fab dark color="teal">{{ medicine["id"] }}</v-btn>
                <v-card-title class="txtN">{{ medicine["name"] }}</v-card-title>
              </v-row>
              <v-card-title class="inf">INFORMACION</v-card-title>
              <v-row class="pl-3 pt-1">
                <v-card-subtitle class="sub">Forma Farmacéutica:</v-card-subtitle>
                <v-card-subtitle class="data pl-2"> {{ medicine["form"] }}</v-card-subtitle>
              </v-row>
              <v-row class="pl-3 pt-1">
                <v-card-subtitle class="sub">Concentración: </v-card-subtitle>
                <v-card-subtitle class="data pl-14"> {{ medicine["concentration"] }}</v-card-subtitle>
              </v-row>
              <v-row class="pl-3 pt-1">
                <v-card-subtitle class="sub">Fecha de Expiración: </v-card-subtitle>
                <v-card-subtitle class="data pl-3"> {{ medicine["expiration"] }}</v-card-subtitle>
              </v-row>
              <v-row class="pl-3 pt-1">
                <v-card-subtitle class="sub">Cantidad Actualizada: </v-card-subtitle>
                <v-card-subtitle class="data pl-0"> {{ medicine["quantity"] }}</v-card-subtitle>
              </v-row>
              <v-row class="pl-3 pt-1">
                <v-card-subtitle class="sub">Lote - Código: </v-card-subtitle>
                <v-card-subtitle class="data pl-16"> {{ medicine["code"] }}</v-card-subtitle>
              </v-row>
              
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>

    import MedicinesApiService from "@/services/medicines-api.service";

    export default {
      data: () => ({
        medicines: [],
        windows: null,
        wJs: null,
        total: '',
      }),

      created() {
        this.retrieveMedicines();
      },

      methods: {
        retrieveMedicines(){
          MedicinesApiService.getAllMedicines()
          .then(response => {
            console.log(response.data.response)
            //this.medicines = response.data.response;
            let respDataStr = response.data.response;
            let jsObject = JSON.parse(respDataStr);
            this.windows = jsObject;
            for (var i = 0; i < this.windows.length; i++) {

              var jsonStr = JSON.stringify([this.windows[i]]);
              var lenStr = jsonStr.length;
              var subsStr = jsonStr.substring(lenStr-3,0);
              var concStr = subsStr + ',"id":"' + i.toString() + '"' + '}}]';
              if (i >= 1) {
                var cutLen = concStr.length;
                var cutStr = concStr.substring(1, cutLen-1);
                this.total = this.total + ',' + cutStr;
              } else {
                var lenI = concStr.length;
                var cutI = concStr.substring(0,lenI-1);
                this.total = this.total + cutI;
              }
            }
            this.total = this.total + ']';
            let endJs = JSON.parse(this.total);
            this.wJs = endJs;
            console.log('ama '+ this.wJs.length);
            for (var j = 0; j < this.wJs.length; j++) {
              this.medicines.push(this.wJs[j]["Record"]);
            }
            console.log('ama ' + this.medicines[0]["id"]);
          })
          .catch((e) => {
            console.log(e);
          });
        }
      }

    }

</script>

<style scoped>
.txtN {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 30px;
    color: rgb(255, 255, 255);
    font-weight: 600;
}

.inf {
  color: rgb(0, 0, 0);
  font-weight: 800;
  font-size: 18px;
}

.sub {
  color: rgb(0, 0, 0);
  font-weight: 600;
  font-size: 18px;
}

.data {
  color: rgb(0, 0, 0);
  font-weight: 400;
  font-size: 18px;
}
</style>
