<template>
<v-container>
 <div id="app" style="outline-style: dotted; color:red;">
    <select-username
      v-if="!usernameAlreadySelected"
      @input="onUsernameSelection"
    />
    <chat v-else />
  </div>
</v-container>
</template>

<script>
import SelectUsername from "../components/SelectUsername";
import Chat from "../components/Chat";
import socket from "../static/socket";

export default {
  name: "App",
  components: {
    Chat,
    SelectUsername
  },
  data() {
    return {
      usernameAlreadySelected: false
    }
  },
  methods: {
    onUsernameSelection(username) {
      this.usernameAlreadySelected = true
      socket.auth = { username }
      socket.connect()
    }
  },
  created() {
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    })
  },
  destroyed() {
    socket.off("connect_error")
  }
};
</script>

<style>
body {
  margin: 0;
}

@font-face {
  font-family: Lato;
  src: url("/assets/fonts/Lato-Regular.ttf");
}

#app {
  font-family: Lato, Arial, sans-serif;
  font-size: 14px;
}
</style>
