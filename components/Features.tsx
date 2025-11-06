'use client';

import { motion } from 'framer-motion';
import { Zap, Target, Brain } from 'lucide-react';

const features = [
  {
    icon: Zap,
    number: '<2s',
    title: 'Real-Time Detection',
    description: 'Results in under 2 seconds with optimized inference pipeline',
    isHighlight: false,
  },
  {
    icon: Target,
    number: '97%',
    title: 'High Accuracy',
    description: 'Classification accuracy on validation dataset with automated analysis',
    isHighlight: true,
  },
  {
    icon: Brain,
    number: 'MobileNetV2',
    title: 'Deep Learning',
    description: 'Transfer learning architecture with custom classifier layers',
    isHighlight: false,
  },
];

export default function Features() {
  return (
    <section className="py-40 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 items-end"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 transition-all duration-300 hover:bg-white/15 hover:border-white/30 ${
                feature.isHighlight ? 'md:pb-12' : ''
              }`}
            >
              {/* Big Number */}
              <div className="text-5xl font-black text-white mb-4 tracking-tight">
                {feature.number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed font-medium">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
