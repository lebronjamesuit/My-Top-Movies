# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# firebaseAuth


# fireStrore Rule
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  
    function isTheSameUser() {  	
      return request.auth.uid == resource.data.userId ;  
    }
    match /{document=**} {
      allow update, delete: if isTheSameUser();
      allow create: if request.auth.uid != null;
      allow read: if true;
    }
  }
}


-- How to deploy
 # npm start

 # npm run build

 # npm install -g firebase-tools


 # firebase login

 # firebase init

 What do you want to use as your public directory? build < == NOTE: "build" is my directory
 Configure as a single-page app (rewrite all urls to /index.html)? No <== select NO
 File build/404.html already exists. Overwrite? No <== select NO
 File build/index.html already exists. Overwrite? No <== select NO


# firebase deploy

After doing these things, I also get that notification of "Welcome Firebase Setting Host Complete" , 
and I just wait for a while. then reload the website.


