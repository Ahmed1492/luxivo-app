# 🛍 Luxivo — E-Commerce React App

A modern, full-featured e-commerce web application built with React, Redux Toolkit, and SCSS.

---

## 🚀 Live Demo  
[![Live Demo](https://img.shields.io/badge/View%20Live-Vercel-blue?style=for-the-badge)](https://luxivo-app-git-main-ahmed1492s-projects.vercel.app/)


---

## ✨ Features

### 🛒 Shopping
- Browse products across all categories
- Product detail page with image gallery, ratings, stock info, and tabs
- Quick Add to cart from product cards with hover overlay
- Add to Cart / Buy Now buttons with success feedback
- Toast notifications on add & remove

### 🧺 Cart & Checkout
- Cart page with quantity controls, promo discount, and order summary
- Mini basket popup in navbar with remove and direct checkout
- 3-step checkout: Shipping → Payment → Confirmation
- Guest checkout with optional login gate
- Real order saved to localStorage on completion

### 👤 Authentication
- Register & Login modals with password strength meter and show/hide toggle
- User session persisted in localStorage via Redux
- Profile page with Overview, My Orders, and Edit Profile tabs
- Real order history with expandable item details per order

### 🔍 Search
- Full-text product search using dummyjson API
- Dedicated search results page with 5-column grid and empty state

### 🎨 UI / UX
- Sticky navbar with top bar, search, cart button, and profile dropdown
- Animated hero slider with 4 slides, auto-play, progress bar, and dot indicators
- Skeleton loading cards with shimmer animation on all product sections
- Left side drawer with category search and active link highlighting
- Responsive design across all pages

### 📄 Pages
| Route | Page |
|---|---|
| `/` | Home — slider, product sections |
| `/product/:id` | Single Product |
| `/category/:name` | Category Products |
| `/search?q=...` | Search Results |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout |
| `/profile` | User Profile & Orders |
| `/seller-center` | Seller Center (static) |
| `/support` | Support & FAQ |

---

## 🛠 Tech Stack

| Technology | Usage |
|---|---|
| React 18 | UI framework |
| Redux Toolkit | State management (cart, auth, orders) |
| React Router v6 | Client-side routing |
| SCSS | Styling |
| Axios | API requests |
| Material UI Icons | Icon library |
| DummyJSON API | Product & category data |

---

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/E-commerce-React-App.git

# Install dependencies
cd E-commerce-React-App
npm install

# Start development server
npm start
```

App runs at `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── assets/          # Images
├── Component/
│   ├── auth/        # Login, Register, CheckoutGate modals
│   ├── footer/      # Footer
│   ├── leftMenue/   # Side drawer with categories
│   ├── navbar/      # Sticky navbar
│   ├── productCard/ # Shared product card component
│   ├── productsBasket/ # Mini cart popup
│   ├── skeleton/    # Shimmer skeleton cards
│   ├── slider/      # Hero slider
│   └── toast/       # Toast notification system
├── pages/
│   ├── cart/
│   ├── checkout/
│   ├── HomePage/
│   ├── profile/
│   ├── searchResults/
│   ├── sellerCenter/
│   ├── singleCategory/
│   ├── singleProduct/
│   └── support/
└── redux/
    ├── authReducer.js
    ├── cartReducer.js
    ├── ordersReducer.js
    └── store.js
```

---

## 🔌 API

All product data is fetched from [DummyJSON](https://dummyjson.com):

- `GET /products` — All products
- `GET /products/search?q=` — Search
- `GET /products/category/:name` — By category
- `GET /products/:id` — Single product
- `GET /products/category-list` — All categories

---

## 👨‍💻 Author

**Ahmed Mohamed**  
Built with ❤️ using React & Redux
