# True Companions - Matrimony Platform

Welcome to True Companions, an intuitive and user-friendly Matrimony platform developed using the MERN stack (MongoDB, Express, React, and Node.js). This platform helps users connect with potential life partners seamlessly. Below is a detailed guide for understanding and using this project.

---

## Live Site
[Visit True Companions](https://truecompanions.live)

---

## Admin Credentials
- **Email:** admin@truecompanions.com
- **Password:** Admin@123

---

## Features

1. **Responsive Design**: The platform is optimized for mobile, tablet, and desktop devices.
2. **Authentication**:
   - Email/Password login.
   - Google Sign-in.
   - JWT-based authentication for secure access.
3. **Private Routes**: Restrict access to private pages like biodata details, dashboard, and checkout.
4. **CRUD Notifications**: Sweet alerts and toast notifications for all CRUD operations, login, and sign-up events.
5. **Dynamic Data Fetching**: Implements Tanstack Query for efficient data fetching and caching.
6. **Homepage**:
   - Eye-catching banner/slider.
   - Displays six premium member biodata cards with ascending/descending sorting.
   - "How It Works" section explaining the platform functionality.
   - Success Counter Section showcasing total biodatas, boys, girls, and completed marriages.
   - Success Stories Section with reviews and couple images sorted by marriage date.
7. **Filterable Biodatas Page**:
   - Filter biodatas by age range, gender, and division.
   - Displays up to 20 biodatas per page with pagination.
8. **Biodata Details**:
   - Displays detailed biodata information.
   - Includes options to add to favorites, request contact information, or make biodata premium.
   - Shows similar biodatas.
9. **User Dashboard**:
   - Edit and view biodata.
   - Manage contact requests and favorites.
   - Submit success stories.
10. **Admin Dashboard**:
    - Manage users and approve premium biodata.
    - Approve contact requests.
    - View success stories and platform statistics (with pie chart visualization).
11. **Payment Integration**: Stripe integration for contact information requests.
12. **Pagination**: Implemented on the biodatas page for better user experience.
13. **Environment Variables**: Firebase config keys and MongoDB credentials are hidden for security.

---

## Installation & Setup

1. **Clone the Repository**:
```bash
# Clone the client-side repository
https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-sumu9897

# Navigate to the project directory
cd b10a12-client-side-sumu9897
```

2. **Install Dependencies**:
```bash
npm install
```

3. **Environment Variables**:
Create a `.env` file in the root directory and add the following variables:
```env
REACT_APP_FIREBASE_API_KEY=<Your Firebase API Key>
REACT_APP_AUTH_DOMAIN=<Your Firebase Auth Domain>
REACT_APP_PROJECT_ID=<Your Firebase Project ID>
REACT_APP_STORAGE_BUCKET=<Your Firebase Storage Bucket>
REACT_APP_MESSAGING_SENDER_ID=<Your Firebase Messaging Sender ID>
REACT_APP_APP_ID=<Your Firebase App ID>
REACT_APP_SERVER_URL=<Your Backend Server URL>
```

4. **Run the Project**:
```bash
npm start
```

---

## Technology Stack

- **Frontend**: React.js, React Router, Tanstack Query, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Firebase Authentication, JWT
- **Payment Gateway**: Stripe
- **Styling**: Tailwind CSS (without Daisy UI)
- **Charts**: React Chart.js

---

## Folder Structure

```plaintext
src
├── assets         # Static assets like images
├── components     # Reusable UI components
├── contexts       # Context providers for global state management
├── hooks          # Custom hooks
├── layouts        # Layout components for pages
├── pages          # Page components (Home, Dashboard, Login, etc.)
├── routes         # Route configuration and private routes
├── services       # API service functions
├── styles         # CSS and Tailwind configurations
├── utils          # Utility functions and helpers
└── App.js         # Root component
```

---

## Key Pages

### 1. **Homepage**
- Banner/Slider.
- Premium biodata cards with sorting.
- "How It Works", Success Counter, and Success Story sections.

### 2. **Biodatas Page**
- Filterable and paginated biodatas.
- Displays 20 biodatas per page.
- Private route for viewing biodata details.

### 3. **Login & Registration**
- Login with email/password or Google.
- Registration with photo upload.

### 4. **Dashboard**
#### User Dashboard:
- Edit biodata.
- View biodata.
- Manage contact requests and favorites.
- Submit success stories.

#### Admin Dashboard:
- Manage users, approve premium biodata, and contact requests.
- View success stories and platform statistics.

---

## Contribution
Feel free to fork this repository and submit pull requests for improvements or new features.

---

## License
This project is licensed under the MIT License.
