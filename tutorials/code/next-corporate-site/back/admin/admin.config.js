module.exports = {
  webpack: (config, webpack) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    config.plugins.push(
      new webpack.DefinePlugin({
        FRONTEND_URL: JSON.stringify(process.env.FRONTEND_URL),
        FRONTEND_PREVIEW_SECRET: JSON.stringify(process.env.FRONTEND_PREVIEW_SECRET),
      })
    );

    return config;
  },
};
