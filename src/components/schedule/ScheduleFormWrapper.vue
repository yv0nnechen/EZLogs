<template>
  <v-card>
    <v-app-bar flat dark color="primary">
      <v-btn icon dark @click="close" @keydown.esc="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ type.displayName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="close">
          Save
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-container>
      <v-form ref="schedule-form-wrapper" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              :items="projects"
              label="Projects*"
              prepend-icon="mdi-city"
              :rules="[rules.required]"
              v-model="schedule.project"
            ></v-select>
          </v-col>

          <v-col cols="12" md="8">
            <v-text-field
              label="Location*"
              prepend-icon="mdi-crosshairs-gps"
              :rule="[rules.required]"
              v-model="schedule.location"
            ></v-text-field>
          </v-col>

        </v-row>
          <slot name="form-concrete" v-if="type.id === concrete"></slot>
          <slot name="form-rebar" v-if="type.id === rebar"></slot>
          <slot name="form-rental" v-if="type.id === machinary"></slot>

<v-row>
          <v-col cols="12" sm="6">
            <v-menu
              v-model="datepicker"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="schedule.scheduledDate"
                  label="Scheduled Date*"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="schedule.scheduledDate"
                @input="datepicker = false"
                show-current="today"
              >
              </v-date-picker>
            </v-menu>
          </v-col>


<v-col cols="12" sm="6">
            <v-menu
              v-model="timepicker"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="schedule.scheduledTime"
                  label="Scheduled Time"
                  prepend-icon="mdi-clock-outline"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-model="schedule.scheduledTime"></v-time-picker>
            </v-menu>
          </v-col>

          <v-col cols="12">
            <v-textarea
              name=""
              label="Notes"
              v-model="schedule.note"
              hint="Note any remark you may have"
            ></v-textarea>
          </v-col>

        </v-row>
      </v-form>
      <small>*indicates required field</small>
    </v-container>
  </v-card>
</template>

<script>
import { Schedule } from '@/models/Schedule';
import FormValidator from '@/utils/FormValidation';
import { ScheduleIDs, PROJECTS } from './ScheduleViewConfig';


export default {
  name: 'ScheduleFormWrapper',
  props: {
    title: String,
    type: Object,
  },
  data: () => ({
    valid: true,
    rules: FormValidator,
    projects: PROJECTS,
    datepicker: false,
    timepicker: false,
    schedule: {},
  }),
  methods: {
    close() {
      this.$emit('cancelDialog');
    },
  },
  computed: {
    concrete: () => ScheduleIDs.CONCRETE_ID,
    rebar: () => ScheduleIDs.REBAR_ID,
    machinary: () => ScheduleIDs.MACHINARY_ID,
    today: () => new Date().toISOString().substr(0, 10),
  },
  created() {
    this.schedule = new Schedule();
  },
};
</script>

<style scoped>
.v-dialog > .v-card > .v-toolbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
