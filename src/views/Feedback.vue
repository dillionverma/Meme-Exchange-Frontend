<template>
  <v-layout justify-center fill-height align-center>
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSdEDQNgkpyFtKFgCW-H8fQu9ktEN6CTVQ_lM9T73_fZ4V63fA/viewform?embedded=true"
      width="640"
      height="1077"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      >Loading...</iframe
    >
  </v-layout>
</template>

<script>
export default {
  name: "Feedback",
  metaInfo: {
    title: "Feedback",
    titleTemplate: "%s | Meme Exchange",
    meta: [
      {
        vmid: "og:title",
        name: "og:title",
        content: "Feedback | Meme Exchange"
      },
      {
        vmid: "description",
        name: "description",
        content:
          "Please share your valuable feedback so we can make our app better for everyone"
      },
      {
        vmid: "og:description",
        name: "og:description",
        content:
          "Please share your valuable feedback so we can make our app better for everyone"
      }
    ]
  }
};
</script>
