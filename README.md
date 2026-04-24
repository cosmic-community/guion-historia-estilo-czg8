# Guion Historia - Anime Story

![App Preview](https://imgix.cosmicjs.com/2fbb9900-3fda-11f1-8d30-073df91da89f-autopilot-photo-1505142468610-359e7d316be0-1777034176126.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

An immersive anime-styled storytelling website built with Next.js and [Cosmic](https://www.cosmicjs.com) CMS. Experience the epic tale of three friends whose lives change forever.

## Features

- 🎬 Scene-by-scene story viewer with dramatic visuals
- 🦸 Character profile pages with powers and backstories
- 🎨 Anime-inspired dark aesthetic with dynamic gradients
- 📱 Fully responsive design
- ⚡ Next.js 16 App Router with Server Components
- 🔒 TypeScript strict mode

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69eb63505437d81e2f177c67&clone_repository=69eb64615437d81e2f177cb8)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: # Guion de la Historia (Estilo Anime) ## Escena 1 **Descripción visual:** Tres amigos (CHISPITAS, Yassbat14 y NickJR) caminando por la calle. Ven en las noticias de una pantalla gigante una pelea épica entre el villano Cosmo y el héroe Flames en un edificio cercano. **Subtítulo:** \"¡Miren! Es Flames, el héroe más poderoso del universo, peleando contra Cosmo.\" ... (and all 10 scenes)"

### Code Generation Prompt

> Build a Next.js application for a website called "Guion Historia (Estilo". The content is managed in Cosmic CMS with the following object types: characters, scenes. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

## Technologies Used

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cosmic SDK

## Getting Started

### Prerequisites

- Bun or Node.js 18+
- Cosmic account with bucket

### Installation

```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all scenes
const { objects } = await cosmic.objects
  .find({ type: 'scenes' })
  .depth(1)
```

## Cosmic CMS Integration

Uses `characters` and `scenes` object types with connected metafields.

## Deployment

Deploy to Vercel or Netlify with env vars: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`.

<!-- README_END -->