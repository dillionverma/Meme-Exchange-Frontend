<template>
 <v-layout row fill-height>
    <v-flex xs12 >
      <v-card>
        <v-list two-line subheader>
          <v-subheader>General</v-subheader>

          <v-list-tile disabled>
            <v-list-tile-content>
              <v-list-tile-title>Username</v-list-tile-title>
              <v-list-tile-sub-title>Change your username</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile disabled>
            <v-list-tile-content>
              <v-list-tile-title>Profile photo</v-list-tile-title>
              <v-list-tile-sub-title>Change your profile photo</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list three-line subheader>
          <v-subheader>Options</v-subheader>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-switch v-model="status"></v-switch>
            </v-list-tile-action>
            <v-list-tile-content @click="status = !status">
              <v-list-tile-title>Show your status</v-list-tile-title>
              <v-list-tile-sub-title>Your status is visible to everyone</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-switch v-model="notifications"></v-switch>
            </v-list-tile-action>
            <v-list-tile-content @click="notifications = !notifications">
              <v-list-tile-title>Notifications</v-list-tile-title>
              <v-list-tile-sub-title>Allow notifications</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-switch v-model="theme"></v-switch>
            </v-list-tile-action>
            <v-list-tile-content @click="theme = !theme">
              <v-list-tile-title>Night Theme</v-list-tile-title>
              <v-list-tile-sub-title>Switch between dark and light themes</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { DARK } from '@/store/app.module';

export default {
  data () {
    return {
      notifications: true,
      status: true
    }
  },
  computed: {
    theme: {
      get() {
        return this.$store.getters.dark;
      },
      set() {
        this.$store.commit(DARK);
      }
    }
  }
}
</script>
