<template>
   <v-row>
    <v-col cols="12" md="6">
       <v-text-field
        label="Barlist*"
        prepend-icon="mdi-clipboard-list"
        required
        type="string"
        :rules="[rules.required]"
        v-model="delivery.barList"
      >
      </v-text-field>
    </v-col>

    <v-col cols="6" md="2">
      <v-select
          :items="bartypes"
          label="Bar Type"
          v-model="delivery.barType"
        ></v-select>
    </v-col>

    <v-col cols="6" md="4">
      <v-text-field
        label="Amount*"
        prepend-icon="mdi-counter"
        required
        type="number"
        :rules="[rules.required]"
        v-model="delivery.amount"
      >
        <template v-slot:append>M.T.</template>
      </v-text-field>
    </v-col>
</v-row>
</template>

<script>
import { RebarDelivery } from '@/models/Schedule';
import FormValidator from '@/utils/FormValidation';

export default {
  name: 'RebarForm',
  data: () => ({
    bartypes: ['black', 'epoxy'],
    rules: FormValidator,
  }),
  created() {
    this.delivery = new RebarDelivery();
    // this.delivery.bartype=this.bartypes[0];
  },

};
</script>

<style>

</style>
