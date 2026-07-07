# Deployment Guide: Vercel + NeonDB + Stripe

This guide outlines the complete step-by-step process to deploy the Basha Khuji backend API to production using Vercel (for hosting), Neon (for the PostgreSQL database), and Stripe (for live payment webhooks).

---

## Step 1: Codebase Preparation (Completed)

Your codebase is already prepared for Vercel deployment:
1. **`vercel.json`**: This file exists in the root directory and tells Vercel how to route traffic to your Express application.
2. **`package.json`**: The `"postinstall": "prisma generate"` script has been added. This is critical because Vercel needs to generate the Prisma Client during its build process.

*Make sure all your latest changes are pushed to your GitHub repository.*

---

## Step 2: Set Up the Live Database (NeonDB)

1. Go to [neon.tech](https://neon.tech/) and create a free account.
2. Click **Create Project**. Name it (e.g., `basha-khuji-db`), select PostgreSQL version 16, and click Create.
3. Neon will display a connection string. It will look something like this:
   `postgresql://username:password@ep-wispy-frost-....pooler.us-east-1.aws.neon.tech/neondb`
4. Copy this exact URL.

---

## Step 3: Push Schema to the Live Database

Your new live database is currently completely empty. We need to push the Prisma schema and seed the initial data.

1. Open your local `.env` file.
2. **Temporarily** replace your local `DATABASE_URL` with the Neon live database URL you just copied.
3. Open your terminal and run the following command to push the tables to Neon:
   ```bash
   npx prisma db push
   ```
4. Now, populate the database with your seed data (admin user, etc.):
   ```bash
   npm run seed
   # or npx tsx prisma/seed.ts
   ```
5. **CRITICAL:** Change your `.env` file's `DATABASE_URL` *back* to your local localhost database URL. You do not want your local development server altering live production data!

---

## Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com/) and log in with your GitHub account.
2. Click **Add New** -> **Project**.
3. Import your `Basha-Khuji-backend` repository.
4. Open the **Environment Variables** tab *before* you click Deploy.
5. Copy every variable from your local `.env` file and paste them into Vercel.
   - **Important:** Ensure the `DATABASE_URL` you paste into Vercel is your **Neon Database URL**, NOT your local database URL!
6. Click **Deploy**. Vercel will install dependencies, generate the Prisma client, build the TypeScript, and launch your API.

---

## Step 5: Configure Live Stripe Webhooks

Your Vercel deployment will have a live URL (e.g., `https://basha-khuji-backend.vercel.app`). Now you need to tell Stripe to send live payment events to this URL instead of your local CLI.

1. Log into your [Stripe Dashboard](https://dashboard.stripe.com/).
2. Navigate to **Developers** -> **Webhooks**.
3. Click **Add an endpoint**.
4. Set the Endpoint URL to your live Vercel URL + the webhook route:
   `https://<your-vercel-app-url>.vercel.app/api/payments/webhook`
5. Select the following events to listen to:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `checkout.session.async_payment_failed`
6. Click **Add endpoint**.
7. Stripe will generate a new **Signing Secret** (Webhook Secret) specifically for this live endpoint. Reveal it and copy it.
8. Go back to your Vercel project dashboard -> Settings -> Environment Variables.
9. Update the `STRIPE_WEBHOOK_SECRET` to this new live secret. (Also ensure your `STRIPE_SECRET_KEY` is your live/test Stripe key).
10. Redeploy your Vercel app (or wait for the environment variables to propagate) so it picks up the new webhook secret.

**You are now fully deployed to production!**
