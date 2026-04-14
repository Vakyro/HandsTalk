# HandsTalk — AI Sign Language Platform

**Break communication barriers, one sign at a time.**

HandsTalk is a modern, AI-powered web platform for sign language translation and interactive learning. It lets anyone translate sign language to text, generate sign language videos from text, and learn ASL/BSL through gamified courses — all in the browser.

---

## Features

### Translation
- **Sign → Text (Normal Mode)** — Upload a video or record directly; the AI processes the full clip and returns a phrase-level interpretation with a confidence score.
- **Sign → Text (Live Mode)** — Real-time transcription from your webcam as you sign.
- **Text → Sign** — Type any sentence and generate a natural sign language video. Adjustable speed, saveable output.

### Learning
- **Structured courses** — Progress from beginner to advanced with bite-sized lessons.
- **Interactive practice** — Multiple-choice, typing exercises, video interpretation challenges, and record-yourself tasks.
- **Games** — Fun, fast-paced drills to reinforce vocabulary.
- **Achievements & streaks** — XP system, badges, and daily streaks to keep you motivated.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | React 19, Tailwind CSS v4, Radix UI |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Analytics | Vercel Analytics |
| Language | TypeScript 5.7 |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / pnpm / yarn

### Install & run

```bash
# Clone the repository
git clone https://github.com/<your-username>/handstalk.git
cd handstalk

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

```bash
npm run dev      # Development server (hot reload)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

---

## Project Structure

```
handstalk/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing page
│   ├── sign-to-text/           # Sign → Text translator
│   ├── text-to-sign/           # Text → Sign generator
│   └── learn/                  # Learning hub
│       ├── courses/
│       ├── practice/
│       ├── games/
│       └── achievements/
├── components/
│   ├── landing/                # Landing page sections
│   ├── layout/                 # Navbar, footer
│   ├── translator/             # Camera, video upload, transcript panels
│   ├── learning/               # Course, game, achievement cards
│   └── ui/                     # Shared design system (shadcn/ui based)
├── lib/
│   ├── context/                # Auth context
│   ├── data/                   # Static learning data
│   └── services/               # API service layer
└── hooks/                      # Custom React hooks
```

---

## Roadmap

- [ ] Backend AI model integration (sign recognition & video generation)
- [ ] User authentication & persistent progress
- [ ] Community / social features
- [ ] Mobile app (React Native)
- [ ] Support for more sign languages (LSE, LSF, Libras…)

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

[MIT](LICENSE)
