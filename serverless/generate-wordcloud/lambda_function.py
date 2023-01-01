from io import BytesIO
import base64
from wordcloud import WordCloud, ImageColorGenerator
from PIL import Image
import numpy as np
import requests


def lambda_handler(event, context):
    text = event["text"]
    settings = event["settings"]

    # color mask
    if settings["color-mask"] is not None:
        img = Image.open(requests.get(settings["color-mask"], stream=True).raw)
        image_mask = np.array(img)
        image_colors = ImageColorGenerator(image_mask)

        wc = WordCloud(mask=image_mask, repeat=settings['repeat']).generate(text)
        wc.recolor(color_func=image_colors)
    else:
        # generation
        wc = WordCloud(
            # width=1920,
            # height=1080,
            repeat=True
            # max_words=settings["max"],
            # mask=settings["mask"],
            # stopwords=settings["stopwords"],
            # margin=settings["margin"],
            # random_state=settings["random_state"],
        ).generate(text)

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
