<template>
  <v-layout>
    <v-flex xs12>
      <v-subheader v-if="isLoggedIn">General</v-subheader>
      <v-card v-if="isLoggedIn">
        <v-list three-line subheader>
          <v-list-item
            @click="
              usernameDialog = !usernameDialog;
              vibrate();
            "
            ripple
          >
            <v-list-item-content>
              <v-list-item-title>Username</v-list-item-title>
              <v-list-item-subtitle>Change your username</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-divider></v-divider>
          <v-list-item disabled ripple>
            <v-list-item-content>
              <v-list-item-title>Profile photo</v-list-item-title>
              <v-list-item-subtitle
                >Change your profile photo</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item> -->
        </v-list>
      </v-card>

      <!-- <v-subheader>Options</v-subheader>

      <v-card>
        <v-list three-line subheader>
          <v-list-item
            v-if="isLoggedIn"
            @click="
              status = !status;
              vibrate();
            "
            ripple
          >
            <v-list-item-action>
              <v-switch
                @click="
                  status = !status;
                  vibrate();
                "
                v-model="status"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Show your status</v-list-item-title>
              <v-list-item-subtitle
                >Your status is visible to everyone</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            @click="
              notifications = !notifications;
              vibrate();
            "
            ripple
          >
            <v-list-item-action>
              <v-switch
                @click="
                  notifications = !notifications;
                  vibrate();
                "
                v-model="notifications"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            @click="
              theme = !theme;
              vibrate();
            "
            ripple
          >
            <v-list-item-action>
              <v-switch @click="vibrate()" v-model="theme"></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Night Theme</v-list-item-title>
              <v-list-item-subtitle
                >Switch between dark and light themes</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card> -->

      <v-subheader>Other</v-subheader>

      <v-card>
        <v-list three-line subheader>
          <v-list-item
            @click="
              checkForUpdates();
              vibrate();
            "
            ripple
          >
            <v-list-item-action style="padding-left: 8px">
              <v-btn :loading="checking" icon :disabled="checking">
                <v-icon>refresh</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Check For Updates</v-list-item-title>
              <v-list-item-subtitle
                >Forcefully refresh application and check for latest
                updates</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

      <div style="padding-top: 20px">
        <v-dialog v-model="resetModal" width="700">
          <template v-slot:activator="{ on }">
            <v-btn
              style="margin: 5px"
              dark
              color="error"
              @click.stop="resetModal = true"
              v-on="on"
              v-show="isLoggedIn"
            >
              Reset Account
            </v-btn>
          </template>
          <ResetDialog :close="closeResetModal" />
        </v-dialog>
        <v-dialog v-model="deactivateModal" width="700">
          <template v-slot:activator="{ on }">
            <v-btn
              style="margin: 5px"
              dark
              color="error"
              @click.stop="deactivateModal = true"
              v-on="on"
              v-show="isLoggedIn"
            >
              Deactivate Account
            </v-btn>
          </template>
          <DeactivateDialog :close="closeDeactivateModal" />
        </v-dialog>
        <v-dialog v-model="deleteModal" width="700">
          <template v-slot:activator="{ on }">
            <v-btn
              style="margin: 5px"
              dark
              color="error"
              @click.stop="deleteModal = true"
              v-on="on"
              v-show="isLoggedIn"
            >
              Delete Account
            </v-btn>
          </template>
          <DeleteDialog :close="closeDeleteModal" />
        </v-dialog>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { DARK, USERNAME_DIALOG } from "@/store/app.module";
import ResetDialog from "@/components/Reset";
import DeleteDialog from "@/components/Delete";
import DeactivateDialog from "@/components/Deactivate";

export default {
  name: "Settings",
  components: {
    ResetDialog,
    DeleteDialog,
    DeactivateDialog
  },
  data() {
    return {
      notifications: true,
      status: true,
      checking: false,
      resetModal: false,
      deleteModal: false,
      deactivateModal: false
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
    closeDeleteModal() {
      this.deleteModal = false;
    },
    closeDeactivateModal() {
      this.deactivateModal = false;
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
  },
  metaInfo: {
    title: "Settings",
    titleTemplate: "%s | Meme Exchange",
    meta: [
      {
        vmid: "og:title",
        name: "og:title",
        content: "Settings | Meme Exchange"
      },
      {
        vmid: "description",
        name: "description",
        content: "Change user or game settings"
      },
      {
        vmid: "og:description",
        name: "og:description",
        content: "Change user or game settings"
      }
    ]
  }
};
</script>

<style lang="scss" scoped>
.v-list {
  padding: 0;
}
</style>
