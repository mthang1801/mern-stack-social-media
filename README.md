# WELCOME TO Pul.com

> 🔑 **This is an unofficial version, we are trying to improve it as soon as possible**

## The core of app

- Backend : Node.js (ExpressJS)
- Frontend : ReactJS
- Database : MongoDB
- Both using Apollo GraphQL.
- Using websocket which is available in Apollo WS and socket.io library to run real-time some required features.

## How to use

In order to use app, you need to install NodeJS version `16.*`, NPM version `7.*` and install MongoDB

1. Open folder in vscode
2. Open terminal or command line and type : **npm run install-all**
3. create file `.env`, coppy all the contents in `.env.example` to it. If you want to run mongodb from cloud, you can update mongo URI to filepath `backend/config/connectDB.js`
4. Finally, type in terminal : **npm run dev**

## Some features from app

- Signup, Signin with Password or authentication via Google.
- Logout account
- Restore Password (Unavailable)

![image_1]("https://www.dropbox.com/s/5nsd5ba76pa5qs4/image_1.png")
