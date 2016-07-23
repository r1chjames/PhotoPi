FLICKR_TAG=r1chjames-asia && \
wget 'https://api.flickr.com/services/feeds/activity/all?user_id=62083736@N05&secret=oiwzAKbTm7TCvDP%2BtTXxSQGeuBU%3D&lang=en-us' -O- \
| grep -Po 'http://[^.]+\.staticflickr[^"]+(_b.jpg|_z.jpg)' \
| wget -P /home/pi/PhotoPi/media/flickr -nc -i-
