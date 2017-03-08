import { Platform } from 'react-native';

/* @param {Promise} onError - error promise
 * @returns {void}
 */
function init(logError) {
  if (__DEV__) {
    // Don't send exceptions from __DEV__, it's way too noisy!
    // Live reloading and hot reloading in particular lead to tons of noise...
    return;
  }

  const originalHandler = global.ErrorUtils.getGlobalHandler();

  function errorHandler(e, isFatal) {
    function throwError() {
      // re-throw the exception with the original handler
      if (originalHandler) {
        if (Platform.OS === 'ios') {
          originalHandler(e, isFatal);
        } else {
          // On Android, throwing the original exception immediately results in the
          // recordCustomExceptionName() not finishing before the app crashes & therefore not logged
          // Add a delay to give it time to log the custom JS exception before crashing the app.
          // The user facing effect of this delay is that separate JS errors will appear as separate
          // issues in the Crashlytics dashboard.
          setTimeout(() => {
            originalHandler(e, isFatal);
          }, 500);
        }
      }
    }

    // ES6 "finally" functionality (see http://stackoverflow.com/a/35999141)
    logError(e, isFatal)
      .then(() => {})
      .catch(() => {})
      .then(throwError); // this will always be called no matter what
  }
  global.ErrorUtils.setGlobalHandler(errorHandler);
}

module.exports = {
  init,
};
