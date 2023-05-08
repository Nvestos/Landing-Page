const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      msg: "Hi, Nvestos!",
      isDarkMode: false,
      currentYear: new Date().getFullYear(),
    };
  },
  mounted() {
    const themeIcon = document.getElementById("themeIcon");
    this.setInitialTheme();
    themeIcon.classList.add(this.themeIconClass);
  },
  computed: {
    themeIconClass() {
      return this.isDarkMode ? "bi-cloud-moon-fill" : "bi-sun-fill";
    },
  },
  methods: {
    toggleTheme() {
      const body = document.body;
      body.classList.toggle("dark");

      this.isDarkMode = body.classList.contains("dark");
      localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
    },
    setInitialTheme() {
      const savedTheme = localStorage.getItem("theme");
      const body = document.body;

      if (savedTheme) {
        body.classList.add(savedTheme);
        this.isDarkMode = savedTheme === "dark";
      } else {
        const prefersDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        body.classList.add(prefersDarkMode ? "dark" : "light");
        this.isDarkMode = prefersDarkMode;
      }
    },
    toggleWaitingList() {
      console.log("Clicked");
    },
  },
});
app.mount("#app");
