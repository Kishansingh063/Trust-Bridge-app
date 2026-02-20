# Installation Guide

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- InstantDB React SDK
- Other dependencies

## Step 2: Run the Development Server

```bash
npm run dev
```

The app will start on `http://localhost:3000`

## Step 3: InstantDB Setup

The app is already configured with InstantDB App ID: `b9ce6a2a-5f26-40a5-9239-5c6dced07a65`

### Setting up InstantDB Schema

1. Go to [InstantDB Dashboard](https://instantdb.com/dashboard)
2. Select your app (or create a new one)
3. Go to Schema section
4. Add the following tables:

**users**
- id (id)
- email (string)
- name (string)
- role (string)
- createdAt (number)
- updatedAt (number)

**campaigns**
- id (id)
- title (string)
- description (string)
- fullDescription (string)
- target (number)
- raised (number)
- category (string)
- isEmergency (boolean)
- ngoId (id, nullable)
- createdAt (number)
- updatedAt (number)

**donations**
- id (id)
- campaignId (id)
- donorId (id)
- amount (number)
- status (string)
- createdAt (number)

**events**
- id (id)
- title (string)
- description (string)
- location (string)
- date (string)
- time (string)
- type (string)
- organizerId (id)
- createdAt (number)

**fundUsage**
- id (id)
- campaignId (id)
- amount (number)
- description (string)
- proofUrl (string, nullable)
- date (string)
- createdAt (number)

**volunteers**
- id (id)
- ngoId (id)
- userId (id)
- status (string)
- joinedDate (string)
- createdAt (number)

**reports**
- id (id)
- campaignId (id)
- reportedBy (id)
- reason (string)
- status (string)
- createdAt (number)

## Step 4: Testing Magic Code Authentication

1. Go to `/register` or `/login`
2. Enter your email
3. Check the browser console for the 6-digit OTP code
4. Enter the code to authenticate

**Note**: In production, integrate with an email service (SendGrid, AWS SES, etc.) to send real emails.

## Troubleshooting

### InstantDB Connection Issues

- Verify your App ID is correct in `src/lib/instantdb.js`
- Check that your schema matches the database schema
- Ensure you're logged into InstantDB dashboard

### OTP Not Working

- Check browser console for the code (development mode)
- Verify OTP service is generating codes correctly
- Check that InstantDB magic code auth is enabled

### Build Errors

- Run `npm install` again
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (requires v16+)

## Next Steps

1. Set up email service for production OTP delivery
2. Configure InstantDB permissions/rules
3. Add more features as needed
4. Deploy to production
