import {boot} from "quasar/wrappers";
import VueOIDCClient from "src/plugins/VueOIDCClient.js";
import axios from "axios";

export default boot(async ({ app }) => {
  async function tokenInterceptor () {
    axios.interceptors.request.use(config => {
      app.config.globalProperties.$manager.getUser().then(user => {
        config.headers.Authorization = `Bearer ${user.access_token}`
      })
      return config
    }, error => {
      return Promise.reject(error)
    })
  }

  return new Promise(resolve => {
    const settings = {
      authority: process.env.OIDC_AUTHORITY,
      client_id: process.env.CLIENT_ID,
      redirect_uri: window.location.origin + '/oidc-callback',
      post_logout_redirect_uri: window.location.origin,
      // monitorSession: true,
      response_type: 'code',
      scope: 'openid email profile roles',
      automaticSilentRenew: true,
      // silent_redirect_uri: window.location.origin + '/oidc-callback',
    }
    app.use(VueOIDCClient, {
      settings: settings,
      debug: true,
      redirectNavigator: undefined,
      popupNavigator: undefined,
      iframeNavigator: undefined,
    })
    tokenInterceptor()
    resolve()
  })
})
