const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

const moduleFederationConfig = withModuleFederationPlugin({
  remotes: {
    "mf-payment": "http://localhost:4202/remoteEntry.js",
    "PestwareWeb-2.0": "http://localhost:4203/remoteEntry.js",
  },

  shared: {
    '@angular/core': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/router': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    ...shareAll({ singleton: true, strictVersion: false, requiredVersion: 'auto' })
  },
});

moduleFederationConfig.output.publicPath = "http://localhost:4200/";

module.exports = moduleFederationConfig;
