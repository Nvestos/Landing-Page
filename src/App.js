const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      msg: "Hi, Nvestos!",
      isDarkMode: false,
      showOptIn: false,
      isLoading: false,
      successState: {
        show: false,
        message: "",
      },
      currentYear: new Date().getFullYear(),
      user: {
        email: "",
        name: "",
      },
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
    async joinWaitList() {
      if (
        !this.user.email ||
        !this.user.name ||
        !this.user.email.trim() ||
        !this.user.name.trim()
      ) {
        toastr.error("Email and name are required.");
        return;
      }
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(this.user.email)) {
        toastr.error("Invalid email format");
        return;
      }
      this.isLoading = true;
      try {
        await axios.post(
          "https://api.nvestos.com/api/v1/auth/waitlist",
          {
            name: this.user.name,
            email: this.user.email,
          },
          {
            "Content-Type": "application/json",
          }
        );
        this.successState = {
          show: true,
          message: `You have successfully joined the waiting list. Keep an eye on your email (${this.user.email}) for updates.`,
        };
      } catch (error) {
        console.log(error);
        toastr.error("An error occurred. Please try again");
      } finally {
        this.isLoading = false;
      }
    },
    formSubmitted() {
      this.user = {
        email: "",
        name: "",
      };
      this.showOptIn = false;
      this.successState = {
        show: false,
        message: "",
      };
    },
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
      this.showOptIn = !this.showOptIn;
    },
  },
});
app.mount("#app");
