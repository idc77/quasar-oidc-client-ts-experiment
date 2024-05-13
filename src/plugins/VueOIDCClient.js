import {UserManager} from "oidc-client-ts";
import {VueOIDCClientSymbol} from "src/plugins/VueOIDCClientSymbol.js";

export default {
  install: (app, options) => {
    const manager = new UserManager(
      options.settings,
      options.redirectNavigator,
      options.popupNavigator,
      options.iframeNavigator
    )
    app.config.globalProperties.$manager = manager
    app.provide(VueOIDCClientSymbol, manager)
  }
}
