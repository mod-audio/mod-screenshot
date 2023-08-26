from PIL import Image

'''
Based on mod-sdk from https://github.com/moddevices/mod-sdk/blob/master/modsdk/screenshot.py#L93
Copyright (c) MOD Audio UG
SPDX - License - Identifier: GPL-3.0

@TODO: code below should become part of screenshot.js in this same repo
'''

WIDTH = 1920
HEIGHT = 1080

MAX_THUMB_WIDTH = 256
MAX_THUMB_HEIGHT = 64

def crop(img):
    # first find latest non-transparent pixel in both width and height
    min_x = WIDTH
    min_y = HEIGHT
    max_x = 0
    max_y = 0
    for i, px in enumerate(img.getdata()):
        if px[3] > 0:
            width = i % img.size[0]
            height = i / img.size[0]
            min_x = min(min_x, width)
            min_y = min(min_y, height)
            max_x = max(max_x, width)
            max_y = max(max_y, height)
    # now crop
    return img.crop([int(i) for i in (min_x, min_y, max_x, max_y)])

def handle_image(fh):
    img = Image.open(fh)
    img = crop(img)
    img.save("screenshot.png")
    width, height = img.size
    if width > MAX_THUMB_WIDTH:
        width = MAX_THUMB_WIDTH
        height = height * MAX_THUMB_WIDTH / width
    if height > MAX_THUMB_HEIGHT:
        height = MAX_THUMB_HEIGHT
        width = width * MAX_THUMB_HEIGHT / height
    img.convert('RGB')
    img.thumbnail((width, height), Image.ANTIALIAS)
    img.save("thumbnail.png")

handle_image("screenshot.png")
