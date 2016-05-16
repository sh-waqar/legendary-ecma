# legendary-ecma
Repo for learning ES2015 and Service workers.

## Instructions
- Checkout the repo using command.

```
git clone https://github.com/sh-waqar/legendary-ecma.git
```

- Install the project dependencies.

```
npm install
```

- Run the gulp server.

```
gulp serve
```

You should now have the app server at localhost:3000 and you can open it in your favorite browser.

## Features covered

- Used **ES2015** only. Features used (Classes, Arrow function, let, promises, modules, template strings).
- Used **SCSS** for styling. Website is fully responsive and mobile friendly. (No use of bootstrap).
- Used **Gulp** for task automation.
- Used **Browserify** to utilize js modules.
- Used **Service Workers** which increases the page load time and provides the functionality of **Offline Web Application**.

## Service Workers

Service workers provides the feature of offline web applications, that means the web applications can work offline as well! When there is no or slow internet connectivity your web applications can still load and perform some of the functionality.

> To test the service worker implementation in this project follow the below steps.

- Install all project dependencies and run gulp server.
- Open the project on Chrome and open dev tools.
- Check the resources tab there would be Service Worker at bottom.
- From developer tools `network connections` change the network throttling and see the difference.