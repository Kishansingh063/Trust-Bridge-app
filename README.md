# Donation Transparency & Trust Platform

A modern, responsive full-stack web application for transparent charitable donations, connecting donors with verified NGOs and tracking fund usage.

## Features

- 🎯 **Campaign Management**: Browse and create donation campaigns
- 💰 **Transparent Donations**: Track every rupee with fund usage proofs
- 🏢 **NGO Verification**: Verified NGOs with trust scores
- 📊 **Role-based Dashboards**: Separate dashboards for Donors, NGOs, and Admins
- 📅 **Events & Camps**: Find and join free medical camps, blood drives, and events
- 🗺️ **Nearby Help**: Locate NGOs and hospitals near you
- 🔒 **Magic Code Authentication**: Passwordless 6-digit OTP authentication
- 🗄️ **InstantDB Integration**: Real-time database with InstantDB

## Tech Stack

- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router DOM** for routing
- **InstantDB** for real-time database
- **Context API** for state management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- InstantDB account (App ID: `b9ce6a2a-5f26-40a5-9239-5c6dced07a65`)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── layouts/        # Layout components
├── dashboard/      # Dashboard pages (Donor, NGO, Admin)
├── services/       # Service layer (InstantDB, OTP)
├── context/        # React Context providers
├── lib/            # Library configurations (InstantDB)
├── hooks/          # Custom React hooks
├── assets/         # Static assets
└── routes/         # Route configuration
```

## Authentication Flow

### Magic Code (OTP) Authentication

1. **Email Entry**: User enters their email address
2. **Code Generation**: System generates a 6-digit magic code
3. **Code Delivery**: Code is sent to user's email (check console in dev mode)
4. **Code Verification**: User enters the 6-digit code
5. **Authentication**: Upon successful verification, user is logged in

### Registration Flow

1. User enters name, email, and selects role (Donor/NGO)
2. Magic code is sent to email
3. User verifies code
4. Account is created with InstantDB

## InstantDB Schema

The application uses the following schema:

- **users**: User profiles with email, name, and role
- **campaigns**: Donation campaigns with targets and raised amounts
- **donations**: Individual donation records
- **events**: Events and free camps
- **fundUsage**: Fund usage proofs with bills/receipts
- **volunteers**: Volunteer applications and status
- **reports**: Fraud reports and investigations

## Available Routes

- `/` - Homepage
- `/login` - Login with magic code
- `/register` - Register with magic code
- `/campaigns` - Campaign listing
- `/campaign/:id` - Campaign details
- `/donate/:id` - Donation page
- `/events` - Events and free camps
- `/join-ngo` - Join NGO page
- `/nearby-help` - Nearby help map
- `/dashboard/donor` - Donor dashboard
- `/dashboard/ngo` - NGO dashboard
- `/dashboard/admin` - Admin dashboard

## Features in Detail

### For Donors
- Browse verified campaigns
- Make secure donations
- Track donation history
- Join NGOs as volunteers
- View fund usage proofs

### For NGOs
- Create and manage campaigns
- Upload fund usage proofs
- Manage volunteers
- Track funds raised
- Build trust score

### For Admins
- Verify NGO registrations
- Handle fraud reports
- View platform statistics
- Manage platform operations

## Development Notes

### OTP Service

In development mode, OTP codes are logged to the browser console. In production, integrate with an email service like:
- SendGrid
- AWS SES
- Resend
- Nodemailer

### InstantDB Configuration

The app uses InstantDB with App ID: `b9ce6a2a-5f26-40a5-9239-5c6dced07a65`

Update the schema in `src/lib/instantdb.js` to match your InstantDB schema.

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License
