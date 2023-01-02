from io import BytesIO
import base64
from wordcloud import WordCloud, ImageColorGenerator
from PIL import Image
import numpy as np
import requests


def lambda_handler(event, context):
    text = event["text"]
    settings = event["settings"]
    img = image_mask = None

    # color mask
    if "mask" in settings:
        img = Image.open(requests.get(settings["mask"], stream=True).raw)
        image_mask = np.array(img)
        settings["mask"] = image_mask
        # wc = WordCloud(mask=image_mask, repeat=settings["repeat"]).generate(text)

    wc = WordCloud(**settings).generate(text)

    if "mask" in settings:
        image_colors = ImageColorGenerator(image_mask)
        wc.recolor(color_func=image_colors)

    # to base64
    img = wc.to_image()
    im_file = BytesIO()
    img.save(im_file, format="JPEG")

    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {"Content-Type": "image/png"},
        "body": base64.b64encode(im_file.getvalue()),
    }
