# Another photography portfolio gallery thing.

An image gallery for my photography hobby that I don't practice enough. It's meant to be as lightweight as possible, using JavaScript and jQuery to fetch images from an imgur album and then populating a grid with those images.


I wanted to do some more web development as well as make my own gallery, so here we are. The latest version should be live at www.perniklas.no

TODO
* Lightbox
  * Figure out why animations aren't working (stuttery as heck)
* Grid
  * Add height check for jQuery to not paste all vertical images in one column
* Navigation
  * Fix navigation buttons on screen less than 320 width
  * Work out a better method of differentiationg between touch/mouse (tablets now act as computers, makes for some kinks in button styling)
  * Fix style on mobile landscape (nav buttons mushed together)
* Misc
  * Add more extensive description check on images (multiple words, no description etc etc)
  * Remember that "mobile first" is a design methodology for a reason
   * Rewrite CSS to SASS with mobile first
