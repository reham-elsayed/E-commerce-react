# E-commerce React

A modern e-commerce web application built with React, designed for a seamless shopping experience. This app features product browsing, search, cart and wishlist management, authentication, and more—leveraging a robust tech stack for high performance and easy scalability.

## Features

- **Product Catalog**: Browse a wide selection of products by category, with featured and related products highlighted.
- **Product Search**: Instantly filter and search products by title.
- **Product Detail Page**: View in-depth information, image gallery, pricing, and ratings for each product.
- **Add to Cart**: Easily add products to your cart for checkout.
- **Wishlist Functionality**: Manage your favorite products with add/remove wishlist actions.
- **User Authentication**: Register, login, password reset, and protected routes for secure user experience.
- **Cart Management**: View and adjust products in your shopping cart.
- **Order Checkout**: Streamlined checkout process for completing purchases.
- **Responsive UI**: Optimized for desktop and mobile devices.
- **Dark Mode Support**: User interface adapts for dark and light themes.
- **Loading Indicators**: Visual feedback during API requests and page transitions.

## Tech Stack

- **Frontend Framework**: [React](https://react.dev/) (`^18.3.1`)
- **Routing**: [React Router DOM](https://reactrouter.com/) (`^6.26.0`)
- **State Management & Data Fetching**: [@tanstack/react-query](https://tanstack.com/query/latest) (`^5.51.23`)
- **API Requests**: [Axios](https://axios-http.com/) (`^1.7.3`)
- **UI & Styling**:
  - [Tailwind CSS](https://tailwindcss.com/) (`^3.4.7`)
  - [Flowbite](https://flowbite.com/) & [Flowbite React](https://flowbite-react.com/) (`^2.5.1`, `^0.10.1`)
  - [FontAwesome](https://fontawesome.com/) (`^6.6.0`)
  - [React Slick Carousel](https://react-slick.neostack.com/) (`^0.30.2`)
- **Form Handling & Validation**:
  - [Formik](https://formik.org/) (`^2.4.6`)
  - [Yup](https://github.com/jquense/yup) (`^1.4.0`)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/) (`^2.4.1`)
- **Offline Detection**: [react-detect-offline](https://github.com/craigieboy/react-detect-offline) (`^2.4.5`)
- **Build Tool**: [Vite](https://vitejs.dev/) (`^5.3.4`)
- **Linting & Code Quality**: [ESLint](https://eslint.org/) (`^8.57.0`), with React and hooks plugins
- **Other Utilities**: [url-parse](https://github.com/unshiftio/url-parse), [sharp](https://github.com/lovell/sharp), [postcss](https://postcss.org/)

## Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

- `src/components/`: Main React components (Products, ProductDetail, Cart, Wishlist, etc.)
- `src/context/`: Global state management (CartContext, WishListContext)
- `src/App.jsx`: Entry point and route definitions
- `public/`: Static assets

## License

This project currently does not specify a license.

---

**Homepage:** [Live Demo](https://e-commerce-react-blue-beta.vercel.app)
**Author:** [reham-elsayed](https://github.com/reham-elsayed)
