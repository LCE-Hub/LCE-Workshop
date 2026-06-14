(function () {
  var STORAGE_KEY = "themeloader_themes";
  var ATTR = "data-tl";

  function load() {
    try {
      var d = api.storage.get(STORAGE_KEY);
      return d ? JSON.parse(d) : [];
    } catch (e) {
      return [];
    }
  }

  function save(themes) {
    api.storage.set(STORAGE_KEY, JSON.stringify(themes));
  }

  function linkId(url) {
    return "tl_" + btoa(url).replace(/[/+=]/g, "_");
  }

  function inject(url) {
    var id = linkId(url);
    if (document.getElementById(id)) return;
    fetch(url).then(function (r) { return r.text(); }).then(function (css) {
      var el = document.getElementById(id);
      if (el) return;
      var style = document.createElement("style");
      style.id = id;
      style.setAttribute(ATTR, "");
      style.textContent = css;
      document.head.appendChild(style);
    }).catch(function () {});
  }

  function eject(url) {
    var el = document.getElementById(linkId(url));
    if (el) el.remove();
  }

  function apply() {
    var els = document.querySelectorAll("style[" + ATTR + "]");
    for (var i = els.length - 1; i >= 0; i--) els[i].remove();
    var themes = load();
    for (var i = 0; i < themes.length; i++) {
      if (themes[i].enabled) inject(themes[i].url);
    }
  }

  api.views.register(
    "themeloader",
    function (api) {
      var h = api.React.createElement;
      var useState = api.React.useState;
      var useEffect = api.React.useEffect;
      var useCallback = api.React.useCallback;
      return function ThemeLoaderView() {
        var themesState = useState([]);
        var themes = themesState[0];
        var setThemes = themesState[1];
        var nameState = useState("");
        var name = nameState[0];
        var setName = nameState[1];
        var urlState = useState("");
        var url = urlState[0];
        var setUrl = urlState[1];
        useEffect(function () {
          setThemes(load());
        }, []);

        var add = useCallback(
          function () {
            if (!name.trim() || !url.trim()) return;
            var updated = themes.concat([
              { name: name.trim(), url: url.trim(), enabled: true },
            ]);
            save(updated);
            setThemes(updated);
            apply();
            setName("");
            setUrl("");
          },
          [themes, name, url],
        );

        var toggle = useCallback(
          function (i) {
            var updated = themes.map(function (t, j) {
              return j === i
                ? { name: t.name, url: t.url, enabled: !t.enabled }
                : t;
            });
            save(updated);
            setThemes(updated);
            apply();
          },
          [themes],
        );

        var remove = useCallback(
          function (i) {
            eject(themes[i].url);
            var updated = themes.filter(function (_, j) {
              return j !== i;
            });
            save(updated);
            setThemes(updated);
          },
          [themes],
        );

        var handleNameKey = useCallback(
          function (e) {
            if (e.key === "Enter") add();
          },
          [add],
        );

        var handleUrlKey = useCallback(
          function (e) {
            if (e.key === "Enter") add();
          },
          [add],
        );

        var children = [];
        children.push(
          h(
            "div",
            { key: "back", className: "mb-2" },
            h(
              "button",
              {
                className:
                  "text-sm text-[#A0A0A0] hover:text-[#FFFF55] mc-text-shadow cursor-pointer",
                onClick: function () {
                  api.views.navigate("settings");
                },
              },
              "\u2190 Back",
            ),
          ),
        );

        children.push(
          h(
            "div",
            { key: "header", className: "flex flex-col gap-0 mb-4" },
            h(
              "span",
              { className: "text-2xl font-bold mc-text-shadow tracking-wide" },
              "ThemeLoader",
            ),
            h(
              "span",
              { className: "text-xs text-[#888] mc-text-shadow mt-1" },
              "Load, enable and disable themes from raw CSS Themes.",
            ),
          ),
        );

        children.push(
          h(
            "div",
            {
              key: "add-form",
              className:
                "border border-[#555] bg-black/40 p-3 mb-4 flex flex-col gap-2",
            },
            h(
              "div",
              { className: "flex gap-2" },
              h("input", {
                className:
                  "flex-1 px-2 py-1 text-sm bg-black/60 border border-[#555] text-white outline-none placeholder-[#666]",
                placeholder: "Theme name",
                value: name,
                onChange: function (e) {
                  setName(e.target.value);
                },
                onKeyDown: handleNameKey,
              }),
              h("input", {
                className:
                  "flex-[2] px-2 py-1 text-sm bg-black/60 border border-[#555] text-white outline-none placeholder-[#666]",
                placeholder: "Raw CSS URL (e.g. https://example.com/theme.css)",
                value: url,
                onChange: function (e) {
                  setUrl(e.target.value);
                },
                onKeyDown: handleUrlKey,
              }),
            ),
            h(
              "button",
              {
                className:
                  "self-start px-4 py-1 text-sm text-white mc-text-shadow cursor-pointer",
                style: {
                  backgroundImage: "url('/images/Button_Background.png')",
                  backgroundSize: "100% 100%",
                  imageRendering: "pixelated",
                },
                onClick: add,
              },
              "Add Theme",
            ),
          ),
        );

        var themeItems;
        if (themes.length === 0) {
          themeItems = h(
            "div",
            {
              className: "text-sm text-[#666] mc-text-shadow py-4 text-center",
            },
            "No themes added yet.",
          );
        } else {
          themeItems = themes.map(function (t, i) {
            var statusClass = t.enabled ? "text-[#55FF55]" : "text-[#FF5555]";
            var statusText = t.enabled ? "Enabled" : "Disabled";
            var btnLabel = t.enabled ? "Disable" : "Enable";

            return h(
              "div",
              {
                key: t.url,
                className:
                  "flex items-center gap-3 border border-[#444] bg-black/30 p-2",
              },
              h("span", { className: "flex-1 text-sm mc-text-shadow" }, t.name),
              h(
                "span",
                {
                  className:
                    "text-[10px] uppercase tracking-wider " + statusClass,
                },
                statusText,
              ),
              h(
                "button",
                {
                  className:
                    "text-[10px] px-2 py-0.5 text-white mc-text-shadow cursor-pointer border border-[#555] bg-black/40 hover:bg-black/60",
                  onClick: function () {
                    toggle(i);
                  },
                },
                btnLabel,
              ),
              h(
                "button",
                {
                  className:
                    "text-[10px] px-2 py-0.5 text-[#FF5555] mc-text-shadow cursor-pointer border border-[#555] bg-black/40 hover:bg-black/60",
                  onClick: function () {
                    remove(i);
                  },
                },
                "Remove",
              ),
            );
          });

          themeItems = h(
            "div",
            { className: "flex flex-col gap-1.5" },
            h(
              "span",
              {
                className:
                  "text-[10px] text-[#888] uppercase tracking-widest mb-1",
              },
              "Installed Themes (" + themes.length + ")",
            ),
            themeItems,
          );
        }

        children.push(h("div", { key: "theme-list" }, themeItems));
        return h(
          "div",
          {
            className: "w-full max-w-xl mx-auto p-4 flex flex-col",
            style: {
              minHeight: "100%",
              backgroundSize: "100% 100%",
              imageRendering: "pixelated",
            },
          },
          children,
        );
      };
    },
    { label: "Theme Loader" },
  );

  api.actions.register("settings-tab", {
    id: "themeloader",
    label: "Themes",
    onClick: function () {
      api.views.navigate("themeloader");
    },
  });

  api.hooks.on("app:ready", apply);
})();
