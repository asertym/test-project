# Readme

One-page test project.

> Note: [**StyleLint**](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) & [**Tailwind IntelliSense**](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) is required for Visual Code Studio to not display lint errors when writing CSS, additionally provides advanced features such as autocomplete and syntax highlighting. [**Guide for StyleLint use with TailwindCSS**](https://www.meidev.co/blog/visual-studio-code-css-linting-with-tailwind/)

## Node Modules

-   autoprefixer
-   browser-sync
-   gulp
-   gulp-changed
-   gulp-htmlmin
-   gulp-imagemin
-   gulp-notify
-   gulp-plumber
-   gulp-postcss
-   gulp-sass
-   gulp-sourcemaps
-   gulp-twig
-   postcss
-   tailwindcss

## Gulp tasks

-   `gulp create` to compile CSS/HTML/JS into the `build` folder
-   `gulp min` to purge css&html files, additionally can use `gulp purgecss` and `gulp purgehtml` for each
-   `gulp run` compiles CSS/HTML/JS and starts a local live server for development.

> Note: be sure to comment out the `purge` argument from `tailwind.config.js` when developing, and apply only for prod.

## Developer's Notes

Starting from the beginning, I didn't have any major problems except where I decided to use a `clip-path` for hero element and footer's polygon shape, and pushing the block above the other to achieve the desired effect.

The grid of blocks just underneath the hero element was easy to achieve thanks to CSS3, I just didn't know what animations to add or anything, so I sticked to simple colour transitions for hover.

For Javascript Libraries, I incidentally started using [**AlpineJS**](https://github.com/alpinejs/alpine), since it allows you to use neat reactive and declarative functions (like Vue or React) only at a much lower cost, with which I ended up creating the burger menu functionality.. I could've written my own 2 lines of javascript, but I didn't want to spend too much time on this.

This idea was only enhanced later on when I had to build the modals for the popup article and calendar schedule of events, where I also wanted to use AlpineJS to achieve the effect, which later proved to be extra work because of the nature of the modal itself (full-width, darkened background, accessible, buttons on the side, etc).. for which I ended up using [**MicroModal**](https://micromodal.now.sh/) — a very lightweight modal library, with configurable elements.

The most interesting part by far was the "team" section, with the slides over the right side on hover, which I achieved by creating a responsive grid of 5 blocks, where each block is a flex element that's pushing the `side` block to the right; and for the object on the right-most side, I added a simple `nth-of-type` rule to push the `side` block to the left side instead.

Now for the challenging part that took the most amount of time to (sort of) get done — the article modal itself. I stopped for a long time to think about the block structure of the whole thing, since it proved challenging because of how the title and the carousel of images are positioned. To approach a problem like that, you should first start by fixing some facts. In our case, we need to have 4 elements: the date (positioned above the title), the title itself (with the subtitle), the image carousel (positioned on the right), and the article text (which should be one continuous block of text. By adding the attribute `column-count: 2` we can split the text (and title) in two separate columns that auto-adjust in size depending on the amount of text, which is totally fine, except that we also need to position (somehow) the image carousel on the right side, while the text underneath should be pushed down. One major problem that is preventing us from achieving this, is that there is no way (or at least I couldn't find any) to position the carousel on top AND following the rules above & ARIA. A compromise that I could think of, was pushing the carousel block to the bottom of the whole thing. I didn't want to spend extra time trying to make the carousel itself, since I already spent a lot on this positioning problem, so I moved on to the next task.

> Note: Now that I think of it, the carousel can be easy created with pure CSS only.

The responsive aspect of the website was simple enough, but nonetheless can be improved with a couple classes more for touch input and other accessibilities. In short, when the website is accessed from mobile, we have the burger menu, the full-width hero, 2-column grid for blocks, single grid for the article, and 3-column grid for team members, a couple padding adjustments here and there, and a _custom made_ fluid type formula for text.
