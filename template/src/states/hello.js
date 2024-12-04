import firebaseHello from "../services/firebaseHello";

const hello = () => {
  return {
    message: "Hello World!",
    async getFirebaseMessage() {
      const data = await firebaseHello();
      this.message = data[0].message;
    },
  };
};

export default hello;
