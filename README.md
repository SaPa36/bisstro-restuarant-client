# 🥗 Bistro Boss | Full-Stack Restaurant Management System

Bistro Boss is a premium MERN-stack application designed to bridge the gap between fine dining and digital convenience. It features a sleek, responsive user interface for customers and a powerful, data-driven dashboard for administrators to manage restaurant operations and sales analytics.

### 🔗 Deployment Links
* **Live Client:** https://bisstro-restuarant.web.app/dashboard/adminHome
* **Server API:** https://bisstro-restuarant-server.vercel.app

---

## 📸 Project Showcases

### 🏠 User Interface (Home & Menu)
| Home Page | Menu |
| :---: | :---: |
| <img width="600" src="https://github.com/user-attachments/assets/eded2eb2-6a03-48dd-a283-e994caf85955" /> | <img width="600" src="https://github.com/user-attachments/assets/80b04465-6f09-4ae8-a7f7-87945b24396e" /> |
| *Elegant landing page with featured items.* | *Categorized menu with dynamic filtering.* |

### 💳 User Panel (Payment & History)
| Pay Order (Stripe) | Payment History |
| :---: | :---: |
| <img width="600" src="https://github.com/user-attachments/assets/2f488da2-253b-41d7-9352-92e9d7853da2" /> | <img width="600" src="https://github.com/user-attachments/assets/b6978a82-f150-4767-bb65-d0b225363904" /> |
| *Secure checkout powered by Stripe.* | *Comprehensive record of all past transactions.* |

### 🛡️ Admin Dashboard
| Admin Home (Analytics) | Manage Items (Inventory) |
| :---: | :---: |
| <img width="600" src="https://github.com/user-attachments/assets/a70baa0a-173d-40ad-9e9c-cfaecaeea828" /> | <img width="600" src="https://github.com/user-attachments/assets/190a4744-beb8-486d-a7bc-e2a9f5d90f4c" /> |
| *Visualizing sales and revenue trends using Recharts.* | *Streamlined CRUD interface for managing the restaurant menu.* |

---

## ✨ Key Features

### 👤 Customer Features
* **Secure Authentication:** Seamless Social (Google) and Email/Password login powered by **Firebase Authentication**.
* **Dynamic Menu:** Explore a categorized menu (Pizza, Soup, Salad, Dessert) with real-time price updates.
* **Smart Cart:** Efficient persistent cart management using **TanStack Query** to ensure no items are lost during browsing.
* **Secure Checkout:** Fully integrated **Stripe API** payment gateway for safe and secure transactions.
* **Order History:** A dedicated user dashboard to track previous food orders and view digital payment receipts.

### 🛡️ Admin Features
* **Executive Dashboard:** High-level data visualization of revenue and order quantity per category using **Recharts**.
* **Menu Management:** Complete CRUD functionality allowing admins to Add, Update, and Delete food items instantly.
* **User Management:** Securely manage user permissions, including promoting users to Admin roles.
* **Inventory Insights:** Real-time metrics showing total products, active users, and fulfillment rates.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, DaisyUI, Recharts
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (NoSQL)
* **Security:** JSON Web Tokens (JWT) & Firebase Auth
* **Payments:** Stripe API Integration
* **State Management:** TanStack Query (React Query) & Axios

---

## 🛡️ Technical Implementation

### Advanced Data Aggregation
The primary technical challenge was calculating real-time "Orders by Category" for the Admin dashboard. I implemented a complex **MongoDB Aggregation Pipeline** utilizing `$lookup` and `$group` to join the `payments` and `menu` collections. This ensures the dashboard displays accurate revenue data directly from the database without extra client-side processing.



### Secure API Routing
To protect sensitive restaurant data, I built a multi-layered security system. This includes custom middleware for **JWT verification** and an `verifyAdmin` check that ensures only authorized users can access administrative endpoints or modify menu data.

---

## 💻 Local Setup

1. **Clone the project:** ```bash
   git clone https://github.com/SaPa36/bisstro-restuarant-client.git

2. Install dependencies: ```bash
npm install


3. Configure Environment Variables:
Create a .env.local file in the root directory and add the following:

  * VITE_apiKey=AIzaSyALjzNRGJV8qTSnIsbJzTJ7D8dNbowobRk
  * VITE_authDomain=bisstro-restuarant.firebaseapp.com
  * VITE_projectId=bisstro-restuarant
  * VITE_storageBucket=bisstro-restuarant.firebasestorage.app
  * VITE_messagingSenderId=808978390471
  * VITE_appId=1:808978390471:web:b1581778feb3bfbf0ecde2
  * VITE_IMAGE_HOSTING_KEY=6bb187acec781489599270fdf25413dd
  * VITE_PAYMENT_GATEWAY_KEY=pk_test_51T2Rzp7ls35eVYZEXBDR458I5JxJ3yJbQPEp55IHRjFG5VIaV1yHoAIzhLxGcfTIufSvEKogcjp2TbUqRPRqPf1o004iGzYMbM
    
5. Run the application: ```bash
npm run dev


© 2026 Nursapa | Built with ❤️ and the MERN Stack.
