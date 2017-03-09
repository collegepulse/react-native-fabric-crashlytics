react-native-stacktrace
=======================

Drop-in support for capturing errors from React Native's global error handler. Pass in a custom configuration function to log errors wherever you want.

After you process the error and your Promise is fulfilled or rejected, the original error will be thrown, retaining the original system functionality.

Usage
-----

To use, add this code to your index.ios.js and index.android.js (or some library included by both).

Call the `init` function. It takes a single function which returns a `Promise`.

```js
import stacktrace from 'react-native-stacktrace';

stacktrace.init(function onError(err, isFatal) {
  return new Promise((resolve, reject) => {
    // log to your own logging service
    return doAsyncThingWithError(err, isFatal)
      .then(resolve)
      .catch(reject);
  });
});
```
Catching Uncaught Promises
--------------------------

React Native's default promise implementation, [then/promise](https://github.com/then/promise), can be subtituted with the [CoreJS](https://github.com/zloirock/core-js) implementation. This permits the use of the `window.onunhandledrejection` handler.

```js
// index.ios.js
import 'core-js';

window.onunhandledrejection = function(promise, reason) {
  console.log('window.onunhandledrejection is', promise, reason);
};
```
