<template>
  <v-dialog
    v-model="isOpen"
    :fullscreen="canEdit"
    persistent
  >
    <v-card
      v-if="canEdit"
      class=""
    >
      <v-form ref="form">
        <v-toolbar
          dark
          color="primary"
          dense
          class
        >
          <v-toolbar-title>Event</v-toolbar-title>
        </v-toolbar>
        <div
          class="pa-5"
        >
          <h3>{{ evt.displayDate }}</h3>
          by <h6>{{ evt.organizer || user.name}}</h6>
          <v-row>
            <v-col
              cols='4'
            >
              <time-pick
                label="From"
                v-model="evt.startTime"
              />

            </v-col>
            <v-col cols="2"/>
            <v-col
              cols='4'
            >
              <time-pick
                label="To"
                v-model="evt.endTime"
              />
            </v-col>
          </v-row>
          <v-text-field
            v-model="evt.name"
            label="Name"
          />
          <v-text-field
            v-model="evt.venue"
            label="Venue"
          />
          <v-alert
            v-if="!valid"
            type="error"
          >
            {{ errorDesc }}
          </v-alert>
        </div>
        <v-card-actions
          class="justify-end pa-5"
        >
          <v-btn
            color="grey"
            depressed
            dark
            @click="eventDelete"
          >
            Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            depressed
            @click="ok"
          >
            Save
          </v-btn>

          <v-btn
            color="warning"
            depressed
            @click="cancel"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-card
      v-if="!canEdit"
    >
      <v-card-title>
        {{ evt.displayDate }}
      </v-card-title>
      <v-card-subtitle>
        {{ evt.startTime }} - {{ evt.endTime }} by {{ evt.organizer || user.name}}
      </v-card-subtitle>
      <v-card-text>
        <!-- read only -->
        <div
          class="pa-5"
        >
          <p>
            <span class="font-weight-bold">Name:</span>
            {{ evt.name || ' - '}}
          </p>
          <p>
            <span class="font-weight-bold">Venue:</span>
            {{ evt.venue || '-' }}
          </p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
            color="primary"
            text
            depressed
            @click="ok"
          >
            Ok
          </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import _ from 'lodash'
import moment from 'moment'
import TimePick from '../components/TimePick.vue'
export default {
  name: 'EventDialog',
  components: {
    TimePick
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    eventDetails: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      evt: {},
      canEdit: false,
      valid: true
    }
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters({
      user: 'user/profile'
    }),
    startTime () {
      if (this.evt.start && typeof this.evt.start === 'object') {
        return this.evt.start.toLocaleTimeString()
      } else {
        return null
      }
    }
  },
  watch: {
    isOpen (open) {
      if (open) {
        if (this.eventDetails) {
          this.evt = _.cloneDeep(this.eventDetails)
          moment.defaultFormat = 'YYYY-MM-DD HH:mm'
          var start = moment(this.eventDetails.start, moment.defaultFormat)
          var end = moment(this.eventDetails.end, moment.defaultFormat)
          this.evt.displayDate = start.format('DD-MMM-YYYY')
          this.evt.date = start.format('YYYY-MM-DD')
          this.evt.startTime = start.format('HH:mm')
          this.evt.endTime = end.format('HH:mm')
          this.canEdit = this.evt.id === undefined || this.evt.uid === this.user.uid
        }
      } else {
        this.evt = {}
      }
    }
  },
  mounted () {
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
    ok () {
      if (!this.canEdit) {
        this.$emit('cancel')
        return
      }
      const start = moment(`${this.evt.date} ${this.evt.startTime}`, 'YYYY-MM-DD HH:mm').toDate()
      const end = moment(`${this.evt.date} ${this.evt.endTime}`, 'YYYY-MM-DD HH:mm').toDate()

      // validations
      if (start > end) {
        this.valid = false
        this.errorDesc = 'Invalid time range'
        return
      }
      if (this.evt.venue === '') {
        this.valid = false
        this.errorDesc = 'Enter venue'
        return
      }
      if (this.evt.name === '') {
        this.valid = false
        this.errorDesc = 'Enter event name'
        return
      }
      const data = {
        start: start,
        end: end,
        name: this.evt.name || '',
        organizer: this.evt.organizer || this.user.name,
        uid: this.user.uid,
        venue: this.evt.venue || '',
        id: this.evt.id,
        category: this.evt.category || 'Badminton',
        color: this.evt.color || ''
      }
      this.$emit('ok', data)
    },
    cancel () {
      this.evt = {}
      this.$emit('cancel')
    },
    eventDelete () {
      this.$emit('delete')
    }
  }
}
</script>

<style>

</style>
