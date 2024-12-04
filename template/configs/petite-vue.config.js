// @ts-ignore
import { createApp } from "petite-vue";
import card from "../src/states/card";
import hello from "../src/states/hello";

createApp({ card }).mount("#cardListSection");
createApp({ hello }).mount();


