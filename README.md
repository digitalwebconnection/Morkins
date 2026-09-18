# Morkins - Premium Skin & Hair Care E-Commerce Platform

Morkins is a modern, high-performance e-commerce web application dedicated to premium skin care and hair care products. Built with React 19, TypeScript, and Vite, it offers a seamless, fast, and visually stunning shopping experience.

## ✨ Key Features (Client-Facing)

- **Immersive User Experience:** Smooth scrolling (Lenis) and dynamic animations (Framer Motion) for a premium feel.
- **Dedicated Product Categories:** Specialized experiences for Skin Care (Women) and Hair Care (Men).
- **Advanced Product Catalog:** Multi-filter sidebar, dynamic search, and sorting.
- **Rich Product Details:** High-resolution galleries, ingredient spotlights, and customer reviews.
- **User Profiles & Sanctuary Vault:** Order history, address management, and secure payment methods.
- **Smart Cart System:** Slide-over cart drawer for quick access without leaving the page.
- **Order Tracking & Invoices:** Live order status tracking and digital invoice downloads.
- **Blog & Clinical Journal:** Editorial content with tag filtering and reading views.
- **Responsive & Accessible:** Fully optimized for mobile, tablet, and desktop devices.
- **Internationalization (i18n):** Multi-language support built-in.

## 🛡️ Admin Panel (Dashboard)

The Morkins ecosystem includes a comprehensive, secure Admin Panel designed for store managers and administrators to efficiently manage the platform.

### Admin Features:
- **Analytics Dashboard:** Real-time metrics on sales, traffic, conversion rates, and revenue.
- **Product Management:** Add, edit, or delete products, manage inventory levels, upload high-res images, and organize categories (Skin Care, Hair Care, Best Sellers, New Arrivals).
- **Order Processing:** View and update order statuses, manage refunds/returns, and generate shipping labels.
- **Customer Management:** View user profiles, purchase history, and handle customer support tickets.
- **Content Management System (CMS):** Manage blog posts, update FAQs, and modify legal policies directly from the dashboard.
- **Promotions & Discounts:** Create coupon codes, manage promotional campaigns, and set up seasonal sales.
- **Role-Based Access Control (RBAC):** Secure access levels for different staff members (Super Admin, Editor, Support Agent).

## 🛠️ Technology Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **Scrolling:** Lenis (Smooth Scroll)
- **Routing:** React Router DOM (v7)
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/morkins.git
cd morkins
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Available Scripts

- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles TypeScript and builds the app for production.
- `npm run lint`: Runs Oxlint to check for code quality and linting errors.
- `npm run preview`: Bootstraps a local web server to preview the production build.

## 📂 Project Structure

```text
morkins/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable UI components
│   ├── context/        # React Context providers (Auth, Cart, Language, etc.)
│   ├── features/       # Feature-specific modules
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and API clients
│   ├── routes/         # Page components and route definitions
│   ├── types/          # TypeScript interfaces and types
│   ├── App.tsx         # Root component
│   └── main.tsx        # Application entry point
├── package.json        # Dependencies and scripts
└── vite.config.ts      # Vite configuration
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.
