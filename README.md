# recall.it

Simple Note-like app to keep track of your study concepts, and practice fixating by writing about it.

## 🎯 Main Goal

The main goal of this app is to quickly record a new concept when introduced to.

For example, your teacher explained Context API in React. You make a new note with the title
"Context APIs" with the content of "Context API is React's way to pass state to many components without prop drilling."

## 💻 Technologies

- Typescript
- NextJS
- ChakraUI
- Firebase Auth
- Firebase Firestore
- React Hook Form
- React Icons
- React Timer Hook
- Axios
- Nookies
- UUID

## ✨ What I learned

This project was really cool to develop (and kinda tough), but because of this I was able
to learn more about the technologies that were being used.

- I learned how to manipulate cookies on the server side and client side with Nookies;
- I used react-hook-form for the first time effectively;
- First time using firebase with NextJS serverless functions (I had already used it on the client-side only);
- Created my own hook, called "useNotes". It returns note manipulation functions, like adding and reloading notes. My motivation for creating this hook was to have a way to share these information across pages, since my context had to receive a "notes" prop from getServerSideProps, only allowing it to be used in a singular page.
- First time effectively using Chakra UI. The developer experience was great in general, although I kept having the same "object.fromEntries" error during the making of this app.

