module.exports = {
  css: {
    loaderOptions: {
      sass: {
        sassOptions: { additionalData: `@import "@/assets/stype.scss";` },
      },
    },
  },
};
