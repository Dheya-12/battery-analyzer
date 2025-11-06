'use client';

import { motion } from 'framer-motion';
import { Factory, FlaskConical, Package, Microscope } from 'lucide-react';

const useCases = [
  {
    icon: Factory,
    title: 'Manufacturing QC',
    description: 'Automated quality control in production lines',
    stat: '500+ cells/hour',
    featured: true,
  },
  {
    icon: FlaskConical,
    title: 'Safety Labs',
    description: 'Rapid testing in battery safety research facilities',
    stat: '99.2% detection',
    featured: false,
  },
  {
    icon: Package,
    title: 'Warehouse Inspection',
    description: 'Pre-shipment safety verification',
    stat: 'Zero false negatives',
    featured: false,
  },
  {
    icon: Microscope,
    title: 'R&D Testing',
    description: 'Battery development and failure analysis',
    stat: 'Real-time results',
    featured: false,
  },
];

export default function UseCases() {
  return (
    <section className="py-40 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 text-white">Use Cases</h2>
          <p className="text-xl text-gray-300">Trusted for critical safety applications</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative bg-white/15 backdrop-blur-md border border-white/30 rounded-xl p-8 transition-all duration-300 hover:bg-white/20 hover:border-white/40"
            >
              {/* Featured Badge */}
              {useCase.featured && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 rounded-full text-xs font-bold text-white">
                  Most Common
                </div>
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-6">
                <useCase.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 text-white">{useCase.title}</h3>

              {/* Description */}
              <p className="text-gray-300 mb-4 font-medium leading-relaxed">{useCase.description}</p>

              {/* Stat */}
              <div className="pt-4 border-t border-white/20">
                <p className="text-blue-400 font-bold text-sm">{useCase.stat}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
