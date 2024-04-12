# Pokedex

A pokedex app using the [Pokemon API](https://pokeapi.co/). This project was created for a technical challenge.

## Description

The main application is a SPA using Next and React. The main feature is a dashboard with a list off all pokemons, and a single page with most information about a selected Pokemon. This application is created with Next.js, however, I decided to deactivate SSR to better reflect the technical challenge requirements.

I'm using Tanstack Query as the solution for data fetching. I also used `window.locaStorage` to implement the **Visited** feature.

This application is deployed on Vercel, and you can find it via this [link](https://pokedex.juanalvarez.dev/).

## Local Development

To run the project locally, fork the repository and clone it to your local machine. Then, run the following commands:

```bash
npm install
npm run dev
```

There is no need for .env files since all the API is public.

## Technologies

- Next [Link](https://nextjs.org/)
- React [Link](https://reactjs.org/)
- TailwindCSS [Link](https://tailwindcss.com/)
- Shadcn/ui [Link](https://https://ui.shadcn.com/)
- Tanstack Query [Link](https://tanstack.com/query)
