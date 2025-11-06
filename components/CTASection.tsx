'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-white/30 rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl -z-10" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to analyze your first battery cell?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Get instant safety classification with our AI-powered detection system
            </p>

            <Link href="/analyze">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-xl text-lg font-bold transition-all duration-300 hover:bg-gray-100 shadow-2xl shadow-blue-500/20"
              >
                Start Analyzing
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>

            <p className="mt-6 text-sm text-gray-400">
              No signup required • Free to use • Results in under 2 seconds
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
