# Nameless Drive

Self hosted storage

## Setup

**Required things**

- [NodeJS](https://nodejs.org/en/download)
- [PNPM](https://pnpm.io/installation)

**Installing packages and setting up the DB**
After cloning/downloading the repo, open a terminal in that folder and run:

```bash
# Install packages
pnpm i
# Set up the DB
npx prisma migrate dev
npx prisma generate
```

**Starting**
After the database is set up you can start it my running

```bash
pnpm start
```

After that you can go to the link it writes and make the user and log into it
