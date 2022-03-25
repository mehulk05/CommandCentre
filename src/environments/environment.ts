// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  CHAT_BOT_DOMAIN: 'https://chatbot.growthemr.com',
  SSR_DOMAIN: 'https://portal.growthemr.com',
  SSR_HOST: 'portal.growthemr.com',
  FORM_MAX_SIZE: 2097152,

  HOST_NAME: 'localhost',
  SERVER_API_URL: 'https://api.growthemr.com',
  EMR_CHAT_BOT_REGION: 'us-east-1',
  CHAT_BOT_LAMBDA_URL:
    'https://o984hip783.execute-api.us-east-1.amazonaws.com/default/MyFunction',
  //STRIPE_KEY: "pk_test_TYooMQauvdEDq54NiTphI7jx",
  FACEBOOK_CONNECT_URL:
    'https://www.facebook.com/v10.0/dialog/oauth?client_id=1215709718876516&redirect_uri=https://devemr.growthemr.com/post-library/facebook/callback&scope=pages_manage_posts,pages_read_user_content,pages_show_list&response_type=token&state=channel_Facebook',
  INSTAGRAM_CONNECT_URL:
    'https://www.facebook.com/v10.0/dialog/oauth?client_id=1215709718876516&redirect_uri=https://devemr.growthemr.com/post-library/facebook/callback&scope=instagram_basic,instagram_content_publish&response_type=token&state=channel_Instagram'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
