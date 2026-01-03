import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "./node_modules/flowbite-react/lib/esm/**/*.js",
        "./node_modules/flowbite/**/*.js" // Required for Flowbite styles
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Roboto", ...defaultTheme.fontFamily.sans],
                hand:["Dancing Script", 'cursive'],
                inter:['Inter', 'cursive'],
            },
            screens:{
                'hp-land': { min: '640px', max: '767px' }
            }
        },
    },

    plugins: [forms, require("flowbite/plugin")],
};
