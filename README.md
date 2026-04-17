<div align="center">
  <img width="150" alt="Emerald Workshop" src="https://github.com/user-attachments/assets/ab30c4d9-997b-4439-b9af-4540d28b8dd0" />
  <h1>Emerald Legacy Workshop</h1>
  <p><strong>Central registry for community-driven content used by the Emerald Legacy Launcher.</strong></p>
  <p>
    <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
  </p>
</div>

## About
The Workshop is a free, open-source alternative to the Minecraft Marketplace for LCE. It allows the community to share:
- **Skins Packs**
- **Texture Packs**
- **DLCs**: Expansion packs, maps, etc.
- **Mods**: Using mod loaders, of course.
- **Worlds**

## How to Contribute

We welcome contributors! To add your content to the workshop:

1. **Fork this repository.**
2. **Upload your content**: Create a subfolder with your mod ID and place your assets (zips, thumbnails).
3. **Update `meta.json` in your subfolder**: Add your item to the list following the schema below.
4. **Submit a Pull Request**: Our team will review your submission for quality and safety.

## Schema Details

Your `meta.json` must follow this structure:

| Field | Type | Description |
|---|---|---|
| `id` | String | A unique identifier (kebab-case). |
| `name` | String | Display name of the item. |
| `author` | String | Your Github username. |
| `description`| String | A short summary of what the item does. |
| `extended_description`| String | A complete description in **`markdown`** of your project, it can include all available markdown features. This field is required but may be left as `""` (empty), although it’s *not* recommended, for more information on how to structure your markdown look into [this](https://remarkjs.github.io/react-markdown/), for complete documentation look at this [MarkdownGuide](./MarkdownGuide.md) |
| `category` | String or String[] | Must be `Skin`, `Texture`, `World`, `Mod`, `DLC`, or multiple ones in a list. |
| `thumbnail` | String | File name for your 1:1 image (PNG/JPG/SVG/GIF) for the preview. |
| `zips`| Object | Names of your `.zip` files to extract. |
| `version` | String | Semantic versioning (e.g. `1.0.0`). |

## Example `meta.json` (jsonc, remove comments)
```jsonc
{
  "id": "my-amazing-mod", // ID
  "name": "My Awesome Mod", // Name
  "author": "neoapps-dev", // Github username
  "description": "Adds back Ruby items", // Short Description
  "extended_description": "# Markdown", // Detailed Description
  "category": ["Mod", "DLC"], // Category
  "thumbnail": "thumbnail.png", // Thumbnail filename
  "zips": { // Object ("file-name.zip": "path/in/the/game/directory/to/extract/it/in)
    "ruby.zip": "", // empty means the root of the game directory
    "texture.zip": "{MediaDir}/DLC" // placeholders are handled by Emerald
  },
  "version": "1.0.0"
}
```

## Supported Placeholders
- `{MediaDir}`: Path to the Windows64Media, or Common/Media for 4JCraft
- `{GameHDD}`: Saves directory
- `{DLCDir}`: Path to `{MediaDir}/DLC`
- `{MobDir}`: Path to Common/res/mob (contains default skins)

## License
By contributing to this repository, you agree to license your manifest entries under the **MIT License**. The content itself (skins/packs) must be compatible with FOSS distribution.
