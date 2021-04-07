# Welcome!

This repo contains the codebase for my personal marketing, portfolio and blog website.

## Technologies Used and Selection Process

The backend of the website uses NodeJS and Express as a server. Handlebars was chosen as a view engine.

Why Handlebars? After all, Jade and Pug are far more popular for pre-compiled HTML. The answer is simple: HTML5 is familiar territory. While I have used Pug very extensively during my time with App Academy, I love the rock solid, tried-and-true HTML markup syntax. Additionally, at the time of writing this Pug is no longer being actively developed and their docs are not well maintained.

The data store for the website is a Prismic.io repository. Prismic is a bare bones, ultra simple cloud headless CMS. Prismic exposes a RESTful API for access with an API token. Nothing fancy here! I chose this data store solution for its simplicity as there will be no data write operations from the frontend; only reads.

Speaking of the frontend...no React, no Vue, and in fact no frontend framework at all. Why? Because it's arguably overkill for a website this small. Also–call me a glutton for punishment–but I enjoy the challenge of VanillaJS. I chose Sass as a CSS pre-compiler because it's amazing.
