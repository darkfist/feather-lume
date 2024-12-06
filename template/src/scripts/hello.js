import pb from "../../pb.config";

const hello = () => {
  return {
    message: "Hello World!",
    async getPocketbaseMessage() {
      const records = await pb.collection("posts").getOne("6ikq7x5apwcs1uz");
      this.message = records.title;
    },
  };
};

export default hello;
