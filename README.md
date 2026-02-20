# 💍 BandhanBD — Client

> Bangladesh's trusted matrimonial platform. Browse thousands of verified biodata profiles, connect with your ideal match, and share your success story.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-11.2-FFCA28?logo=firebase)](https://firebase.google.com)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)](https://stripe.com)

---

## 🌐 Live Demo

| Resource | URL |
|---|---|
| 🖥️ Live Site | [https://true-companions.web.app](https://true-companions.web.app) |
| 🔧 Server API | [https://true-companions-server.vercel.app](https://true-companions-server.vercel.app) |


---

## ✨ Key Features

1. **Homepage** — Hero banner, 6 premium member cards (sortable by age), How It Works section, animated success counters, and success stories sorted by marriage date
2. **Browse Biodatas** — Paginated biodata listing (20 per page) with filters for age range, gender, and division
3. **Biodata Details** — Full profile view with 3 similar biodatas; contact info hidden for non-premium users
4. **Firebase Authentication** — Email/password registration with profile photo upload, Google OAuth, and JWT-based session persistence across page refreshes
5. **Create & Edit Biodata** — 20-field biodata form with auto-calculated age from date of birth and image upload via ImgBB
6. **View My Biodata** — Read-only profile view with "Request Premium Status" button triggering admin approval workflow
7. **Favourites** — Save and manage favourite biodata profiles from a dedicated dashboard table
8. **Stripe Payment** — Secure $5 USD card payment to request contact information for a specific biodata
9. **My Contact Requests** — Track all contact requests; approved requests reveal mobile and email of the profile
10. **Got Married Form** — Submit a success story with couple photo, marriage date, star rating, and story text
11. **Admin Dashboard** — KPI cards + pie chart showing total/male/female/premium counts and revenue
12. **Manage Users** — Search users by name, make admin, grant premium, or delete users
13. **Approve Premium Requests** — Admin queue for approving biodata premium status requests
14. **Approve Contact Requests** — Admin queue to approve paid contact info requests
15. **Fully Responsive** — Mobile-first design with collapsible sidebar dashboard and drawer filters

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS (no DaisyUI) |
| Routing | React Router DOM v7 |
| State / Data Fetching | TanStack Query v5 |
| Authentication | Firebase Auth (Email + Google OAuth) |
| HTTP Client | Axios (with JWT interceptor) |
| Payment | Stripe React + Stripe.js |
| Forms | React Hook Form |
| Notifications | SweetAlert2 |
| Charts | Recharts |
| Animations | Framer Motion |
| Image Hosting | ImgBB API |
| Icons | React Icons |

---

## 📁 Project Structure

```
src/
├── main.jsx                          # App entry point
├── index.css                         # Global styles
│
├── firebase/
│   └── firebase.config.js            # Firebase initialization
│
├── providers/
│   └── AuthProvider.jsx              # Auth context + JWT issuance
│
├── hooks/
│   ├── useAuth.jsx                   # Access AuthContext
│   ├── useAdmin.jsx                  # Check admin role via TanStack Query
│   ├── useAxiosPublic.jsx            # Public Axios instance
│   ├── useAxiosSecure.jsx            # JWT-intercepted Axios instance
│   └── useFavorite.jsx               # Fetch user favourites
│
├── Routes/
│   ├── Routes.jsx                    # Full router definition
│   ├── PrivateRoute.jsx              # Redirect guests to /login
│   └── AdminRoute.jsx                # Redirect non-admins to /
│
├── Layout/
│   ├── Main.jsx                      # Public layout (Navbar + Footer)
│   └── Dashboard.jsx                 # Dashboard layout (sidebar + outlet)
│
├── components/
│   ├── Banner.jsx                    # Hero section
│   ├── Loading.jsx                   # Spinner component
│   ├── Premium.jsx                   # Premium member cards
│   └── SocialLogin/
│       └── SocialLogin.jsx           # Google sign-in button
│
└── Pages/
    ├── Shared/
    │   ├── Navbar.jsx                # Sticky responsive navbar
    │   └── Footer.jsx                # 4-column footer
    │
    ├── Home/
    │   ├── Home.jsx
    │   ├── Works.jsx                 # How It Works section
    │   ├── SuccessCounter.jsx        # Animated stat counters
    │   └── SuccessStory.jsx          # Success story cards
    │
    ├── BiodatasPage/
    │   └── BiodatasPage.jsx          # Filter sidebar + paginated grid
    │
    ├── BiodataDetails/
    │   └── BiodataDetails.jsx        # Full profile + similar biodatas
    │
    ├── Login/
    │   └── Login.jsx
    │
    ├── SignUp/
    │   └── SignUp.jsx
    │
    ├── About/About.jsx
    ├── Contact/ContactUs.jsx
    ├── ErrorPage/ErrorPage.jsx
    │
    └── Dashboard/
        ├── User/
        │   ├── EditBiodata.jsx       # Create / update biodata (upsert)
        │   ├── ViewBiodata.jsx       # Read-only profile + premium request
        │   ├── MyContactRequest.jsx  # Contact request status table
        │   ├── FavouriteBiodata.jsx  # Saved profiles table
        │   ├── GotMarriedForm.jsx    # Success story submission
        │   ├── CheckOut.jsx          # Stripe Elements wrapper
        │   └── CheckoutForm.jsx      # Card form + payment flow
        │
        └── Admin/
            ├── DashboardPage.jsx     # KPI cards + pie chart
            ├── ManageUsers.jsx       # User management table
            ├── ApprovedPremium.jsx   # Premium approval queue
            └── ApprovedContactReq.jsx # Contact request approval
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18+**
- npm or yarn
- Firebase project
- Stripe account (test mode)
- ImgBB account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sumu9897/bandhanbd-client.git
cd bandhanbd-client

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Fill in your values (see Environment Variables section below)

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
# Server API
VITE_API_BASE_URL=https://your-server-domain.vercel.app

# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe (publishable key only — never the secret key)
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxx

# ImgBB image hosting
VITE_IMAGE_HOSTING_KEY=your_imgbb_key
```

> ⚠️ Never commit `.env` to version control. It is already listed in `.gitignore`.

---

## 🔑 Authentication Flow

```
User signs in (Firebase)
       ↓
AuthProvider detects onAuthStateChanged
       ↓
POST /jwt { email } → Server issues 7-day JWT
       ↓
JWT stored in localStorage
       ↓
useAxiosSecure attaches JWT to every request header
       ↓
Server verifies JWT → grants/denies access
```

- Session persists across page refreshes via `onAuthStateChanged` re-issuing the JWT
- 401/403 responses automatically log the user out and redirect to `/login`

---

## 💳 Payment Flow

```
User clicks "Request Contact Info" on a biodata
       ↓
Redirected to /checkout/:biodataId (PrivateRoute)
       ↓
POST /payment/create-intent → Stripe PaymentIntent created ($5)
       ↓
User enters card details → stripe.confirmCardPayment()
       ↓
On success:
  1. POST /payments         → save payment record
  2. POST /contact-requests → create pending contact request
       ↓
Admin approves from dashboard
       ↓
User sees contact info in "My Contact Requests"
```

**Stripe Test Cards:**

| Card Number | Result |
|---|---|
| `4242 4242 4242 4242` | ✅ Payment succeeds |
| `4000 0000 0000 9995` | ❌ Payment declined |
| `4000 0025 0000 3155` | 🔐 3D Secure required |

Use any future expiry date and any 3-digit CVV.

---

## 🧭 Route Map

| Path | Access | Component |
|---|---|---|
| `/` | Public | Home |
| `/biodatapage` | Public | BiodatasPage |
| `/biodata/:id` | Private | BiodataDetails |
| `/about` | Public | About |
| `/contact` | Public | ContactUs |
| `/login` | Public | Login |
| `/signup` | Public | SignUp |
| `/checkout/:biodataId` | Private | CheckOut |
| `/dashboard/edit-biodata` | Private | EditBiodata |
| `/dashboard/view-biodata` | Private | ViewBiodata |
| `/dashboard/contact-request` | Private | MyContactRequest |
| `/dashboard/my-favourites` | Private | FavouriteBiodata |
| `/dashboard/got-married` | Private | GotMarriedForm |
| `/dashboard/admin` | Admin | DashboardPage |
| `/dashboard/manage` | Admin | ManageUsers |
| `/dashboard/approvedPremium` | Admin | ApprovedPremium |
| `/dashboard/approvedContactRequest` | Admin | ApprovedContactReq |

---

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

Make sure `firebase.json` is configured for SPA routing:

```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

---

## 🧪 Test Accounts

| Role | Email | Password |
|---|---|---|
| User | `user@bandhanbd.com` | `User@12345` |
| Premium User | `premium@bandhanbd.com` | `Premium@12345` |

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📄 License

This project is licensed under the MIT License.