from keras.models import load_model
import openai
from tensorflow.keras.applications import VGG19
import flask_cors as cors
import numpy as np
from flask import Flask, request, jsonify
from PIL import Image, ImageOps
import io
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


openai.api_key = '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'


def getprompt(symptoms):
    return "I have " + symptoms + ". What is the possible skin disease diagnosis?"


def get_condition_from_symptoms(all_symptoms):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Generate answers in one word."},
            {"role": "user", "content": getprompt(all_symptoms)},
        ]
    )

    return completion.choices[0].message["content"]


model = load_model('6class_9903perc.h5', compile=False)
vgg_model = VGG19(weights='imagenet',  include_top=False,
                  input_shape=(180, 180, 3))


def getcondition(predclass):
    cat2 = ['Acne and Rosacea Photos', 'Normal', 'vitiligo', 'Tinea Ringworm Candidiasis and other Fungal Infections',
            'Eczema Photos', 'Psoriasis pictures Lichen Planus and related diseases']

    return cat2[predclass]


def center_crop_image(pillow_image, target_size=(180, 180)):
    # Get the current dimensions of the image
    width, height = pillow_image.size

    # Calculate the coordinates for the center crop
    left = (width - target_size[0]) // 2
    top = (height - target_size[1]) // 2
    right = (width + target_size[0]) // 2
    bottom = (height + target_size[1]) // 2

    # Perform the center crop
    cropped_image = pillow_image.crop((left, top, right, bottom))

    return np.asarray(cropped_image)


app = Flask(__name__)
cors.CORS(app)


@app.route('/predict', methods=['POST'])
def index():
    if request.method == "POST":
        file = request.files['file']
        if file is None or file.filename == "":
            return jsonify({'error': 'No file Uploaded'})

        try:
            image_bytes = file.read()
            image_buffer = io.BytesIO(image_bytes)
            image = Image.open(image_buffer)

            if image.mode != 'RGB':
                image = image.convert('RGB')

            img = center_crop_image(image)
            img = np.array(img)
            img = np.expand_dims(img, axis=0)
            img = vgg_model.predict(img)
            img = img.reshape(1, -1)

            # Make prediction on preprocessed image
            pred = model.predict(img)[0]
            predicted_class = np.argmax(pred)

            return jsonify({'class': str(getcondition(predicted_class)).upper()})

        except Exception as e:
            return jsonify({'error': str(e)})


@app.route('/predict2', methods=['POST'])
def index2():
    if request.method == "POST":
        symptoms = request.form['symptoms']
        print(symptoms)
        if symptoms is None:
            return jsonify({'error': 'No symptoms'})

        try:
            return jsonify({'class': str(get_condition_from_symptoms(symptoms)).upper()})

        except Exception as e:
            return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=False)
