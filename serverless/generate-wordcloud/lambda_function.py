from io import BytesIO
import base64
from wordcloud import WordCloud


def lambda_handler(event, context):
    text = event["text"]
    settings = event["settings"]

    # generation
    wordcloud = WordCloud(
        width=1080,
        height=1080
        # max_words=settings["max"],
        # mask=settings["mask"],
        # stopwords=settings["stopwords"],
        # margin=settings["margin"],
        # random_state=settings["random_state"],
    ).generate(text)

    # to base64
    img = wordcloud.to_image()
    im_file = BytesIO()
    img.save(im_file, format="JPEG")

    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {"Content-Type": "image/png"},
        "body": base64.b64encode(im_file.getvalue()),
    }
