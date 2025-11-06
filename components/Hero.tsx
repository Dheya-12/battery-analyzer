'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center px-4 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white font-medium">Production-Ready • 215+ Training Samples</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white"
            >
              AI-Powered Battery
              <br />
              Safety Detection
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-medium"
            >
              Identify dangerous battery defects in lithium-ion pouch cells with{' '}
              <span className="text-[#3b82f6] font-bold">97% accuracy</span> in under{' '}
              <span className="text-[#3b82f6] font-bold">2 seconds</span>
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-10"
            >
              <Link href="/analysis">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white bg-transparent hover:bg-white hover:text-black rounded-lg text-lg font-semibold text-white transition-all duration-300"
                >
                  Start Analysis →
                </motion.button>
              </Link>
            </motion.div>

            {/* Tech Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-400"
            >
              <span>MobileNetV2 Architecture</span>
              <span>•</span>
              <span>Real-Time Inference</span>
              <span>•</span>
              <span>Enterprise-Grade</span>
            </motion.div>
          </div>

          {/* Right: 3D Battery Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden lg:block"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.div
              style={{ y: imageY, rotateY: imageRotate }}
              className="relative"
            >
              {/* Glass Frame Container */}
              <div
                className="relative p-6 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 30px 80px rgba(59,130,246,0.3)) drop-shadow(0 40px 120px rgba(168,85,247,0.2))',
                }}
              >
                {/* Main Image with 3D Transform */}
                <div className="relative overflow-hidden rounded-2xl">
                  <motion.div
                    className="relative z-10"
                    style={{
                      transform: 'perspective(1000px) rotateY(-20deg) rotateX(8deg)',
                      transformStyle: 'preserve-3d',
                    }}
                    whileHover={{
                      rotateY: -25,
                      rotateX: 10,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <Image
                      src="/Screenshot 2025-11-03 223446.png"
                      alt="EV Battery Cell Analysis"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-2xl"
                      style={{
                        filter: 'drop-shadow(0 20px 60px rgba(59,130,246,0.5)) drop-shadow(0 30px 100px rgba(168,85,247,0.4)) drop-shadow(0 40px 140px rgba(0,0,0,0.3))',
                      }}
                      priority
                    />
                  </motion.div>

                  {/* White Background Gradient Fade Overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 50%, transparent 100%)',
                      mixBlendMode: 'multiply',
                      opacity: 0.3,
                    }}
                  />

                  {/* Gradient Mesh Overlay - "AI Scanning" Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 30% 40%, rgba(59,130,246,0.4), transparent 70%)',
                      mixBlendMode: 'screen',
                    }}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Edge Lighting - Holographic Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #06b6d4 100%)',
                      opacity: 0.3,
                      filter: 'blur(30px)',
                      mixBlendMode: 'screen',
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Scan Line Effect - Enhanced */}
                  <motion.div
                    className="absolute inset-x-0 h-px pointer-events-none z-20"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,1) 50%, transparent 100%)',
                      boxShadow: '0 0 20px rgba(59,130,246,0.8), 0 0 40px rgba(59,130,246,0.4)',
                      filter: 'blur(1px)',
                    }}
                    animate={{
                      y: ['0%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      repeatDelay: 0.5,
                    }}
                  />

                  {/* Analysis Indicator Dots */}
                  {[
                    { top: '30%', left: '45%', delay: 0 },
                    { top: '50%', left: '55%', delay: 0.6 },
                    { top: '65%', left: '40%', delay: 1.2 },
                  ].map((dot, i) => (
                    <motion.div
                      key={`dot-${i}`}
                      className="absolute w-3 h-3 pointer-events-none z-20"
                      style={{
                        top: dot.top,
                        left: dot.left,
                      }}
                    >
                      {/* Outer ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-blue-400"
                        animate={{
                          scale: [1, 2.5, 1],
                          opacity: [0.8, 0, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          delay: dot.delay,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                      />
                      {/* Center dot */}
                      <motion.div
                        className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-blue-400"
                        style={{
                          boxShadow: '0 0 10px rgba(59,130,246,0.8)',
                        }}
                        animate={{
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          delay: dot.delay,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </motion.div>
                  ))}

                  {/* Animated Glow Points - "Energy Indicators" */}
                  {[
                    { top: '25%', left: '20%', delay: 0 },
                    { top: '45%', left: '70%', delay: 0.5 },
                    { top: '65%', left: '35%', delay: 1 },
                    { top: '80%', left: '60%', delay: 1.5 },
                  ].map((point, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-blue-400 pointer-events-none"
                      style={{
                        top: point.top,
                        left: point.left,
                        filter: 'blur(3px)',
                        boxShadow: '0 0 10px rgba(59,130,246,0.8)',
                      }}
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        delay: point.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>

                {/* Outer Glow Ring */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl -z-10 opacity-60" />
              </div>

              {/* Floating Info Badges - Repositioned to overlap frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -top-3 -left-3 px-4 py-2 rounded-lg bg-blue-600/95 backdrop-blur-md border-2 border-blue-400/50 shadow-xl z-30"
                style={{
                  boxShadow: '0 10px 30px rgba(59,130,246,0.4)',
                }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-300"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <p className="text-xs font-bold text-white">AI Analysis Active</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute bottom-5 -right-5 px-4 py-2 rounded-lg bg-green-600/95 backdrop-blur-md border-2 border-green-400/50 shadow-xl z-30"
                style={{
                  boxShadow: '0 10px 30px rgba(34,197,94,0.4)',
                }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-300"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <p className="text-xs font-bold text-white">97% Confidence</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
}
