'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, AlertTriangle, CheckCircle2, Loader2, ZapOff, Zap } from 'lucide-react';

interface PredictionResult {
  prediction: 'BULGING' | 'REGULAR';
  confidence: number;
  rawScore: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export default function BatteryAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Clean up previous preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  }, [previewUrl]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data: PredictionResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'from-red-500 to-red-600';
      case 'MEDIUM': return 'from-yellow-500 to-orange-500';
      case 'LOW': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPredictionColor = (prediction: string) => {
    return prediction === 'BULGING'
      ? 'from-red-500 via-red-600 to-pink-600'
      : 'from-green-500 via-emerald-600 to-teal-600';
  };

  return (
    <section id="battery-analyzer" className="relative min-h-screen flex items-center px-4 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white font-medium">AI-Powered Analysis</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Analyze Your Battery Cell
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Upload an image of your lithium-ion pouch cell for instant AI analysis
          </p>
        </motion.div>

        {/* Main Analyzer Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
          style={{
            filter: 'drop-shadow(0 30px 80px rgba(59,130,246,0.3)) drop-shadow(0 40px 120px rgba(168,85,247,0.2))',
          }}
        >
          {/* Background Glow */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 blur-3xl -z-10" />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side: Upload Area */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {!previewUrl ? (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`
                        relative border-2 border-dashed rounded-2xl p-12
                        transition-all duration-300 cursor-pointer
                        ${isDragging
                          ? 'border-blue-400 bg-blue-500/10 scale-105'
                          : 'border-white/20 hover:border-blue-400/50 hover:bg-white/5'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <motion.div
                          animate={isDragging ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}
                        >
                          <Upload className="w-16 h-16 text-blue-400" />
                        </motion.div>
                        <div>
                          <p className="text-xl font-semibold text-white mb-2">
                            Drop your image here
                          </p>
                          <p className="text-gray-400">
                            or click to browse files
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          Supports: JPG, PNG, WebP
                        </div>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-white/10">
                      <img
                        src={previewUrl}
                        alt="Battery cell preview"
                        className="w-full h-auto"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleReset}
                        className="absolute top-4 right-4 p-2 rounded-full bg-red-500/90 backdrop-blur-sm hover:bg-red-600 transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>

                    {!result && !isLoading && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAnalyze}
                        className="w-full mt-6 px-8 py-4 border-2 border-white bg-transparent hover:bg-white hover:text-black rounded-lg text-lg font-semibold text-white transition-all duration-300"
                      >
                        Analyze Battery Cell →
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-200 text-sm">{error}</p>
                </motion.div>
              )}
            </div>

            {/* Right Side: Results */}
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-6 py-12"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Loader2 className="w-16 h-16 text-blue-400" />
                    </motion.div>
                    <div className="text-center">
                      <p className="text-xl font-semibold text-white mb-2">
                        Analyzing Battery Cell
                      </p>
                      <p className="text-gray-400">
                        Processing with AI model...
                      </p>
                    </div>
                    <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="w-full space-y-6"
                  >
                    {/* Prediction Result */}
                    <div className={`p-8 rounded-2xl bg-gradient-to-br ${getPredictionColor(result.prediction)} relative overflow-hidden`}>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          {result.prediction === 'BULGING' ? (
                            <ZapOff className="w-8 h-8 text-white" />
                          ) : (
                            <CheckCircle2 className="w-8 h-8 text-white" />
                          )}
                          <h3 className="text-2xl font-bold text-white">
                            {result.prediction === 'BULGING' ? 'Bulging Detected' : 'Cell Normal'}
                          </h3>
                        </div>
                        <p className="text-white/90 text-lg">
                          {result.prediction === 'BULGING'
                            ? 'This battery cell shows signs of bulging and should be handled with caution.'
                            : 'This battery cell appears to be in normal condition.'
                          }
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                    </div>

                    {/* Confidence Score */}
                    <div className="glass rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-300 font-medium">Confidence</span>
                        <span className="text-2xl font-bold text-white">{result.confidence}%</span>
                      </div>
                      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`h-full bg-gradient-to-r ${getPredictionColor(result.prediction)}`}
                        />
                      </div>
                    </div>

                    {/* Risk Level */}
                    <div className="glass rounded-2xl p-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">Risk Level</span>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: 'spring' }}
                          className={`px-4 py-2 rounded-lg bg-gradient-to-r ${getRiskColor(result.risk)} text-white font-bold text-lg`}
                        >
                          {result.risk}
                        </motion.span>
                      </div>
                    </div>

                    {/* Raw Score (for debugging) */}
                    <div className="text-center text-sm text-gray-500">
                      Raw score: {result.rawScore}
                    </div>

                    {/* Analyze Another Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReset}
                      className="w-full px-8 py-4 border-2 border-white/30 bg-transparent hover:bg-white hover:text-black rounded-lg text-lg font-semibold text-white transition-all duration-300"
                    >
                      Analyze Another Cell
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 px-6"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.7, 0.5]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Zap className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-400 mb-3">
                      Ready to Analyze
                    </h3>
                    <p className="text-gray-500">
                      Upload an image to get started with AI-powered battery cell analysis
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {[
            { icon: Zap, title: 'Instant Results', desc: 'Get predictions in under 2 seconds' },
            { icon: CheckCircle2, title: '97% Accurate', desc: 'Trained on 215+ samples' },
            { icon: AlertTriangle, title: 'Safety First', desc: 'Identify hazardous conditions' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-xl p-6 text-center"
            >
              <item.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
}
