'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative min-h-[60vh] sm:min-h-[50vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Subtle darker overlay for contrast */}
      <div className="absolute inset-0 bg-black/10 -z-10" />

      {/* Social Icons - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 right-8 flex items-center gap-4"
      >
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </motion.div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto text-center">
        {/* 3D Text - Main Attraction */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
          className="mb-12"
        >
          <h2
            className="text-3d animate-glow-pulse text-[2.5rem] sm:text-[3.5rem] lg:text-[5rem] font-black tracking-tight leading-none select-none"
            style={{
              fontWeight: 900,
              letterSpacing: '-0.02em',
            }}
          >
            Battery Safety
            <br />
            Analyzer
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <p className="text-lg text-gray-400">
            Built by{' '}
            <span className="text-gray-300 font-semibold">Dheya Algalham</span>
          </p>
        </motion.div>

        {/* Tech Stack Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500"
        >
          <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            MobileNetV2
          </span>
          <span className="text-gray-600">•</span>
          <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            TensorFlow
          </span>
          <span className="text-gray-600">•</span>
          <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            Next.js
          </span>
          <span className="text-gray-600">•</span>
          <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            TypeScript
          </span>
          <span className="text-gray-600">•</span>
          <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            Tailwind CSS
          </span>
        </motion.div>
      </div>

      {/* Decorative Glow Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>
    </footer>
  );
}
