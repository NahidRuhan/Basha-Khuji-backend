# Deployment Guide: Basha Khuji Backend

This guide outlines the complete step-by-step process to deploy the Basha Khuji backend API to production using **Vercel** (for hosting), **Neon** (for the PostgreSQL database), and **Stripe** (for live payment webhooks). 

Whether you are deploying this for the first time or setting up a fresh clone, follow these steps in order.

---

## Prerequisites
Before you begin, ensure you have the following:
- **Node.js** installed locally.
- **Git** installed and this repository cloned to your local machine.
- A free account on [Neon.tech](https://neon.tech/) (for the database).
- A free account on [Vercel](https://vercel.com/) (for hosting).
- A [Stripe Developer](https://dashboard.stripe.com/) account (for payments).

---

## Step 1: Local Setup

1. Clone the repository and navigate into the project folder:
   ```bash
   git clone https://github.com/NahidRuhan/Basha-Khuji-backend.git
   cd Basha-Khuji-backend
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

3. Create your environment variables file. Copy the example file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Note: You will fill in these variables during the next steps).*

---

## Step 2: Set Up the Live Database (NeonDB)

1. Go to [neon.tech](https://neon.tech/) and log in.
2. Click **Create Project**. Name it (e.g., `basha-khuji-db`), select PostgreSQL version 16, and click **Create**.
3. Neon will instantly generate a connection string that looks like this:
   `postgresql://username:password@ep-wispy-frost-....pooler.us-east-1.aws.neon.tech/neondb`
4. Copy this exact URL.
5. Open your local `.env` file and set the `DATABASE_URL` to this Neon URL.

---

## Step 3: Push Schema to the Live Database

Your new live database is currently completely empty. We need to push the Prisma schema (tables) and seed the initial admin data.

1. Open your terminal and run the following command to push the tables to Neon:
   ```bash
   npx prisma db push
   ```
2. Now, populate the database with your seed data (admin user, default categories, etc.):
   ```bash
   npm run seed
   ```
3. **IMPORTANT FOR LOCAL DEV:** If you plan to continue developing locally, change your `.env` file's `DATABASE_URL` *back* to a local PostgreSQL database URL. You do not want your local development server altering live production data!

---

## Step 4: Deploy to Vercel

*Note: This codebase is already pre-configured for Vercel. The `vercel.json` file handles routing, `tsconfig.json` compiles to CommonJS for strict Serverless Node compatibility, and `package.json` includes the necessary Prisma generation scripts.*

1. Go to [vercel.com](https://vercel.com/) and log in with your GitHub account.
2. Click **Add New** -> **Project**.
3. Import your cloned `Basha-Khuji-backend` repository.
4. **CRITICAL:** Before clicking Deploy, open the **Environment Variables** tab.
5. Copy every required variable from your `.env` file and paste them into Vercel.
   - **Important:** Ensure the `DATABASE_URL` you paste into Vercel is your **Neon Database URL**.
6. Click **Deploy**. Vercel will install dependencies, generate the Prisma client (including Linux binaries), build the TypeScript, and launch your API.

---

## Step 5: Configure Live Stripe Webhooks

Your Vercel deployment now has a live URL (e.g., `https://basha-khuji-backend.vercel.app`). You need to tell Stripe to send live payment events to this URL.

1. Log into your [Stripe Dashboard](https://dashboard.stripe.com/).
2. Navigate to **Developers** -> **Webhooks**.
3. Click **Add an endpoint**.
4. Set the Endpoint URL to your live Vercel URL + the webhook route:
   `https://<your-vercel-app-url>/api/payments/webhook`
5. Select the following events to listen to:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `checkout.session.async_payment_failed`
6. Click **Add endpoint**.
7. Stripe will generate a new **Signing Secret** (Webhook Secret) specifically for this live endpoint. Reveal it and copy it.
8. Go back to your Vercel project dashboard -> **Settings** -> **Environment Variables**.
9. Update the `STRIPE_WEBHOOK_SECRET` to this new live secret. *(Ensure `STRIPE_SECRET_KEY` is also set).*
10. Redeploy your Vercel app (or wait for the environment variables to propagate).

**Congratulations! Your Basha Khuji API is now fully deployed to production!**
