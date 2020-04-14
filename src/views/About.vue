<template>
  <v-layout justify-center fill-height align-center>
    <p>About page coming soon...</p>
  </v-layout>
</template>

<script>
export default {
  name: "About",
  metaInfo: {
    title: "About",
    titleTemplate: "%s | Meme Exchange",
    meta: [
      {
        vmid: "og:title",
        name: "og:title",
        content: "About| Meme Exchange"
      },
      {
        vmid: "description",
        name: "description",
        content: "Learn more about the mission and vision of the Meme Exchange"
      },
      {
        vmid: "og:description",
        name: "og:description",
        content: "Learn more about the mission and vision of the Meme Exchange"
      }
    ]
  }
};
</script>
