react-native-stacktrace
=======================

Drop-in support for capturing errors from React Native's global error handler. Pass in a custom configuration function to log errors wherever you want.

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
