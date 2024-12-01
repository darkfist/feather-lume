import firebaseHello from "../src-backend/firebaseHello";

const ionicHello = () => {
  const data = {
    message: "Hello, Ionic with Alpine.js!",
    async getFirebaseMessage() {
      const data = await firebaseHello();
      this.message = data[0].message;
    },
  };
  return data;
};

export default ionicHello;
