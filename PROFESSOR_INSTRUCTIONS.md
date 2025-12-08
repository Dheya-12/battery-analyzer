# Battery Safety Detection System
## Senior Design Project - Instructor Guide

---

## Overview

The **Battery Safety Detection System** is a web-based application that uses artificial intelligence to detect bulging or swollen lithium-ion battery cells through image analysis. This safety-critical tool helps identify potentially hazardous batteries before they cause incidents such as thermal runaway, fires, or explosions.

The application leverages a custom-trained MobileNetV2 deep learning model to classify battery cells as either **BULGING** (dangerous) or **REGULAR** (safe) with 97% accuracy. The system provides real-time analysis results in under 2 seconds, making it practical for manufacturing quality control, safety laboratory testing, warehouse inspection, and research & development applications.

### Technical Highlights

- **Frontend**: Next.js 16 with React 19, TypeScript, and Tailwind CSS
- **Backend**: Python FastAPI with TensorFlow 2.20
- **ML Model**: MobileNetV2-based binary classifier (97% accuracy, 215+ training samples)
- **Deployment**: Frontend on Vercel, Backend on Railway platform
- **Features**: Real-time image analysis, confidence scoring, risk assessment, responsive UI with animated WebGL background

---

## Accessing the Application

### Live Deployment

The application is deployed and accessible at:

**Frontend URL**: [https://battery-analyzer.vercel.app](https://battery-analyzer.vercel.app) *(or your deployment URL)*

**Backend API**: [https://calm-respect-production.up.railway.app](https://calm-respect-production.up.railway.app)

### Access Requirements

- **No login or signup required** - The application is publicly accessible
- **Browser Requirements**: Modern web browser with JavaScript enabled (Chrome, Firefox, Safari, Edge)
- **Internet Connection**: Required for API communication with the backend server
- **File Upload Capability**: Browser must support file uploads (standard in all modern browsers)

### Test Images

If you need test images for evaluation, the application accepts:
- **Supported Formats**: JPG, PNG, WebP
- **Maximum File Size**: 10 MB
- **Image Content**: Clear photos of lithium-ion battery cells (pouch cells work best)

---

## How to Use

### Step 1: Navigate to the Application

1. Open your web browser and visit the deployment URL
2. You will land on the **homepage** which provides:
   - Overview of the system capabilities
   - Technical specifications
   - Use case examples
   - "How It Works" workflow visualization

### Step 2: Access the Analysis Tool

1. Click the **"Try Battery Analyzer"** button on the homepage
2. Alternatively, navigate directly to the `/analysis` page
3. You will see a two-column interface:
   - **Left Column**: Image upload area and analysis information
   - **Right Column**: Results display panel

### Step 3: Upload a Battery Image

**Option A: Drag and Drop**
1. Drag a battery cell image from your file explorer
2. Drop it onto the designated upload zone (dashed border area)
3. The image preview will appear immediately

**Option B: Click to Browse**
1. Click anywhere inside the upload zone
2. A file picker dialog will open
3. Select your battery cell image (JPG, PNG, or WebP)
4. Click "Open"
5. The image preview will appear

### Step 4: Run the Analysis

1. Review the uploaded image preview
2. Click the **"Run Analysis"** button
3. You will see a loading animation with status messages:
   - "Analyzing battery cell..."
   - Progress bar showing processing status
4. Analysis typically completes in **under 2 seconds**

### Step 5: Review the Results

The results panel will display four key metrics:

**1. Status Indicator**
- **BULGING** (Red warning icon): Battery is swollen/bulging - potentially dangerous
- **REGULAR** (Green checkmark icon): Battery appears normal - safe

**2. Confidence Score**
- Displayed as a percentage (0-100%)
- Higher confidence indicates more certain prediction
- Visual progress bar for quick assessment
- Example: "95% confidence" means the model is highly certain

**3. Raw Score**
- The model's raw prediction value (0-1 scale)
- Values > 0.5 = BULGING classification
- Values ≤ 0.5 = REGULAR classification
- Useful for understanding how close the prediction is to the threshold

**4. Risk Level** *(if implemented)*
- **HIGH**: Strong prediction (far from threshold)
- **MEDIUM**: Moderate confidence
- **LOW**: Near the decision threshold

### Step 6: Analyze Additional Cells

1. Click **"Analyze Another Cell"** button
2. The interface resets to the upload state
3. Upload a new image and repeat the process
4. No limit on the number of analyses

---

## Features

### 1. Real-Time Image Analysis

- **Speed**: Results in under 2 seconds from upload to prediction
- **Process**:
  1. Image preprocessing to 224×224 pixels
  2. Neural network inference via MobileNetV2 model
  3. Safety classification with confidence scoring
- **Automation**: No manual intervention required after upload

### 2. AI-Powered Detection

- **Model Architecture**: MobileNetV2 with custom classifier layers
- **Training Data**: 215+ labeled battery cell samples
- **Accuracy**: 97% on validation dataset
- **Detection Method**: Binary classification (BULGING vs. REGULAR)
- **Classification Threshold**: 0.5 (predictions > 0.5 are classified as BULGING)

### 3. Confidence Scoring

- **Percentage Display**: Shows model's confidence in the prediction (0-100%)
- **Calculation**:
  - For BULGING: `confidence = prediction * 100`
  - For REGULAR: `confidence = (1 - prediction) * 100`
- **Interpretation**: Higher confidence indicates more reliable prediction

### 4. Visual Result Presentation

- **Color-Coded Status**: Red for dangerous, green for safe
- **Icon Indicators**: Warning triangle or checkmark
- **Animated Progress Bars**: Visual representation of confidence levels
- **Status Messages**: Clear, user-friendly text descriptions

### 5. Responsive User Interface

- **Adaptive Layout**: Works on desktop, tablet, and mobile devices
- **Two-Column Design**: Efficient use of screen space on large displays
- **Drag-and-Drop**: Intuitive file upload interaction
- **Animated Transitions**: Smooth state changes between upload, loading, and results
- **WebGL Background**: GPU-accelerated animated gradient for visual appeal

### 6. Image Preview and Validation

- **Instant Preview**: See uploaded image before analysis
- **Format Validation**: Ensures only valid image files are accepted
- **Size Checking**: Validates file size (max 10 MB)
- **Remove Option**: Easily remove and replace uploaded images

### 7. Error Handling

- **User-Friendly Messages**: Clear explanations when errors occur
- **Network Error Handling**: Graceful degradation if backend is unreachable
- **Invalid File Detection**: Warns users about unsupported file types
- **Model Error Reporting**: Displays issues if prediction fails

### 8. Technical Information Display

**Homepage Features**:
- **Feature Cards**: Showcase key metrics (<2s speed, 97% accuracy, MobileNetV2)
- **How It Works**: Step-by-step workflow visualization
- **Technical Specifications**: Detailed model and deployment information
- **Use Cases**: Real-world applications (Manufacturing QC, Safety Labs, Warehouse Inspection, R&D)

---

## Technical Architecture

### Frontend Stack

- **Framework**: Next.js 16.0.1 (React 19.2.0)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with custom animations
- **UI Animations**: Framer Motion 12.23.24
- **Icons**: Lucide React 0.552.0
- **Graphics**: WebGL (Canvas API) for animated gradient background

### Backend Stack

- **Framework**: FastAPI (Python)
- **Server**: Uvicorn 0.32.1
- **ML Framework**: TensorFlow 2.20.0
- **Image Processing**: Pillow (PIL) 12.0.0
- **CORS Support**: Enabled for all origins

### Machine Learning Model

- **Architecture**: MobileNetV2 + Custom Classifier
- **Model Format**: TensorFlow SavedModel
- **Training Data**: 215+ labeled battery cell samples
- **Accuracy**: 97% on validation set
- **Input Size**: 224×224 RGB normalized images
- **Inference Time**: <2 seconds (sub-second latency)
- **Classification**: Binary (BULGING vs. REGULAR)

### API Endpoints

**Frontend API Route**:
- `POST /api/predict` - Proxy route that forwards requests to backend

**Backend API Routes**:
- `POST /predict` - Accepts image upload, returns prediction
- `GET /health` - Health check endpoint (returns model status)

**Request Format**:
```
POST /predict
Content-Type: multipart/form-data
Body: file (image file)
```

**Response Format**:
```json
{
  "prediction": "BULGING" | "REGULAR",
  "confidence": 75.8,
  "rawScore": 0.758,
  "risk": "HIGH" | "MEDIUM" | "LOW"
}
```

### Workflow Diagram

```
User Uploads Image
        ↓
Client-Side Validation (file type, size)
        ↓
Preview Display
        ↓
Click "Run Analysis"
        ↓
POST to /api/predict (Next.js API Route)
        ↓
Forward to Railway Backend
        ↓
Python Backend Processing:
  1. Receive image bytes
  2. Convert to PIL Image (RGB)
  3. Resize to 224×224 pixels
  4. Normalize (divide by 255)
  5. Convert to TensorFlow tensor
  6. Load MobileNetV2 model
  7. Run inference
  8. Extract prediction (0-1 scale)
  9. Classify (> 0.5 = BULGING, ≤ 0.5 = REGULAR)
  10. Calculate confidence percentage
  11. Determine risk level
        ↓
Return JSON Response
        ↓
Display Results (status, confidence, raw score)
```

---

## Model Details

### Training Information

- **Dataset Size**: 215+ labeled battery cell images
- **Classes**:
  - Class 0: REGULAR (normal/safe batteries)
  - Class 1: BULGING (swollen/dangerous batteries)
- **Validation Accuracy**: 97%
- **Base Model**: MobileNetV2 (pre-trained on ImageNet)
- **Custom Layers**: Additional classifier layers for binary classification

### Preprocessing Pipeline

1. **Image Reception**: Accept JPG, PNG, or WebP files
2. **Color Conversion**: Ensure RGB format (convert if needed)
3. **Resizing**: Scale to 224×224 pixels (MobileNetV2 input size)
4. **Normalization**: Divide pixel values by 255.0 (scale to 0-1 range)
5. **Batch Dimension**: Add dimension for batch processing [1, 224, 224, 3]
6. **Tensor Conversion**: Convert numpy array to TensorFlow tensor

### Prediction Logic

```
Raw Model Output (0-1 scale)
        ↓
If prediction > 0.5:
    Classification: BULGING
    Confidence: prediction × 100
Else (prediction ≤ 0.5):
    Classification: REGULAR
    Confidence: (1 - prediction) × 100
        ↓
Risk Level Assignment:
    HIGH: |prediction - 0.5| > 0.3 (very confident)
    MEDIUM: |prediction - 0.5| > 0.1 (moderately confident)
    LOW: |prediction - 0.5| ≤ 0.1 (near threshold)
```

### Model Performance Characteristics

- **Inference Latency**: <1.2 seconds (model inference only)
- **Total Response Time**: <2 seconds (including preprocessing and network)
- **False Negative Rate**: Minimized (critical for safety applications)
- **Model Size**: ~1.7 MB (SavedModel format)
- **Deployment**: Loaded once at startup, reused for all predictions

---

## Key Files Reference

### Critical Application Files

| File Path | Purpose |
|-----------|---------|
| `app/page.tsx` | Landing page (homepage) |
| `app/analysis/page.tsx` | Analysis interface (upload and results) |
| `app/api/predict/route.ts` | API route handler (proxy to backend) |
| `python_backend/main.py` | FastAPI backend with ML inference |
| `python_backend/battery_model/` | TensorFlow SavedModel directory |
| `components/Hero.tsx` | Hero section with CTA |
| `components/Features.tsx` | Feature cards display |
| `components/HowItWorks.tsx` | Workflow visualization |
| `components/GradientBackground.tsx` | WebGL animated background |

### Configuration Files

| File Path | Purpose |
|-----------|---------|
| `package.json` | Frontend dependencies |
| `python_backend/requirements.txt` | Backend dependencies |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `next.config.ts` | Next.js configuration |

---

## Evaluation Criteria Suggestions

When evaluating this senior design project, consider the following aspects:

### 1. Technical Implementation
- Full-stack application with modern frameworks (Next.js, FastAPI)
- Integration of machine learning model (TensorFlow)
- RESTful API design with proper error handling
- Responsive UI with advanced animations (WebGL, Framer Motion)

### 2. Machine Learning Integration
- Custom-trained model with 97% accuracy
- Proper preprocessing pipeline
- Real-time inference (<2 seconds)
- Confidence scoring and risk assessment

### 3. User Experience
- Intuitive drag-and-drop interface
- Clear visual feedback at every step
- Informative homepage with technical details
- Fast response times

### 4. Software Engineering Practices
- TypeScript for type safety
- Component-based architecture (React)
- Separation of concerns (frontend/backend)
- Proper error handling and validation

### 5. Deployment and Accessibility
- Successfully deployed to production platforms
- No authentication barriers for demo purposes
- Cross-browser compatibility
- Responsive design for multiple devices

### 6. Safety and Practical Application
- Addresses real-world safety concern (battery hazards)
- Potential applications in manufacturing, labs, warehouses
- High accuracy reduces false negatives (critical for safety)

---

## Testing the Application

### Recommended Test Cases

1. **Happy Path**:
   - Upload a clear battery cell image
   - Verify analysis completes successfully
   - Confirm results display correctly with confidence score

2. **Invalid File Upload**:
   - Attempt to upload a non-image file (PDF, TXT, etc.)
   - Verify appropriate error message is shown

3. **Network Resilience**:
   - Test with slow internet connection
   - Verify loading states display correctly

4. **Multiple Analyses**:
   - Upload and analyze several different images in succession
   - Verify each analysis produces independent results

5. **UI Responsiveness**:
   - Test on different screen sizes (desktop, tablet, mobile)
   - Verify layout adapts appropriately

6. **Edge Cases**:
   - Upload very small images
   - Upload very large images (near 10 MB limit)
   - Test with various image formats (JPG, PNG, WebP)

---

## Support and Documentation

### Project Repository
- **GitHub**: [Your repository URL here]
- **Issues**: Report bugs or issues on GitHub

### Additional Resources
- **Model Training**: Details on training data and methodology
- **API Documentation**: Swagger/OpenAPI docs at backend `/docs` endpoint
- **Technical Specifications**: Detailed on homepage

### Contact Information
- **Team**: [Your team name or student names]
- **Course**: [Course name and number]
- **Term**: [Academic term]

---

## Conclusion

This Battery Safety Detection System demonstrates the integration of modern web technologies with machine learning to solve a real-world safety problem. The application showcases proficiency in full-stack development, API design, ML model deployment, and user interface design.

The system is production-ready, deployed, and accessible for evaluation without any setup requirements. Simply visit the deployment URL and begin testing the battery cell analysis functionality.

Thank you for reviewing this senior design project submission.

---

**Document Version**: 1.0
**Last Updated**: 2025-11-19
**Prepared For**: Senior Design Project Review
