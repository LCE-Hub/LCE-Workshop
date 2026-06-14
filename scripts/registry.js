import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join } from "path";
import { parse } from "jsonc-parser";
const OUTPUT_FILE = "./registry.json";
const OUTPUT_FILE2 = "./versions.json"; //neo: version listing lmao
const OUTPUT_FILE3 = "./plugins.json" //neo: emerald plugins
const VALID_CATEGORIES = ["Skin", "Texture", "World", "Mod", "DLC"];
const VALID_CATEGORIES2 = ["Vanilla", "Modded", "Modpack", "Fork", "Random"];
const REQUIRED_FIELDS = ["id", "name", "author", "description", "extended_description", "category", "thumbnail", "zips", "version"];
const REQUIRED_FIELDS2 = ["id", "name", "author", "description", "extended_description", "thumbnail", "url", "version", "logo"];
const REQUIRED_FIELDS3 = ["id", "name", "author", "description", "main", "permissions", "extended_description", "version"];
const IGNORED_DIRS = [".git", ".github", "scripts", "node_modules", ".00versions", ".00plugins"];
function validateMeta(meta, pkgDir) {
  const errors = [];
  for (const field of REQUIRED_FIELDS) {
    if (meta[field] === undefined || meta[field] === null) {
      errors.push(`missing required field: "${field}"`);
    }
  }

  if (meta.id && meta.id !== pkgDir) {
    errors.push(`id "${meta.id}" does not match folder name "${pkgDir}"`);
  }

  if (meta.category) {
    const cats = Array.isArray(meta.category) ? meta.category : [meta.category];
    for (const cat of cats) {
      if (!VALID_CATEGORIES.includes(cat)) {
        errors.push(`invalid category "${cat}", must be one of: ${VALID_CATEGORIES.join(", ")}`);
      }
    }
  }

  if (meta.version && !/^\d+\.\d+\.\d+$/.test(meta.version)) {
    errors.push(`version "${meta.version}" is not valid semver (expected x.y.z)`);
  }

  return errors;
}

function validateVersionMeta(meta, pkgDir) {
  const errors = [];
  for (const field of REQUIRED_FIELDS2) {
    if (meta[field] === undefined || meta[field] === null) {
      errors.push(`missing required field: "${field}"`);
    }
  }

  if (meta.id && meta.id !== pkgDir) {
    errors.push(`id "${meta.id}" does not match folder name "${pkgDir}"`);
  }

  if (meta.category) {
    const cats = Array.isArray(meta.category) ? meta.category : [meta.category];
    for (const cat of cats) {
      if (!VALID_CATEGORIES2.includes(cat)) {
        errors.push(`invalid category "${cat}", must be one of: ${VALID_CATEGORIES2.join(", ")}`);
      }
    }
  }

  if (meta.version && !/^\d+\.\d+\.\d+$/.test(meta.version)) {
    errors.push(`version "${meta.version}" is not valid semver (expected x.y.z)`);
  }

  return errors;
}

function validatePluginMeta(meta, pkgDir) {
  const errors = [];
  for (const field of REQUIRED_FIELDS3) {
    if (meta[field] === undefined || meta[field] === null) {
      errors.push(`missing required field: "${field}"`);
    }
  }

  if (meta.id && meta.id !== pkgDir) {
    errors.push(`id "${meta.id}" does not match folder name "${pkgDir}"`);
  }

  if (meta.version && !/^\d+\.\d+\.\d+$/.test(meta.version)) {
    errors.push(`version "${meta.version}" is not valid semver (expected x.y.z)`);
  }

  return errors;
}

const packages = [];
const versionlist = [];
const pluginlist = [];
const allErrors = [];
let entries;
let entries2;
let entries3;
try {
  entries = readdirSync(".");
  entries2 = readdirSync(".00versions"); //neo: dont ask about the name.
  entries3 = readdirSync(".00plugins"); //neo: same comment as above.
} catch {
  console.error(`how the hell did you run me if the directory doesn't exist???`);
  process.exit(1);
}

for (const entry of entries) {
  const pkgPath = entry;
  if (!statSync(pkgPath).isDirectory()) continue;
  if (!statSync(pkgPath).isDirectory() || IGNORED_DIRS.includes(entry) || entry.startsWith(".")) continue;
  const metaPath = join(pkgPath, "meta.json");
  let raw;
  try {
    raw = readFileSync(metaPath, "utf8");
  } catch {
    allErrors.push({ package: entry, errors: ["meta.json not found"] });
    continue;
  }

  let meta;
  try {
    meta = parse(raw);
  } catch (e) {
    allErrors.push({ package: entry, errors: [`meta.json is invalid JSON: ${e.message}`] });
    continue;
  }

  const errors = validateMeta(meta, entry);
  if (errors.length > 0) {
    allErrors.push({ package: entry, errors });
    continue;
  }

  packages.push(meta);
}

for (const entry of entries2) {
  const pkgPath = ".00versions/"+entry;
  if (!statSync(pkgPath).isDirectory()) continue;
  const metaPath = join(pkgPath, "meta.json");
  let raw;
  try {
    raw = readFileSync(metaPath, "utf8");
  } catch {
    allErrors.push({ package: entry, errors: ["meta.json not found (in version)"] });
    continue;
  }
  let meta;
  try {
    meta = parse(raw);
  } catch (e) {
    allErrors.push({ package: entry, errors: [`meta.json is invalid JSON: ${e.message} (in version)`] });
    continue;
  }

  const errors = validateVersionMeta(meta, entry);
  if (errors.length > 0) {
    allErrors.push({ package: entry, errors });
    continue;
  }

  versionlist.push(meta);
}

for (const entry of entries3) {
  const pkgPath = ".00plugins/"+entry;
  if (!statSync(pkgPath).isDirectory()) continue;
  const metaPath = join(pkgPath, "meta.json");
  let raw;
  try {
    raw = readFileSync(metaPath, "utf8");
  } catch {
    allErrors.push({ package: entry, errors: ["meta.json not found (in plugin)"] });
    continue;
  }
  let meta;
  try {
    meta = parse(raw);
  } catch (e) {
    allErrors.push({ package: entry, errors: [`meta.json is invalid JSON: ${e.message} (in plugin)`] });
    continue;
  }

  const errors = validatePluginMeta(meta, entry);
  if (errors.length > 0) {
    allErrors.push({ package: entry, errors });
    continue;
  }

  pluginlist.push(meta);
}

if (allErrors.length > 0) {
  console.error("Validation failed:\n");
  for (const { package: pkg, errors } of allErrors) {
    console.error(`  ${pkg}/meta.json`);
    for (const err of errors) {
      console.error(`    - ${err}`);
    }
  }
  process.exit(1);
}

const registry = {
  generated_at: new Date().toISOString(),
  count: packages.length,
  packages,
};

const versions = {
  generated_at: new Date().toISOString(),
  count: versionlist.length,
  versionlist,
};

const plugins = {
  generated_at: new Date().toISOString(),
  count: pluginlist.length,
  pluginlist,
};

writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2));
console.log(`registry.json generated with ${packages.length} package(s)`);
writeFileSync(OUTPUT_FILE2, JSON.stringify(versions, null, 2));
console.log(`versions.json generated with ${versionlist.length} version(s)`);
writeFileSync(OUTPUT_FILE3, JSON.stringify(plugins, null, 2));
console.log(`plugins.json generated with ${pluginlist.length} plugin(s)`);
