(function () {

  // Pick random
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // All rename rules
  const rules = [
    {
      match: "multiplayer",
      names: [
        "Multiplayer",
        "Host a world to nobody",
        "I know you arent pressing this one",
        "Just use a server",
        "Splitscreen time",
        "This one needs wifi",
        "https://youtu.be/dQw4w9WgXcQ"
      ]
    },
    {
      match: "play",
      names: [
        "Play",
        "Nostalgia button",
        "Open the app",
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",
        "Open Celelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelelele",
        "Top text.",
        "Guh",
        "According to all known laws of gaming you press this button to open the program.",
        "This button has text so long you cant even see it all! i mean, just look at it! theres so many words! i cant fit all of this into one line! but then again, i managed to fit all of the screaming you see 5 lines up into one line, but thats because of word wrap settings. all of that aside, this button is the one you press to open the app. hope that helps!",
        "https://youtu.be/dQw4w9WgXcQ"
      ]
    },
    {
      match: "options",
      names: [
        "Help & Options",
        "Help",
        "Options",
        "&",
        "A buncha random numbers and switches",
        "Change things",
        "Modifications",
        "https://youtu.be/dQw4w9WgXcQ"
      ]
    },
    {
      match: "version",
      names: [
        "Versions",
        "Choose your fighter",
        "Click neolegacy!",
        "Click revelations!",
        "Click 360 revived!",
        "Click hellish ends!",
        "Click Aether Mod!",
        "Pick a console",
        "red pill or blue pill",
        "https://youtu.be/dQw4w9WgXcQ"
      ]
    },
    {
      match: "workshop",
      names: [
        "Workshop",
        "50 GB of stuff",
        "Download MORE!!! MORE!!!!!!",
        "Mods",
        "Things to \"Enhance\" your experience",
        "https://youtu.be/dQw4w9WgXcQ"
      ]
    },
    {
      match: "deve",
      names: [
        "Developer Tools",
        "DO NOT TOUCH",
        "Destroy EVERYTHING",
        "Bottom text.",
        "\"\"\"Tools\"\"\"",
        "https://youtu.be/dQw4w9WgXcQ"
      ]
    },

    // settings menu
    {
      match: "audio",
      names: [
        "Audio",
        "Hearing problems? go here!",
        "AHHHH MY EARS"
      ]
    },
    {
      match: "video",
      names: [
        "Video",
        "Eye candy",
        "RTX Options"
      ]
    },
    {
      match: "control",
      names: [
        "Controls",
        "Keybinds",
        "I sure do love pressing things"
      ]
    },
    {
      match: "launcher",
      names: [
        "Launcher",
        "The thing you are running",
        "Some settings relating to this"
      ]
    },
    {
      match: "game",
      names: [
        "Game",
        "More important settings",
        "More"
      ]
    },

    // Support for other plugins
    {
      match: "plugin",
      names: [
        "Plugins",
        "Extensions",
        "Feature addict"
      ]
    },
    {
      match: "theme",
      names: [
        "Themes",
        "Pretty button",
        "Click here for shiny stuff"
      ]
    },
    {
      match: " clicker",
      names: [
        "LCE Clicker",
        "Knockoff",
        "A fun button"
      ]
    },
  ];

  // Rename logic
  function rename(span) {
    if (!span || !span.textContent) return;

    const text = span.textContent.trim().toLowerCase();

    for (const rule of rules) {
      if (text.includes(rule.match)) {
        span.textContent = pick(rule.names);
        return; // stop after first match
      }
    }
  }

  // scan buttons
  function scan() {
    document.querySelectorAll("button span").forEach(rename);
  }

  // Do it when the launcher
  api.hooks.on("app:ready", function () {
    scan();

    // keep it updated when UI changes
    new MutationObserver(scan).observe(document.body, {
      childList: true,
      subtree: true
    });
  });

})();