FLICKR_TAG=$1 && \
mkdir /home/pi/PhotoPi/media/tags/$FLICKR_TAG
wget "http://api.flickr.com/services/feeds/photos_public.gne?tags=$FLICKR_TAG" -O- \
| grep -Po 'http://[^.]+\.staticflickr[^"]+(_b.jpg|_z.jpg)' \
| wget -P /home/pi/PhotoPi/media/tags/$FLICKR_TAG -nc -i-
