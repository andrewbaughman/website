# dru.land

This is my website. 

It exists for me to have fun and do things that interest me.

## Development Setup

Once you've cloned the project and installed dependencies with `npm install`, start a development server:
```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Deployment

GitHub Actions are setup to deploy the website when a new commit is made to main.
Manually, you can make a build with `npm run build`
- You can open that locally to see it live before deployment.

For this to run properly with GitHub Pages,
- make the .nojekyll file in gh-pages branch (no contents)
- set the Pages settings to "Deploy from a branch", being gh-pages
- set the custom domain
- make sure dependencies are present in package.json

---
powered by [`sv`](https://github.com/sveltejs/cli)
