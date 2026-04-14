# LUXE - Modern E-Commerce Web App

LUXE is a modern, responsive e-commerce web application built using React.js. It provides a smooth shopping experience with optimized performance, clean UI, and real-world features like filtering, cart management, and checkout flow.

---

## Features

### Home Page
- Hero section with promotional banner (20% OFF)
- Category showcase with images
- Featured products section
- Promo banner for special offers
- Newsletter subscription section

---

### Shop Page
- Product listing with dynamic data
- Category-based filtering
- Search functionality
- Sorting (Low → High / High → Low)
- "Load More" functionality (pagination after 8 products)
- Skeleton loading UI for better UX

---

### Product Details Page
- Product image & detailed information
- Price, discount, and rating display
- Add to Cart & Buy Now buttons
- Apply coupon option
- Back navigation button

---

### 🛍️ Cart Page
- Displays selected products
- Quantity handling
- Price calculation
- Persistent cart using context

---

### Authentication
- Sign In form
- Sign Up form
- Basic authentication flow

---

### Checkout Page
- Order summary
- Pricing breakdown
- Checkout flow UI

---

### Deals Page
- Special offers and discounted products

---

## Components Structure

### Common Components
- `ProductCard` → Displays product UI
- `ProductSkeleton` → Loading placeholder
- `Spinner` → Loading indicator
- `Toast` → Notifications
- `Layout` → Page structure wrapper

### Layout Components
- `Header` → Navigation bar (responsive)
- `Footer` → Footer section

---

## Performance Optimizations

- Lazy loading images (`loading="lazy"`)
- Image optimization using WebP format
- Skeleton loaders for smooth UX
- Efficient rendering using React hooks
- Reduced bundle size

---

## Tech Stack

- React.js
- React Router DOM 7
- Context API (State Management)
- CSS (Custom Styling)
- State Management
- API Integration (dummyjson)
- Hooks (useRef, useState, useEffect)
- Async, await
- React Icons

---

## Project Structure

src/
│── components/
│ ├── common/
| |--------ProductCard.jsx
| |--------ProductCard.css
| |--------ProductSkeleton.jsx
| |--------ProductSkeleton.css
| |--------Toast.jsx
| |--------Toast.css
| |--------ScrollToTop.jsx
| |--------Spinner.css
| |--------Spinner.jsx
| |--------SmallSpinner.jsx
│ ├── layout/
| |------Header.jsx
| |------Header.css
| |------Footer.jsx
| |------Footer.jsx
| |------Layout.jsx
│
│── pages/
│ ├── Home.jsx
│ ├── Home.css
│ ├── Shop.jsx
│ ├── Shop.css
│ ├── Deals.jsx
| |___Deals.css
│ ├── About.jsx
│ ├── About.css
│
│── context/
| |---------AuthContext.jsx
| |---------CartContext.jsx
|___features/
| |_______auth/
| |------------RequireAuth.jsx
| |------------Signin.jsx
| |------------Signup.jsx
| |------------Signup.css
| |_______cart/
| |-------------Cart.jsx
| |-------------Cart.css
| |_______checkout/
| |-----------Checkout.jsx
| |-----------Checkout.css
| |_______product/
| |-----------ProductDetail.jsx
| |-----------ProductDetail.css
| |_______loaders/
| |-----------dealloader.js
| |-----------homeloader.js
| |-----------productloader.js
| |-----------shoploader.js
| |_______-utils/
| |----------cartUtils.js
| |----------Currency.js
│── assets/
│── App.jsx
│── main.jsx


---

## Screenshots

_Add your screenshots here (Home, Shop, Product Page, Cart, etc.)_
/*<img width="200" height="200" alt="Screenshot from 2026-04-14 16-23-40" src="https://github.com/user-attachments/assets/2f972db5-6a5d-4014-89df-c955feb97f5e" />*/


---

## Live Demo
 vercel live demo link - https://e-commerce-react-app-vert.vercel.app/

---

## Getting Started

### 1. Clone the repo
git clone https://github.com/Damu987/E-commerce-react-app.git


### 2. Install dependencies

1. npm install
2. If you want to install manually (for learning)
 Core React + Router + Icons
npm install react react-dom react-router-dom react-icons



### 3. Run the app

npm run dev


---

## Future Improvements

- Wishlist feature 
- Payment gateway integration 
- User authentication with backend 
- Order history 
- Admin dashboard 

---

## Author

**Damini S**  
Frontend Developer (Fresher)

---

##  Show Your Support

If you like this project, give it a ⭐ on GitHub!
