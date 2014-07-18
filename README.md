RPiBplus_GPIO_interactive_map
=============================

RaspberryPi B+ GPIO interactive map, to easily know which pin does what!

### How is it working?

Easy, just hover the RaspberryPi to see the different roles and mode that a Pin can have!

### Cool! can I have a local copy or a live copy on my website ?

Sure, do whatever you want with it! Juste don't forget the people behind it please and share your improvment to make it even better!
People to thank:
+ [raspberrypi.org/](), For all the awesomeness (and I stole the picture from their website, hope it's alright!)
+ [Eskimon](http://eskimon.fr), it's me, I wrote all the rest of the things you can see in the "sources" folder. If you want to use the map on your own website, I would appreciate a link to the page of the project as "source" as described in the licence :) [Source](http://eskimon.fr/raspberrypi-bplus-gpio-interactive-map).

### How to embed the map on your website.

It's very simple.
First, copy the rpibplus_style.css to your stylesheet folder (or root folder). Then do the same with the rpibplus_script.js to your scripts folder (or root folder).
Then, you just need to copy the interesting part of the HTML file. It's very simple, it's everything in the `<body>` tag (all the div)!
Finally, don't forget to link the css and js files:
+ Add `<link type="text/css" rel="stylesheet" href="rpibplus_style.css" />` to the `head` of your html file
+ Add `<script type="text/javascript" src="rpibplus_script.js"></script>` just before the closing `</body>` tag.

(Be careful with the path to the files ;) )

And there you are!! Have Fun!