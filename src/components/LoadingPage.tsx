import React, { useEffect, useRef, useState } from "react";
import { animate, stagger, createTimeline } from "animejs";
import "./LoadingPage.css";

interface LoadingPageProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  onLoadingComplete,
  duration = 4000,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cyberElementsRef = useRef<HTMLDivElement>(null);

  const loadingMessages = [
    "Initializing security protocols...",
    "Loading cybersecurity toolkit...",
    "Establishing secure connection...",
    "Preparing defense systems...",
    "Welcome to the matrix...",
  ];

  useEffect(() => {
    const startAnimations = () => {
      // Animate title entrance
      if (titleRef.current) {
        animate(titleRef.current, {
          translateY: [100, 0],
          opacity: [0, 1],
          duration: 1000,
          ease: "outBack",
          delay: 300,
        });
      }

      // Animate subtitle entrance
      if (subtitleRef.current) {
        animate(subtitleRef.current, {
          translateY: [50, 0],
          opacity: [0, 1],
          duration: 800,
          ease: "outQuad",
          delay: 600,
        });
      }

      // Create floating cyber elements
      createCyberElements();

      // Animate progress bar
      animateProgress();

      // Cycle through status messages
      animateStatusMessages();
    };

    const createCyberElements = () => {
      if (!cyberElementsRef.current) return;

      const container = cyberElementsRef.current;
      const elements = ["square", "circle", "triangle"];

      for (let i = 0; i < 15; i++) {
        const element = document.createElement("div");
        const type = elements[Math.floor(Math.random() * elements.length)];
        element.className = `cyber-${type}`;

        // Random position
        element.style.left = Math.random() * 100 + "%";
        element.style.top = Math.random() * 100 + "%";

        container.appendChild(element);

        // Animate element
        animate(element, {
          opacity: [0, 0.7, 0],
          scale: [0.5, 1.2, 0.8],
          rotate: Math.random() * 360,
          duration: 3000 + Math.random() * 2000,
          delay: Math.random() * 2000,
          loop: true,
          direction: "alternate",
          ease: "inOutQuad",
        });
      }
    };

    const animateProgress = () => {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += Math.random() * 15 + 5;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(progressInterval);

          // Completion animation
          if (progressRef.current) {
            animate(progressRef.current, {
              scale: [1, 1.05, 1],
              duration: 500,
              ease: "inOutQuad",
              onComplete: () => {
                setTimeout(() => {
                  animateExit();
                }, 500);
              },
            });
          }
        }
        setProgress(currentProgress);
      }, 200);
    };

    const animateStatusMessages = () => {
      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        setCurrentMessage(messageIndex);
        messageIndex++;
        if (messageIndex >= loadingMessages.length) {
          clearInterval(messageInterval);
        }
      }, duration / loadingMessages.length);
    };

    const animateExit = () => {
      // Exit animation
      const tl = createTimeline();
      tl.add(".loading-container > *:not(.cyber-elements)", {
        opacity: [1, 0],
        translateY: [0, -50],
        duration: 600,
        ease: "inBack",
        delay: stagger(100),
      }).add(
        ".loading-container",
        {
          opacity: [1, 0],
          duration: 500,
          ease: "inQuad",
          onComplete: () => {
            if (onLoadingComplete) {
              onLoadingComplete();
            }
          },
        },
        "-=300"
      );
    };

    // Start animations after component mounts
    const timer = setTimeout(startAnimations, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onLoadingComplete]);

  return (
    <div className="loading-container">
      <div className="cyber-grid"></div>
      <div className="cyber-elements" ref={cyberElementsRef}></div>

      <h1
        ref={titleRef}
        className="main-title glitch-text"
        data-text="SEYI OPEOLUWA"
      >
        SEYI OPEOLUWA
      </h1>

      <p ref={subtitleRef} className="subtitle">
        &gt; CYBERSECURITY_SPECIALIST.init()
      </p>

      <div className="loading-progress" ref={progressRef}>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-text">{Math.round(progress)}%</div>
      </div>

      <div className="status-messages">
        {loadingMessages.map((message, index) => (
          <div
            key={index}
            className={`status-message ${index === currentMessage ? "active" : ""}`}
            style={{
              position: "absolute",
              opacity: index === currentMessage ? 1 : 0,
            }}
          >
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingPage;
