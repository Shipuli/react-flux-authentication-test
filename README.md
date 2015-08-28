react-flux-authentication-test
------------------------------

A little project made to test react/flux authentication flow and server-side rendering with react-router.

How to run:
-----------
1. Development
 	* Just run `npm start`

2. Production 
	* `npm build` (compiles build.js to public folder) 
	* Set NODE_ENV to 'production'
	* run `npm start` 

Note: The app should not be executed in development mode when the production bundled file is in the public folder (it messes up the webpack-dev-server).

Webpack setup is mostly from this great tutorial: http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

