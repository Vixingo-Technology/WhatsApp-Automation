import React, { useRef, useMemo, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    AnimatePresence,
    type MotionValue,
} from "framer-motion";
import { cn } from "../utils/cn";
import { seededRange } from "../utils/random";

const PROBLEMS = [
    "Slow Responses",
    "Human Errors",
    "Lost Leads",
    "High Costs",
    "Zero Automation",
    "No Analytics",
    "Manual Booking",
    "Angry Customers",
    "Missed Revenue",
    "Hard to Scale",
    "Inefficient",
    "No Follow-ups",
    "Wasted Spend",
    "Messy Data",
    "Manual Entry",
    "Support Fatigue",
];

interface ProblemBoxProps {
    word: string;
    index: number;
    scrollYProgress: MotionValue<number>;
}

const ProblemBox = ({ word, index, scrollYProgress }: ProblemBoxProps) => {
    // Use a circular distribution for a tunnel effect
    const { angle, distance, rotateZ } = useMemo(() => {
        const angle = (index / PROBLEMS.length) * Math.PI * 2;
        const distance = seededRange(index, 25, 50); // How far from center it moves
        return {
            angle,
            distance,
            rotateZ: seededRange(index + 100, -10, 10), // Slight tilt for variety
        };
    }, [index]);

    // Tunnel animation logic:
    // Starts at center (0,0, -1000), moves towards camera (0,0, 500) and outwards
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.1, 0.5, 0.8],
        [0, 1, 1, 0],
    );

    // X and Y move from 0 to their final distance based on angle
    const xPos = Math.cos(angle) * distance;
    const yPos = Math.sin(angle) * distance;

    const translateX = useTransform(
        scrollYProgress,
        [0.1, 0.7],
        ["0vw", `${xPos}vw`],
    );
    const translateY = useTransform(
        scrollYProgress,
        [0.1, 0.7],
        ["0vh", `${yPos}vh`],
    );

    // Z moves from deep in the tunnel towards the user
    const translateZ = useTransform(scrollYProgress, [0, 0.8], [-1500, 1000]);

    const scale = useTransform(
        scrollYProgress,
        [0, 0.2, 0.6, 0.8],
        [0.2, 1, 1.2, 0.5],
    );

    return (
        <motion.div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                translateX: "-50%",
                translateY: "-50%",
                x: translateX,
                y: translateY,
                z: translateZ,
                rotateZ,
                opacity,
                scale,
            }}
            className="px-4 py-2 md:px-6 md:py-3 rounded-xl glass border border-red-500/20 text-red-400 font-bold whitespace-nowrap shadow-2xl pointer-events-none text-sm md:text-base backdrop-blur-md"
        >
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                {word}
            </div>
        </motion.div>
    );
};

export function ProblemSection({
    containerRef,
}: {
    containerRef?: React.RefObject<HTMLDivElement | null>;
}) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        container: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 30,
        restDelta: 0.001,
    });

    // Split both texts into two parts for styling
    const t1a = "Why Your WhatsApp Ads ";
    const t1b = "Is Losing You Money";
    const text1 = t1a + t1b;

    const t2a = "Managing business WhatsApp manually is a nightmare. ";
    const t2b = "Vixingo AI will help you scale your business";
    const text2 = t2a + t2b;

    // Total character counts
    const stage = useTransform(smoothProgress, (v) => (v < 0.75 ? 1 : 2));
    const charIndex = useTransform(
        smoothProgress,
        [0.65, 0.75, 1.0],
        [text1.length, 0, text2.length],
    );

    const textPart1 = useTransform(charIndex, (val) => {
        const s = stage.get();
        const v = Math.round(val);
        if (s === 1) return text1.substring(0, Math.min(v, t1a.length));
        return text2.substring(0, Math.min(v, t2a.length));
    });

    const textPart2 = useTransform(charIndex, (val) => {
        const s = stage.get();
        const v = Math.round(val);
        if (s === 1) {
            if (v <= t1a.length) return "";
            return text1.substring(t1a.length, v);
        } else {
            if (v <= t2a.length) return "";
            return text2.substring(t2a.length, v);
        }
    });

    const cursorColor = useTransform(smoothProgress, (v) =>
        v > 0.75 ? "#25D366" : "#EF4444",
    );
    const part2Style = useTransform(smoothProgress, (v) => {
        if (v < 0.75)
            return "text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]"; // Glowing red
        return "text-whatsapp-green"; // WhatsApp Green
    });

    return (
        <section
            ref={sectionRef}
            id="problem"
            className="relative h-[600vh] bg-transparent"
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-2000 bg-transparent">
                {/* Removed Background Ambient Glow */}

                {/* 3D Scattering Boxes */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {PROBLEMS.map((word, index) => (
                        <ProblemBox
                            key={index}
                            word={word}
                            index={index}
                            scrollYProgress={smoothProgress}
                        />
                    ))}
                </div>

                {/* Dynamic Typewriter Headline */}
                <div className="relative z-20 text-center px-6 max-w-7xl">
                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter">
                        <motion.span
                            className="text-slate-800"
                            children={textPart1}
                        />
                        <motion.span
                            className={cn(
                                "transition-all duration-300",
                                "text-whatsapp-green",
                            )}
                            style={{
                                color: useTransform(
                                    smoothProgress,
                                    [0, 0.74, 0.75, 1],
                                    [
                                        "#EF4444",
                                        "#EF4444",
                                        "#25D366",
                                        "#25D366",
                                    ],
                                ),
                                textShadow: useTransform(
                                    smoothProgress,
                                    (v: number) =>
                                        v < 0.75
                                            ? "0 0 0px rgba(239,68,68,0.8), 0 0 0px rgba(239,68,68,0.4)"
                                            : "none",
                                ),
                            }}
                        >
                            <motion.span children={textPart2} />
                        </motion.span>

                        {/* Cursor */}
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="inline-block w-[4px] h-[0.8em] align-middle ml-2"
                            style={{ backgroundColor: cursorColor }}
                        />
                    </h2>
                </div>

                {/* Section Indicators */}
                <motion.div
                    style={{
                        opacity: useTransform(
                            smoothProgress,
                            [0, 0.05],
                            [1, 0],
                        ),
                    }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.4em]">
                        Scroll Down
                    </span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-red-500 to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
