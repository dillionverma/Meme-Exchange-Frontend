<template>
  <v-layout row fill-height>
    <v-flex xs12>
      <v-subheader v-if="isLoggedIn">General</v-subheader>
      <v-card v-if="isLoggedIn">
        <v-list three-line subheader>
          <v-list-tile
            @click="
              usernameDialog = !usernameDialog;
              vibrate();
            "
            ripple
          >
            <v-list-tile-content>
              <v-list-tile-title>Username</v-list-tile-title>
              <v-list-tile-sub-title
                >Change your username</v-list-tile-sub-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile disabled ripple>
            <v-list-tile-content>
              <v-list-tile-title>Profile photo</v-list-tile-title>
              <v-list-tile-sub-title
                >Change your profile photo</v-list-tile-sub-title
              >
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>

      <v-subheader>Options</v-subheader>

      <v-card>
        <v-list three-line subheader>
          <v-list-tile
            v-if="isLoggedIn"
            @click="
              status = !status;
              vibrate();
            "
            ripple
          >
            <v-list-tile-action>
              <v-switch
                @click="
                  status = !status;
                  vibrate();
                "
                v-model="status"
              ></v-switch>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Show your status</v-list-tile-title>
              <v-list-tile-sub-title
                >Your status is visible to everyone</v-list-tile-sub-title
              >
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile
            @click="
              notifications = !notifications;
              vibrate();
            "
            ripple
          >
            <v-list-tile-action>
              <v-switch
                @click="
                  notifications = !notifications;
                  vibrate();
                "
                v-model="notifications"
              ></v-switch>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Notifications</v-list-tile-title>
              <v-list-tile-sub-title>Allow notifications</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile
            @click="
              theme = !theme;
              vibrate();
            "
            ripple
          >
            <v-list-tile-action>
              <v-switch
                @click="
                  theme = !theme;
                  vibrate();
                "
                v-model="theme"
              ></v-switch>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Night Theme</v-list-tile-title>
              <v-list-tile-sub-title
                >Switch between dark and light themes</v-list-tile-sub-title
              >
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>

      <v-subheader>Other</v-subheader>

      <v-card>
        <v-list three-line subheader>
          <v-list-tile
            @click="
              checkForUpdates();
              vibrate();
            "
            ripple
          >
            <v-list-tile-action style="padding-left: 8px">
              <v-btn :loading="checking" icon :disabled="checking">
                <v-icon>refresh</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Check For Updates</v-list-tile-title>
              <v-list-tile-sub-title
                >Forcefully refresh application and check for latest
                updates</v-list-tile-sub-title
              >
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>

      <div style="padding-top: 20px">
        <v-dialog v-model="resetModal" width="700">
          <v-btn
            style="margin: 0"
            dark
            color="error"
            @click.stop="resetModal = true"
            slot="activator"
          >
            Reset Account
          </v-btn>
          <ResetDialog :close="closeResetModal"/>
        </v-dialog>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { DARK, USERNAME_DIALOG } from "@/store/app.module";
import ResetDialog from "@/components/Reset";

export default {
  components: {
    ResetDialog
  },
  data() {
    return {
      notifications: true,
      status: true,
      checking: false,
      resetModal: false
    };
  },
  created() {
    document.addEventListener("swRegistered", this.saveRegistration, {
      once: true
    });
  },
  methods: {
    closeResetModal() {
      this.resetModal = false;
    },
    saveRegistration(e) {
      this.registration = e.detail;
    },
    checkForUpdates() {
      this.checking = true;
      setTimeout(() => (this.checking = false), 1000); // show loading indicator
      if (!this.registration || !this.registration.update) {
        return;
      }
      this.registration.update();
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    theme: {
      get() {
        return this.$store.getters.dark;
      },
      set() {
        this.$store.commit(DARK);
      }
    },
    usernameDialog: {
      get() {
        return this.$store.getters.usernameDialog;
      },
      set(dialog) {
        this.$store.commit(USERNAME_DIALOG, dialog);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-list {
  padding: 0;
}
</style>
