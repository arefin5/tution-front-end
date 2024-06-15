// module.exports = {
//   darkMode: 'class',
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",


//   ],
//   theme: {
//     extend: {


//     },
    
//   },
//   plugins: [
//     require('tailwind-scrollbar')
//   ],
//   variants: {
//     scrollbar: ['rounded']
//   }
// }
// module.exports = {
//   darkMode: 'class',
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",


//   ],
//   theme: {
//     extend: {


//     },
    
//   },
//   plugins: [
//     require('tailwind-scrollbar')
//   ],
//   variants: {
//     scrollbar: ['rounded']
//   }
// }
// module.exports = {
//   darkMode: 'class',
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "./src/**/*.{js,ts,jsx,tsx}", // Add any other relevant directories
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('tailwind-scrollbar'),
//   ],
//   variants: {
//     scrollbar: ['rounded'],
//   },
// }
// // tailwind.config.js
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       gridTemplateColumns: {
//         'auto': 'repeat(auto-fit, minmax(0, 1fr))', // Example for auto columns
//         '2': 'repeat(2, minmax(0, 1fr))', // Example for 2 columns
//         // Define more if needed for other breakpoints
//       },
//     },
//   },
//   plugins: [],
// };
module.exports = {
  darkMode: 'class', // Enables dark mode with a 'class' strategy
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Paths to all of your pages
    "./components/**/*.{js,ts,jsx,tsx}", // Paths to all of your components
  ],
  theme: {
    extend: {
      // Custom theme extensions go here
    },
    extend: {},
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Plugin for custom scrollbars
  ],
  variants: {
    scrollbar: ['rounded'], // Enable rounded variant for scrollbars
  },
};
