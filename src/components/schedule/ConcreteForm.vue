<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-autocomplete
        :items="grades"
        label="Grades*"
        hint="Type to narrow down options"
        prepend-icon="mdi-file-certificate"
        :rules="[rules.required]"
        v-model="delivery.grade"
      ></v-autocomplete>
    </v-col>

    <v-col cols="12" md="6">
      <v-text-field
        label="Volume*"
        prepend-icon="mdi-counter"
        required
        type="number"
        :rules="[rules.required]"
        v-model="delivery.amount"
      >
        <template v-slot:append>M<sup>3</sup></template>
      </v-text-field>
    </v-col>

    <v-col cols="12">
      <v-autocomplete
        label="Admixtures"
        v-model="delivery.admixtures"
        prepend-icon="mdi-note-plus"
        chips
        multiple
        :items= "admixturesList"
      >
 <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  {{ data.item.shortName }} : {{data.item.specs}}
                </v-chip>
              </template>

       <template v-slot:item="{ item }">
        <v-list-item-avatar
          color="secondary"
          class="headline font-weight-light white--text"
        >
          {{ item.displayName.charAt(0) }}
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.displayName"></v-list-item-title>
          <v-spacer></v-spacer>
          <v-text-field
          v-if="editing === item"
          v-model="editing.specs"
          autofocus
          flat
          background-color="transparent"
          hide-details
          label="Specifications"
          solo
          @keyup.enter="editChipSpec(index, item)"
        ></v-text-field>
        </v-list-item-content>
              <v-list-item-action @click.stop>
          <v-btn
            icon
            @click.stop.prevent="editChipSpec(index, item)"
          >
            <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
      </v-autocomplete>

    </v-col>
  </v-row>
</template>

<script>
import { ConcreteDelivery } from '@/models/Schedule';
import FormValidator from '@/utils/FormValidation';
import { CONCRETE_GRADES, CONCRETE_ADMIXTURE } from './ScheduleViewConfig';

export default {
  name: 'ConcreteForm',
  data: () => ({
    // view controls
    valid: true,
    datepicker: false,
    editing: null,
    index: -1,
    // model
    delivery: {},
    // enums
    rules: FormValidator,
    grades: CONCRETE_GRADES,
    admixturesList: CONCRETE_ADMIXTURE,
  }),
  methods: {
    save() {
      this.dialogOpen = false;
    },
    remove(item) {
      const index = this.delivery.admixtures.indexOf(item);
      if (index >= 0) this.delivery.admixtures.splice(index, 1);
    },
    editChipSpec(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.index = index;
      } else {
        this.editing = null;
        this.index = -1;
      }
    },
  },
  computed: {
    today() {
      return new Date().toISOString().substr(0, 10);
    },
  },
  created() {
    this.delivery = new ConcreteDelivery();
  },
};
</script>

<style></style>
