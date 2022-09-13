# Introduction

![Cover](https://miro.medium.com/max/700/1*xfE5LRRQ-Nw3grYHMooxrQ.png)

> This repo is a project for the strapi blog on [Creating a react-native app with Strapi as your backend](https://strapi.io/blog/creating-a-react-native-app-with-strapi-as-backend). 

# Prerequisites

This project requires the follwing installed to your system:
* NodeJS
* Yarn or NPM

Your system also need one of the following to emulate the application:
* Xcode, for IOS development
* Android studio, for android development

# Getting started

This project requires a strapi backend API to function. Without the API you will encounter errors and none of the functionality will work. To set up the strapi API, follow the **Creating the backend** section of [the article](https://strapi.io/blog/creating-a-react-native-app-with-strapi-as-backend). 

After setting up the API, you can begin to launch the application. Just setting up the API might not be enough to get casual users to interact with your project. You need a graphical interface to make things easier for the users. React native allows you to emulate the application on your computer system by running the command below in the project root folder:

```bash
# for android
yarn android

# for IOS
yarn ios
```