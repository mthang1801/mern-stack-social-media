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

### Signup, Signin with Password or authentication via Google.

### Logout account

### Restore Password (Unavailable)

![image_1](./assests/image_1.png)

![image_2](./assests/image_2.png)

![image_3](./assests/image_3.png)

### When signup or login successfully, we will entry home page

![image_home](./assests/image_home.png)

### Try write a status and post

![image_4](./assests/image_4.png)

### After posting a status, I comment and response at this post

![image_5](./assests/image_5.png)

### Try posting many times

![image_6](./assests/image_6.png)

### Open Notification button

![image_7](./assests/image_7.png)

### Logging another account to communicate with current account

![image_8](./assests/image_8.png)

### This new account visit current home page account, and process to make friend. Then current account accept this request

![image_sub_make_friend_success_1](./assests/image_sub_make_friend_success_1.png)

![image_sub_make_friend_success_2](./assests/image_sub_make_friend_success_2.png)

### Remove Friend

![image_sub_make_friend_1](./assests/image_sub_make_friend_1.png)

![image_sub_make_friend_2](./assests/image_sub_make_friend_2.png)

![image_9](./assests/image_9.png)

![image_10](./assests/image_10.png)

### After removing friend, both are not friends, and because of websocket, 2 accounts have remove button friends together.

![image_11](./assests/image_11.png)

![image_12](./assests/image_12.png)

![image_13](./assests/image_13.png)

### Besides, we also visite contact page to find friend, requested friend, received request friend

![image_16](./assests/image_16.png)

### Open List Friends

![image_sub_2](./assests/image_sub_2.png)

### Open Notifications page

![image_sub_3](./assests/image_sub_3.png)
