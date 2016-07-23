#!/bin/sh
#
# Script to run Digital Picture Frame using Feh
# drware@thewares.net
#

# Set display so that the script will effect
# the screen on the frame
export DISPLAY=:0

if [ "$1" = "--help" ] ; then
	echo "Parameter 1 is the tag, parameter 2 is the photo interval"
	exit 1
elif [ -z "$1" ] ; then
	echo "Parameter 1 - flickr tag is missing"
	exit 1
elif [ "$1" = "all" ] ; then
	flickr_tag=""
	echo "Photo directory: /home/pi/PhotoPi/media/"
else
	flickr_tag="tags/$1"
	echo "Photo directory: /home/pi/PhotoPi/media/${flickr_tag}"
fi

if [ -z "$2" ] ; then
	echo "Parameter 2 - photo interval is missing"
	exit 1
else
	photo_interval="$2"
fi

# Stop the currently running Slide show
/home/pi/PhotoPi/kill.sh feh

#clear
#echo ""
#echo -n "Enter the number of seconds for photo rotation"
#echo -n " and press [ENTER]: "
#read var_seconds
#echo ""

DISPLAY=:0.0 XAUTHORITY=/home/pi/.Xauthority /usr/bin/feh --zoom fill --recursive --randomize --full-screen --borderless \
--slideshow-delay ${photo_interval} /home/pi/PhotoPi/media/${flickr_tag} &

exit 0

