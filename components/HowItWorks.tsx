'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Upload, Cpu, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    number: '01',
    title: 'Upload Image',
    description: 'Drop your battery cell image or click to browse. Supports JPG and PNG formats up to 10MB.',
    time: '0.5s',
    detail: 'Image is preprocessed and resized to 224×224 pixels for optimal model performance.',
  },
  {
    icon: Cpu,
    number: '02',
    title: 'AI Analysis',
    description: 'MobileNetV2 neural network processes the image through trained layers to detect bulging patterns.',
    time: '1.2s',
    detail: 'Real-time inference with sub-second latency using optimized TensorFlow.js runtime.',
  },
  {
    icon: CheckCircle,
    number: '03',
    title: 'Get Results',
    description: 'Instant safety classification with confidence score and visual indicators for quick decision-making.',
    time: '1.8s',
    detail: 'Results include bulging detection status, confidence percentage, and safety recommendations.',
  },
];

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center py-20">
      {/* Connection Line */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute left-1/2 top-full -translate-x-1/2 w-px h-40 bg-gradient-to-b from-blue-500/50 to-transparent origin-top"
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto px-4 text-center"
      >
        {/* Step Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-7xl font-bold text-white/10 mb-8"
        >
          {step.number}
        </motion.div>

        {/* Icon Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mb-12"
        >
          {/* Outer Glow Ring */}
          <motion.div
            animate={
              isInView
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-blue-500/20 blur-2xl"
          />

          {/* Icon Circle */}
          <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center">
            <step.icon className="w-14 h-14 text-blue-400" />
          </div>

          {/* Time Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -right-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm"
          >
            <span className="text-sm font-mono text-blue-300">{step.time}</span>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-5xl font-bold text-white mb-6">{step.title}</h3>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            {step.description}
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">{step.detail}</p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Section Header */}
      <div ref={headerRef} className="max-w-6xl mx-auto text-center mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-bold text-white mb-6">How It Works</h2>
          <p className="text-2xl text-gray-400">Simple, fast, accurate</p>
        </motion.div>
      </div>

      {/* Vertical Steps */}
      <div className="relative">
        {steps.map((step, index) => (
          <Step key={step.number} step={step} index={index} />
        ))}
      </div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mt-32"
      >
        <p className="text-lg text-gray-400 mb-8">
          Total processing time: <span className="text-blue-400 font-semibold">under 2 seconds</span>
        </p>
      </motion.div>
    </section>
  );
}
