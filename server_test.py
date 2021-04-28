import requests
import json
import cv2

x = requests.get("http://127.0.0.1:5000/video_feed")
print(x._bodyText)

