# Hugo Starter

## Run server

To run the Hugo server with drafts hidden, run `hugo server`. To see drafted content, run `hugo server -D`.

## Site Build

Note that the *public* folder should be deleted before running any of the following build commands.

### Basic site build command

Run `hugo` to build the *public* folder, which contains the compiled version of the site.

### Minified site build command

Run `hugo --minify` to build a minified *public* folder, which will handle CSS and JavaScript minification. JavaScript files will also be bundled into a sole file if specified.