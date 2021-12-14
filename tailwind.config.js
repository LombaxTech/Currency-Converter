module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            screens: {
                sm: { max: "640px" },
                // => @media (min-width: 640px) { ... }

                md: { max: "768px" },
                // => @media (min-width: 768px) { ... }

                lg: { max: "1024px" },
                // => @media (min-width: 1024px) { ... }
            },
        },
    },
    plugins: [],
};
