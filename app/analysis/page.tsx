'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, AlertTriangle, CheckCircle2, ArrowLeft, Activity, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';

interface PredictionResult {
  prediction: 'BULGING' | 'REGULAR';
  confidence: number;
  rawScore: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export default function AnalysisPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WebP)');
      return;
    }

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
        throw new Error('Analysis failed. Please try again.');
      }

      const data: PredictionResult = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
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

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'bg-red-100 text-red-700 border-red-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPredictionColor = (prediction: string) => {
    return prediction === 'BULGING' ? 'text-red-600' : 'text-green-600';
  };

  const getStatusColor = (prediction: string) => {
    return prediction === 'BULGING' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Battery Cell Analyzer</h1>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload Battery Image</h2>
              <p className="text-gray-600 mb-6">
                Upload a clear image of your lithium-ion pouch cell for AI-powered analysis
              </p>

              <AnimatePresence mode="wait">
                {!previewUrl ? (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => fileInputRef.current?.click()}
                      className={`
                        relative border-2 border-dashed rounded-xl p-12
                        transition-all duration-200 cursor-pointer
                        ${isDragging
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <div className={`p-4 rounded-full ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}`}>
                          <Upload className={`w-8 h-8 ${isDragging ? 'text-blue-600' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-900 mb-1">
                            {isDragging ? 'Drop image here' : 'Drop image here or click to browse'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Supports JPG, PNG, WebP (Max 10MB)
                          </p>
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                      <img
                        src={previewUrl}
                        alt="Battery cell preview"
                        className="w-full h-auto"
                      />
                      <button
                        onClick={handleReset}
                        className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 hover:bg-white shadow-sm border border-gray-200 transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                      <span className="truncate flex-1">{selectedImage?.name}</span>
                      <span className="ml-2">
                        {selectedImage && (selectedImage.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>

                    {!result && !isLoading && (
                      <button
                        onClick={handleAnalyze}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors shadow-sm"
                      >
                        Run Analysis
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Analysis Error</p>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Real-Time Processing</p>
                    <p className="text-xs text-gray-600">Results in under 2 seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">97% Accuracy</p>
                    <p className="text-xs text-gray-600">Trained on 215+ samples</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Secure Processing</p>
                    <p className="text-xs text-gray-600">Images processed locally</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results Section */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Analysis Results</h2>

              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                      <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                    </div>
                    <p className="mt-6 text-lg font-medium text-gray-900">Processing Image</p>
                    <p className="text-sm text-gray-600 mt-2">Running AI analysis...</p>
                    <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden mt-6">
                      <motion.div
                        className="h-full bg-blue-600 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Status Card */}
                    <div className={`border-2 rounded-xl p-6 ${getStatusColor(result.prediction)}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {result.prediction === 'BULGING' ? (
                            <div className="p-3 bg-red-100 rounded-full">
                              <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                          ) : (
                            <div className="p-3 bg-green-100 rounded-full">
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-600">Diagnosis</p>
                            <p className={`text-2xl font-bold ${getPredictionColor(result.prediction)}`}>
                              {result.prediction === 'BULGING' ? 'Bulging Detected' : 'Cell Normal'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        {result.prediction === 'BULGING'
                          ? 'Warning: This battery cell shows signs of bulging. Handle with extreme caution and dispose of properly.'
                          : 'This battery cell appears to be in normal operating condition with no visible defects.'}
                      </p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Confidence */}
                      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <p className="text-sm font-medium text-gray-600 mb-2">Confidence</p>
                        <p className="text-3xl font-bold text-gray-900">{result.confidence}%</p>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.confidence}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-blue-600 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Risk Level */}
                      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <p className="text-sm font-medium text-gray-600 mb-2">Risk Level</p>
                        <span className={`inline-block px-4 py-2 rounded-lg text-base font-bold border ${getRiskBadgeColor(result.risk)}`}>
                          {result.risk}
                        </span>
                      </div>
                    </div>

                    {/* Raw Score */}
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Model Score</span>
                        <span className="text-lg font-mono font-semibold text-gray-900">{result.rawScore}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Raw prediction value from neural network (0-1 scale)
                      </p>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={handleReset}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-4 rounded-xl transition-colors border border-gray-300"
                    >
                      Analyze Another Cell
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="p-6 bg-gray-100 rounded-full mb-6">
                      <Activity className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No Analysis Yet
                    </h3>
                    <p className="text-gray-600 max-w-sm">
                      Upload an image of a battery cell to begin the AI-powered diagnostic process
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
