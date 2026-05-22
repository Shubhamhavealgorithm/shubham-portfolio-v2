# Shubham Portfolio V2

Cinematic personal portfolio for **Shubham Deshmukh** built with **Next.js + React + TypeScript + Tailwind CSS + Framer Motion + React Three Fiber (Three.js)**.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run lint
npm run build
npm run start
```

## New dependencies

- `three`
- `@react-three/fiber`
- `@react-three/drei`

## Included sections

- Cinematic intro boot sequence (with reduced-motion support)
- Founder-style hero with layered depth, holographic overlays, portrait compositing, and R3F-enhanced cinematic layer
- Sticky glass navbar with smooth section navigation
- Scroll storytelling with pinned scene flow and section choreography
- Product showcase modules (not cards): **VULISCAN**, **INTELLI**, **Blockchain Chat**
- Skills modules, cinematic experience timeline, and command-center contact section
- Resume actions wired to:
  - `https://drive.google.com/file/d/18GXKNt5-TjgRpPST7_x_N8C9GVhU0IX7/view?usp=sharing`

## Contact wiring

- Email: `shubhamdeshmukh843@gmail.com`
- LinkedIn: `https://linkedin.com/in/shubham-deshmukh/`
- GitHub: `https://github.com/Shubhamhavealgorithm`

## Portrait asset

The hero expects the provided portrait at:

- `public/image1.jpg`

If the file is missing, the app falls back to a non-image hero placeholder while keeping the rest of the cinematic experience intact.

## Deploy to Vercel

1. Push repository to GitHub.
2. Import the repo in Vercel.
3. Keep framework preset as **Next.js**.
4. Deploy.

## Connect custom domain (`shubhamdeshmukh.com`)

1. In Vercel project, open **Settings → Domains**.
2. Add `shubhamdeshmukh.com` and `www.shubhamdeshmukh.com`.
3. Add DNS records from Vercel at your domain registrar.
4. Wait for SSL provisioning and verify both root + `www` resolve.
