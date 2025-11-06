'use client';

import { motion } from 'framer-motion';
import { Cpu, Database, Image, Clock, Target, Code } from 'lucide-react';

const specs = [
  {
    icon: Cpu,
    label: 'Model Architecture',
    value: 'MobileNetV2',
    detail: '+ Custom Classifier',
    highlight: false
  },
  {
    icon: Database,
    label: 'Training Dataset',
    value: '215+',
    detail: 'labeled samples',
    highlight: true
  },
  {
    icon: Image,
    label: 'Input Processing',
    value: '224×224',
    detail: 'normalized RGB',
    highlight: true
  },
  {
    icon: Clock,
    label: 'Inference Time',
    value: '<2s',
    detail: 'per analysis',
    highlight: true
  },
  {
    icon: Target,
    label: 'Accuracy',
    value: '97%',
    detail: 'on validation set',
    highlight: true
  },
  {
    icon: Code,
    label: 'Deployment',
    value: 'Next.js',
    detail: '+ TensorFlow.js',
    highlight: false
  },
];

export default function TechnicalSpecs() {
  return (
    <section className="py-40 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 text-white">Technical Specifications</h2>
          <p className="text-xl text-gray-300">Built for production-grade performance</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {specs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                {/* Icon */}
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <spec.icon className="w-7 h-7 text-white" />
                </div>

                {/* Big Number/Value */}
                {spec.highlight ? (
                  <div className="text-6xl font-black text-white mb-2 tracking-tight">
                    {spec.value}
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-white mb-2">
                    {spec.value}
                  </div>
                )}

                {/* Detail */}
                <p className="text-sm text-gray-400 mb-3 font-medium">{spec.detail}</p>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-300">{spec.label}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
