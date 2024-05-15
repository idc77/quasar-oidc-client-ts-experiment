import {UserManager} from "oidc-client-ts";
import {VueOIDCClientSymbol} from "src/plugins/VueOIDCClientSymbol.js";
import * as Oidc from "oidc-client-ts";

export default {
  install: (app, options) => {
    if (options.debug) {
      Oidc.Log.setLogger(console)
    }
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
