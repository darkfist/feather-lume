const card = () => {
  const templateData = [
    { title: "Feature One", description: "Build modern apps with pre-configured tools like Petite Vue and Firebase." },
    { title: "Feature Two", description: "Designed to be lightweight and easy to use." },
    { title: "Feature Three", description: "Leverage Ionic for a beautiful, responsive UI." },
    {
      title: "HTMX",
      description:
        "Build modern, interactive web experiences with minimal JavaScript using htmx. Fetch, swap, and update content dynamically with ease.",
    },
    {
      title: "TailwindCSS",
      description:
        "Style your application effortlessly with TailwindCSS, a utility-first CSS framework designed for speed and consistency.",
    },
    {
      title: "Capacitor",
      description:
        "Leverage Capacitor to turn your web app into a cross-platform mobile app with access to native device features.",
    },
  ];
  return { cardList: templateData };
};

export default card;
