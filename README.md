> a pretty-good-but-not-perfect automated way to post to your Facebook timeline

This is very lightly modified from https://medium.com/@progrium/the-only-way-you-can-automate-facebook-posts-now-bd3a40fd1c4b. Thanks :D


# Usage
  1. clone the repo
  1. install the dependencies
     ```bash
     yarn
     ```
  1. launch a window to login to Facebook
     ```bash
     node index.js --login
     ```
  1. now you can post things from the command line
     ```bash
     node index.js "Hackers gonna hack!"
     ```

# Limitations
This script only starts a new post, types some text and hits the post button.
It doesn't do anything extra (yet) so there's some things you need to consider.
Facebook should have all these "last ..." settings server side so if you have
this script running somewhere headless, you should be able to alter you
Facebook session from another computer logged in to Facebook.

 1. your last post privacy setting will be used
 1. your last preference for News Feed/Your Story will be used
 1. this is really only feasible for *you* to use to post to *your* timeline.
    You can't do a third party OAuth type thing where users let you post to
    their timeline
