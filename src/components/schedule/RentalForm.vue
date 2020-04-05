<template>
   <v-row>
    <v-col cols="6" md="6">
       <v-text-field
        label="Description*"
        prepend-icon="mdi-format-color-text"
        required
        type="string"
        :rules="[rules.required]"
        v-model="delivery.description"
      >
      </v-text-field>
    </v-col>

    <v-col cols="2" md="2">
      <v-select
          :items="rentalTypes"
          label="Rental Types"
          v-model="delivery.rentalType"
        ></v-select>
    </v-col>

    <v-col cols="4" md="4">
      <v-text-field
        label="Quantity*"
        prepend-icon="mdi-counter"
        required
        type="string"
        :rules="[rules.required]"
        v-model="delivery.amount"
      >
      </v-text-field>
    </v-col>

  <v-col cols="6" md="6">
      <v-select
          :items="suppliers"
          label="Supplier"
          prepend-icon="mdi-dolly"
          v-model="delivery.supplier"
        ></v-select>
    </v-col>

     <v-col cols="6" md="6">
      <v-text-field
        label="PO*"
        prepend-icon="mdi-currency-usd"
        required
        type="string"
        :rules="[rules.required]"
        v-model="delivery.po"
      >
      </v-text-field>
    </v-col>

</v-row>


</template>

<script>
import { RentalDelivery, RENTAL_TYPE, RENTAL_SUPPLIERS } from '@/models/Schedule';
import FormValidator from '@/utils/FormValidation';

export default {
  name: 'RentalForm',
  data: () => ({
    suppliers: RENTAL_SUPPLIERS,
    rules: FormValidator,
  }),
  created() {
    this.delivery = new RentalDelivery();
  },
  computed: {
    rentalTypes() {
      return Object.values(RENTAL_TYPE);
    },
  },

};
</script>

<style></style>
