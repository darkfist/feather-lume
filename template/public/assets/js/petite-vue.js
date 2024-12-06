import { createApp } from "petite-vue";
import card from "../../../src/scripts/card";
import hello from "../../../src/scripts/hello";

createApp({ card }).mount("#cardListSection");
createApp({ hello }).mount();
