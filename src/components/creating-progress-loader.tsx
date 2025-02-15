import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
// import PostCard from "./post-card";
// import { ImageStyle } from "@/lib/types";

const iconplaceholder = (
  <svg
    width="141"
    height="140"
    viewBox="0 0 141 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.499023 22C0.499023 9.84974 10.3488 0 22.499 0H118.499C130.649 0 140.499 9.84974 140.499 22V118C140.499 130.15 130.649 140 118.499 140H22.499C10.3488 140 0.499023 130.15 0.499023 118V22Z"
      fill="url(#paint0_linear_458_9088)"
      fillOpacity="0.18"
    />
    <path
      d="M22.499 0.5H118.499C130.373 0.5 139.999 10.1259 139.999 22V118C139.999 129.874 130.373 139.5 118.499 139.5H22.499C10.6249 139.5 0.999023 129.874 0.999023 118V22C0.999023 10.1259 10.6249 0.5 22.499 0.5Z"
      stroke="white"
      strokeOpacity="0.08"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M49.3496 51.0003C48.1404 51.0003 46.7484 52.1374 46.7484 54.068V72.5414L55.1032 61.3636C55.1939 61.2422 55.2933 61.1275 55.4005 61.0203C58.4921 57.9287 63.5047 57.9287 66.5963 61.0203C66.6621 61.0861 66.7249 61.1548 66.7847 61.2261L78.0928 74.7261L81.5255 71.312L81.5292 71.3083C84.6211 68.2203 89.6309 68.2216 92.7213 71.312C92.7975 71.3882 92.8698 71.4683 92.9379 71.552L94.2484 73.1617V54.068C94.2484 52.1374 92.8564 51.0003 91.6472 51.0003H49.3496ZM100.582 54.068C100.582 49.1124 96.809 44.667 91.6472 44.667H49.3496C44.1877 44.667 40.415 49.1124 40.415 54.068V89.0003C40.415 92.4981 43.2506 95.3337 46.7484 95.3337H94.2484C97.7462 95.3337 100.582 92.4981 100.582 89.0003V54.068ZM94.2484 83.1934L88.1558 75.7094C87.5337 75.1733 86.5938 75.2003 86.0038 75.7903L85.9977 75.7964L80.1133 81.6491C79.4845 82.2744 78.6223 82.6075 77.7364 82.5672C76.8505 82.527 76.0221 82.1171 75.4526 81.4372L62.0431 65.4284C61.463 64.9181 60.5988 64.9042 60.0032 65.3866L46.7484 83.1201V85.9326C46.7484 87.8633 48.1404 89.0003 49.3496 89.0003H91.6472C92.8564 89.0003 94.2484 87.8633 94.2484 85.9326V83.1934Z"
      fill="white"
      fillOpacity="0.48"
    />
    <path
      d="M79.9984 65.2503C82.6204 65.2503 84.7484 63.1271 84.7484 60.5003C84.7484 57.8783 82.6204 55.7503 79.9984 55.7503C77.3764 55.7503 75.2484 57.8783 75.2484 60.5003C75.2484 63.1271 77.3764 65.2503 79.9984 65.2503Z"
      fill="white"
      fillOpacity="0.48"
    />
    <defs>
      <linearGradient
        id="paint0_linear_458_9088"
        x1="70.499"
        y1="0"
        x2="70.499"
        y2="140"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0.18" />
      </linearGradient>
    </defs>
  </svg>
);

const steps = [
  {
    title: "Creating X account",
    description:
      "Hold on tight. We're setting up an X account for your agent to interact under.",
    icon: (
      <svg
        width="141"
        height="140"
        viewBox="0 0 141 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.499023 22C0.499023 9.84974 10.3488 0 22.499 0H118.499C130.649 0 140.499 9.84974 140.499 22V118C140.499 130.15 130.649 140 118.499 140H22.499C10.3488 140 0.499023 130.15 0.499023 118V22Z"
          fill="url(#paint0_linear_458_9088)"
          fillOpacity="0.18"
        />
        <path
          d="M22.499 0.5H118.499C130.373 0.5 139.999 10.1259 139.999 22V118C139.999 129.874 130.373 139.5 118.499 139.5H22.499C10.6249 139.5 0.999023 129.874 0.999023 118V22C0.999023 10.1259 10.6249 0.5 22.499 0.5Z"
          stroke="white"
          strokeOpacity="0.08"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M49.3496 51.0003C48.1404 51.0003 46.7484 52.1374 46.7484 54.068V72.5414L55.1032 61.3636C55.1939 61.2422 55.2933 61.1275 55.4005 61.0203C58.4921 57.9287 63.5047 57.9287 66.5963 61.0203C66.6621 61.0861 66.7249 61.1548 66.7847 61.2261L78.0928 74.7261L81.5255 71.312L81.5292 71.3083C84.6211 68.2203 89.6309 68.2216 92.7213 71.312C92.7975 71.3882 92.8698 71.4683 92.9379 71.552L94.2484 73.1617V54.068C94.2484 52.1374 92.8564 51.0003 91.6472 51.0003H49.3496ZM100.582 54.068C100.582 49.1124 96.809 44.667 91.6472 44.667H49.3496C44.1877 44.667 40.415 49.1124 40.415 54.068V89.0003C40.415 92.4981 43.2506 95.3337 46.7484 95.3337H94.2484C97.7462 95.3337 100.582 92.4981 100.582 89.0003V54.068ZM94.2484 83.1934L88.1558 75.7094C87.5337 75.1733 86.5938 75.2003 86.0038 75.7903L85.9977 75.7964L80.1133 81.6491C79.4845 82.2744 78.6223 82.6075 77.7364 82.5672C76.8505 82.527 76.0221 82.1171 75.4526 81.4372L62.0431 65.4284C61.463 64.9181 60.5988 64.9042 60.0032 65.3866L46.7484 83.1201V85.9326C46.7484 87.8633 48.1404 89.0003 49.3496 89.0003H91.6472C92.8564 89.0003 94.2484 87.8633 94.2484 85.9326V83.1934Z"
          fill="white"
          fillOpacity="0.48"
        />
        <path
          d="M79.9984 65.2503C82.6204 65.2503 84.7484 63.1271 84.7484 60.5003C84.7484 57.8783 82.6204 55.7503 79.9984 55.7503C77.3764 55.7503 75.2484 57.8783 75.2484 60.5003C75.2484 63.1271 77.3764 65.2503 79.9984 65.2503Z"
          fill="white"
          fillOpacity="0.48"
        />
        <defs>
          <linearGradient
            id="paint0_linear_458_9088"
            x1="70.499"
            y1="0"
            x2="70.499"
            y2="140"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.18" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Creating the agent",
    description:
      "Agents gotta start somewhere, consider this, the birthdate of your agent.",
    icon: iconplaceholder,
  },
  {
    title: "Training your agent",
    description:
      "Agents need to learn what to do, why and when. We're showing the way.",
    icon: iconplaceholder,
  },
  {
    title: "Ready to go",
    description:
      "Your agent is ready to go. It has scheduled a tweet already, looking for it.",
    icon: iconplaceholder,
  },
  // {
  //   title: "Ready",
  //   description: "tweet scheduled",
  //   icon: (
  //     <div className="border border-border rounded-2xl p-4 bg-sline-base-surface-1">
  //       <PostCard
  //         post={{
  //           id: 1,
  //           content: "Ausar silencing doubters one dunk at a time 🤫",
  //           status: "scheduled",
  //           agent: 1,
  //           media_url: null,
  //           score: null,
  //           timestamp: 1718371200,
  //           x_url: null,
  //         }}
  //         agent={{
  //           id: 1,
  //           avatar: "",
  //           account_id: "1",
  //           context: "",
  //           cookies: null,
  //           created_at: "2024-06-13T12:00:00Z",
  //           description: "",
  //           engagement_hooks: "",
  //           engagement_rules: "",
  //           image_style: ImageStyle.Anime,
  //           last_posted_date: null,
  //           team: 1,
  //           time_to_post: null,
  //           ethical_boundaries: "",
  //           fact_check_threshold: 0,
  //           model: "llama-3.3-70b",
  //           public: false,
  //           stance: 1,
  //           tags: [],
  //           tone: 1,
  //           username: "test",
  //           style: 1,
  //           multi_model: false,
  //           language: "english",
  //         }}
  //       />
  //     </div>
  //   ),
  // },
];

export default function CreatingProgressLoader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Dialog defaultOpen>
      <DialogContent className="bg-transparent border-none shadow-none text-sline-text-dark-primary">
        <DialogHeader className="sr-only">
          <DialogTitle className="text-center">Creating Agent</DialogTitle>
          <DialogDescription className="text-center text-sline-text-dark-secondary">
            This may take a few minutes
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-center max-w-[420px]">
          <div className="flex flex-col gap-2 justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {steps[step].icon}
              </motion.div>

              <motion.div
                key={`text-${step}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <p className="text-sline-text-dark-primary text-2xl font-medium">
                  {steps[step].title}
                </p>
                <p className="text-sline-text-dark-secondary text-base">
                  {steps[step].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
