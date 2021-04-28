from time import time
from flask import Flask, render_template , request , jsonify
from PIL import Image
import os , io , sys
import numpy as np 
import cv2
import base64

app = Flask(__name__)


@app.route('/time')
def get_current_time():
	# return {'time': 'https://via.placeholder.com/350x150'}
	frame = get_frame()

	return {'time': 'https://via.placeholder.com/350x150'}
	

@app.route('/get_image/<int:img_count>')
def get_image(img_count):

	# file = request.files['./assets/2.jpg'].read() ## byte file
	# npimg = np.fromstring(file, np.uint8)
	# img = cv2.imdecode(npimg,cv2.IMREAD_COLOR)

	_, img = cv2.VideoCapture(0).read()

	
	# cam.release()

	# cv2.destroyAllWindows()
	
	# # if img_count > 754:
	# 	img_count = 0

	# path = "C:/Users/tanzi/OneDrive - University of Guelph/Masters OneDrive/Code/Robot Feeder 2.0/prototype 5.0/facial detection testing/tanzim/"
	
	# img = cv2.imread(path + str(img_count) + '.jpg')
	img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
	
	img = Image.fromarray(img.astype("uint8"))
	rawBytes = io.BytesIO()
	img.save(rawBytes, "JPEG")
	rawBytes.seek(0)
	img_base64 = base64.b64encode(rawBytes.read())

	# img_count += 1


	return jsonify({'status':str(img_base64)})

	

@app.route('/video_feed')
def video_feed():
	return Response(get_frame(),mimetype='multipart/x-mixed-replace; boundary=frame')




def get_frame():
	frame = cv2.imread('./assets/2.jpg')
	ret, jpeg = cv2.imencode('.jpg', frame)
	frame = jpeg.tobytes()
	# frame = base64.b64encode(jpeg) 

	yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

if __name__ == '__main__':
	# defining server ip address and port
	# app.run(host='0.0.0.0', port=5000, threaded=True, use_reloader=False)


	cam = cv2.VideoCapture(0)

	img_counter = 0

	while True:
		x = 0

		k = cv2.waitKey(1)
		if k%256 == 27:
			# ESC pressed
			print("Escape hit, closing...")
			break
		elif k%256 == 32:
			# SPACE pressed
			img_name = "opencv_frame_{}.png".format(img_counter)
			cv2.imwrite(img_name, frame)
			print("{} written!".format(img_name))
			img_counter += 1

	cam.release()

	cv2.destroyAllWindows()