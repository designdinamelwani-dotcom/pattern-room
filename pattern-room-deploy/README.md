# Pattern Room — Railway deploy

1. Create a GitHub repo and upload everything in this folder (package.json, server.js, public/index.html).
2. railway.app → New Project → Deploy from GitHub repo → pick the repo.
3. Railway detects Node and runs `npm start`. No build step.
4. Settings → Networking → Generate Domain to get the public URL.

Optional login wall: Variables → add `BASIC_USER` and `BASIC_PASS`. The browser then asks for a username/password before loading the app.

Update: replace `public/index.html` with a new export and commit — Railway redeploys automatically.

Data: looks are stored in each browser. Use Settings → Team sync (Supabase) for one shared source.
