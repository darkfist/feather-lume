import Alpine from "alpinejs";
import ionicHello from "../src-frontend/ionicHello";

// Attach Alpine to the window object (required for Alpine to work)
window.Alpine = Alpine;

// Register your Alpine component
Alpine.data('ionicHello', ionicHello);

// Start Alpine.js
Alpine.start();