This is a [Next.js](https://nextjs.org/) project 

This project uses:
NextJS + TailwindCSS + PWA + Redux Toolkit + Auth0

## Prerequisites

1. NodeJS installed
2. `pnpm` installed
3. GCP + Firebase Account (To test Google Login Auth)

### GCP Instructions: (Only needed to test out Google Login)
Go to [Google Cloud Platform](https://cloud.google.com/free?utm_source=google&utm_medium=cpc&utm_campaign=japac-IN-all-en-dr-bkws-all-all-trial-e-dr-1009882&utm_content=text-ad-none-none-DEV_c-CRE_602265494289-ADGP_Hybrid%20%7C%20BKWS%20-%20EXA%20%7C%20Txt%20~%20GCP%20~%20General_%20Core%20Brand-KWID_43700071544383203-kwd-87853815-userloc_9303972&utm_term=KW_gcp-ST_gcp&gclid=CjwKCAjwzNOaBhAcEiwAD7Tb6Cy6XBPxKzJAl9MZScou50IE9ErgCA1-gSZ-7WZWpxCVvvcWdLYpDRoC21sQAvD_BwE&gclsrc=aw.ds) offial website and just make an account. 

### Firebase Instructions: (Only needed to test out Google Login)
1. Go to [Firebase](https://firebase.google.com/?gclid=CjwKCAjwzNOaBhAcEiwAD7Tb6OFQKrEZ6GJ1_Owmhir9UBS0bWhgOLUmbvMc_Ca8dYhP7ZLaP_TlGhoCImcQAvD_BwE&gclsrc=aw.ds) and create an account there with the same email Id.
2. Create a project in Firebase.
3. Select `Authentication` in dashboard and configure the project. Here you will get all the `sensitive` credentials. Now if you check youe GCP account now it will also create `API Keys`, `Service Account`, `OAuth Credentials` in the Credentials.
4. Now go to `Authentication` again after the project is created.
5. Click on `Google Login` and grant it. 
6. Add `localhost:3000` to the authorized domains which can be found on the `Settings`.

## Getting Started

Get the project
```bash
git clone https://github.com/Shubhrajyoti-Dey-FrosTiK/tpc-portal-frontend.git
```
Get into the project
```
cd tpc-portal-frontend
```
Make `.env` file
```
touch .env
```

Now populate the `.env` file with the following data which you got while making the `Authenticaiton` project on `Firebase` (Optional : Only needed to work with Google Authentication )
```.js
NEXT_PUBLIC_FIREBASE_API_KEY = "..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID = "..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "..."
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "..."
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "..."
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "..."
```

Install the packages

```bash
pnpm i
```

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
