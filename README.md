## Setup

1. This project uses `nvm` to manage the node version. You should install the correct node version with `nvm install`.
2. Install yarn and gatsby with `npm i -g gatsby-cli` and `npm i -g yarn`
3. Install all the bits and bobs with `yarn`
4. Pull the shared icon files down with `git submodule update --init`
5. Run the site locally with `gatsby develop`

## Deployment

Deploy the site to GH Pages with `yarn run deploy`

## Migrating RST files

To migrate RST files, place the folder in a new `content` folder and run `yarn convert`

The results will show up in the `content_build` folder. These can then be moved to the `docs` folder.

The folder structure in docs is `{product}/{version number}/{content folder}`. If there is no version involved, just make it "1"
