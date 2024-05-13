import {boot} from "quasar/wrappers";
import VueOIDCClient from "src/plugins/VueOIDCClient.js";
import axios from "axios";

export default boot(async ({ app }) => {
  async function tokenInterceptor () {
    axios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${app.config.globalProperties.$manager.getUser()?.access_token}`
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
      monitorSession: true,
      response_type: 'code',
      scope: 'openid email profile',
    }
    app.use(VueOIDCClient, {
      settings: settings,
      redirectNavigator: undefined,
      popupNavigator: undefined,
      iframeNavigator: undefined,
    })
    tokenInterceptor()
    resolve()
  })
})
