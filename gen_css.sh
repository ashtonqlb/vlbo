#!/bin/bash

mkdir -p ./assets/styles

echo "@import 'tailwindcss/base';" > ./assets/styles/gen.css
echo "@import 'tailwindcss/components';" >> ./assets/styles/gen.css
echo "@import 'tailwindcss/utilities';" >> ./assets/styles/gen.css

npx tailwindcss -i ./assets/styles/gen.css -o ./assets/styles/vlbo_stylesheet.css