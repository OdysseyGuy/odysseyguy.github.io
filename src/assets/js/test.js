function select(config) {
  return {
    data: config.data,
    options: {},
    focusedIndex: -1,
    value: config.value,
    placeholder: config.placeholder ?? "Select an option",
    open: false,

    init() {
      this.options = {
        hello: "nothing",
        wonder: "why",
        who: "you",
        glass: "sheet",
        calm: "water",
      };

      // fetch("https://api.first.org/data/v1/countries")
      //   .then((res) => {
      //     console.log(res);
      //     return res.json();
      //   })
      //   .then((data) => {
      //     let selected = data.slice(0, 200);
      //     this.options = selected;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      this.value = null;
    },

    selectOption() {
      if (!this.open) return toggleListboxVisibility();
      this.value = this.options[this.focusedIndex];
      this.closeListbox();
    },

    closeListbox() {
      this.open = false;
      this.focusedIndex = -1;
    },

    toggleListboxVisibility() {
      if (this.open) return this.closeListbox();

      this.focusedIndex = Object.keys(this.options).indexOf(this.value);
      if (this.focusedIndex < 0) this.focusedIndex = 0;
      this.open = true;

      this.$nextTick(() => {
        this.$refs.listbox.children[this.focusedIndex].scrollIntoView({
          block: "center",
        });
      });
    },
  };
}
