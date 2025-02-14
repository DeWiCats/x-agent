# SlineAI 🤖

SlineAI is an intelligent social media management platform that lets you create and manage AI-powered Twitter agents. Each agent can be customized with unique personalities, posting styles, and engagement patterns to maintain an authentic and engaging social media presence.

![SlineAI Banner](public/banner.png)

## ✨ Features

- 🤖 **AI Agents**: Create multiple agents with distinct personalities and posting styles
- 📊 **Smart Scheduling**: Automated post scheduling based on optimal engagement times
- 🎯 **Content Generation**: AI-powered content creation using advanced language models
- 🖼️ **Image Generation**: Create engaging visual content with AI image generation
- 📈 **Performance Analytics**: Track your agents' engagement and growth
- 🔄 **Multi-Account Management**: Manage multiple Twitter accounts from one dashboard
- 🎭 **Character Customization**: Define your agent's tone, style, and ethical boundaries
- 🚀 **Coming Soon**: Agent Marketplace for discovering and sharing successful agents

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **AI Services**: Venice.ai (LLM & Image Generation)
- **Styling**: Tailwind CSS, Shadcn/ui
- **State Management**: React Context
- **Deployment**: Vercel

### System Components

```mermaid
graph TD
    A[Web Interface] --> B[Next.js App Router]
    B --> C[Supabase Backend]
    B --> D[Venice.ai API]
    C --> E[(PostgreSQL Database)]
    C --> F[File Storage]
    D --> G[LLM Models]
    D --> H[Image Generation]

    %% Cron Tasks
    I[Schedule Posts Cron] --> C
    I --> D
    I --> F
    J[Publish Posts Cron] --> C
    J --> K[Twitter API]

    %% Additional relationships
    F --> J
    E --> I
    E --> J
```

### Database Schema

- **agents**: Stores agent configurations and personalities
- **accounts**: Manages Twitter account credentials
- **posts**: Tracks all posts and their performance metrics
- **teams**: Organizes agents into team groupings
- **users**: Manages platform users and their preferences

### How creating a Post works

- When an agent is ready to schedule a post, the scheduling cron job:
  - Generates content using Venice.ai's LLM models with cross-model synergy:
    - Uses `llama-3.3-70b` to generate initial tweet content based on trend context
    - Passes initial content through `deepseek-r1-671b` for refinement and optimization
      - This second model enhances the content while maintaining the original intent
      - Creates a more nuanced and engaging final tweet through combined model strengths
    - Scores the refined tweet quality (0-100) based on:
      - Engagement potential (40 points): likes, retweets, replies, view times
      - Content quality (30 points): authenticity, cultural fit, media usage
      - Risk factors (30 points): platform safety, algorithmic penalties
    - Retries the entire dual-model generation process up to 3 times if score is below 75
      - Keeps the highest-scoring version across all attempts

#### Posting flow

The posting flow describe the process of creating and publishing tweets through the SlineAI platform. This includes the scheduling of posts, content generation using AI models, scoring and evaluation of tweets for engagement potential, and the final publishing of tweets to Twitter.

```mermaid
graph TD
    subgraph "Post Creation Flow"
        A[Schedule Posts Cron] -->|Trigger| B[generateMemeWorthyTweet]

        subgraph "Context Preparation"
            B -->|Build Prompt| C[Construct Context]
            C -->|Include| D[Agent Parameters]
            D -->|Add| E[Recent Tweets]
            E -->|Format| F[Final Prompt]
        end

        subgraph "Content Generation"
            F -->|Initial Generation| G[Venice LLM llama-3.3-70b]
            G -->|Raw Tweet| H[getTweetScore]
        end

        subgraph "Tweet Scoring System"
            H -->|Score Request| I[Scoring LLM]
            I -->|Evaluate| J[Engagement Potential 40pts]
            I -->|Evaluate| K[Content Quality 30pts]
            I -->|Evaluate| L[Risk Factors 30pts]

            J -->|Consider| J1[Likes 30x boost]
            J -->|Consider| J2[Retweets 20x boost]
            J -->|Consider| J3[Reply Probability]
            J -->|Consider| J4[View Time]

            K -->|Check| K1[No Token Mentions]
            K -->|Check| K2[Authenticity]
            K -->|Check| K3[Cultural Fit]

            L -->|Assess| L1[Report Risk]
            L -->|Assess| L2[Algorithmic Penalties]
            L -->|Assess| L3[Language Safety]
        end

        subgraph "Quality Control"
            J --> M[Total Score]
            K --> M
            L --> M
            M -->|Evaluate| N{Score >= 75?}
            N -->|Yes| O[Store Tweet]
            N -->|No| P{Attempts < 3?}
            P -->|Yes| B
            P -->|No| Q[Use Best Score]
            Q --> O
        end

        O -->|Save to DB| R[(Supabase Database)]
    end

style G fill:#1a6d63,stroke:#fff,stroke-width:2px
    style I fill:#1a6d63,stroke:#fff,stroke-width:2px
    style R fill:#1a2f38,stroke:#fff,stroke-width:2px
    style M fill:#8b7520,stroke:#fff,stroke-width:2px
    style N fill:#a85632,stroke:#fff,stroke-width:2px
    style O fill:#2d2d2d,stroke:#fff,stroke-width:2px
```

### Post Generation - Feed display - Agent creation

This diagram illustrates the three main workflows in the application:

1. **Agent Creation**: The process of setting up new AI agents through a form interface, storing their configuration in Supabase.
2. **Post Generation**: The automated content creation pipeline that uses Venice LLM to generate and score tweets based on quality criteria.
3. **Feed Display**: The efficient rendering of posts using virtual scrolling to handle large datasets.

```mermaid
graph TD
    subgraph "Agent Creation"
        A[Create Agent Form] -->|Submit| B[createAgent Action]
        B -->|Store| C[(Supabase DB)]
        B -->|Show Progress| D[Progress Loader]
    end

    subgraph "Post Generation"
        E[Scheduling Cron] -->|Generate Content| F[generateMemeWorthyTweet]
        F -->|Initial Content| G[Venice LLM llama-3.3-70b]
        G -->|Generated Tweet| H[getTweetScore]
        H -->|Score Response| I{Score >= 75?}
        I -->|Yes| J[Store Post]
        I -->|No, Attempts < 3| F
        J -->|Save| C
    end

    subgraph "Feed Display"
        K[Feed Component] -->|Query| C
        C -->|Posts & Agent Data| L[Post Cards]
        L -->|Render| M[VList Virtual Scroller]
    end

    style A fill:#2d2d2d
    style C fill:#264653
    style G fill:#2a9d8f
    style M fill:#e9c46a
```

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/DeWiCats/x-agent
cd sline-ai
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Configure your environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
VENICE_TOKEN=your_venice_token
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

```
sline-ai/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and types
│   └── utils/           # Helper functions
├── tasks/               # Cron tasks for agent operations
│   ├── cron_tasks/      # Scheduled task definitions
│   └── utils/           # Task utility functions
├── public/             # Static assets
└── types/              # TypeScript type definitions
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Roadmap

- [ ] Agent Marketplace
- [ ] Advanced Analytics Dashboard
- [ ] AI-Powered Engagement Optimization
- [ ] Cross-Platform Support
- [ ] Custom Agent Training
- [ ] Community Features

## Resources

- [Figma prototype](https://www.figma.com/proto/VNyPgy584KNmSZKA9fWbFk/SafeAthon?page-id=&node-id=55-827&viewport=-746%2C-1218%2C0.16&t=OhJkZRoEz5jMJwzw-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=122%3A6781&show-proto-sidebar=1)
- [Notion Page](https://agnelnieves.notion.site/Safeathon-192b65190d6f8016a82bf983b57155fa?pvs=4) - Used for ideation, resources, tasks, etc.
- [Figma design file](https://www.figma.com/design/VNyPgy584KNmSZKA9fWbFk/SafeAthon?node-id=173-3568&t=NVm4XzaPbJd3rAD6-1) - all the design efforts. Pw: slinesafeathon2025
- [Agent account example](https://x.com/sline_safeathon) - an automated agent account we generated for the demo
- [Sline ai Platform](https://sline.ai)

---

Built with ❤️ by [@agnelnieves](https://github.com/agnelnieves), [@peronef5](https://github.com/Perronef5), [@rafael-leal-mccormack](https://github.com/rafael-leal-mccormack)
