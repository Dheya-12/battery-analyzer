from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
print("Loading model...")
model_path = os.path.join(os.path.dirname(__file__), 'battery_model')

try:
    # Load as TensorFlow SavedModel (not Keras)
    model = tf.saved_model.load(model_path)
    # Get the inference function
    infer = model.signatures["serving_default"]
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    infer = None

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    if infer is None:
        return {"error": "Model not loaded"}
    
    try:
        # Read and preprocess image
        contents = await image.read()
        img = Image.open(io.BytesIO(contents)).convert('RGB')
        img = img.resize((224, 224))
        
        # Convert to array and normalize
        img_array = np.array(img, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Convert to tensor
        input_tensor = tf.convert_to_tensor(img_array, dtype=tf.float32)
        
        # Get prediction
        output = infer(input_tensor)
        # Extract the prediction value (first output)
        prediction = float(list(output.values())[0].numpy()[0][0])
        
        is_bulging = prediction > 0.5
        confidence = prediction if is_bulging else (1 - prediction)
        
        if prediction > 0.8 or prediction < 0.2:
            risk = "HIGH"
        elif prediction > 0.6 or prediction < 0.4:
            risk = "MEDIUM"
        else:
            risk = "LOW"
        
        return {
            "prediction": "BULGING" if is_bulging else "REGULAR",
            "confidence": round(confidence * 100, 1),
            "rawScore": round(prediction, 4),
            "risk": risk
        }
    except Exception as e:
        print(f"Prediction error: {e}")
        return {"error": str(e)}

@app.get("/health")
async def health():
    return {"status": "ok", "model_loaded": infer is not None}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)