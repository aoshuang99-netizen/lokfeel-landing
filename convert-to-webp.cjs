// Batch convert JPG → WebP for nexus-landing
// Usage: node convert-to-webp.js
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const IMAGES_DIR = path.join(__dirname, "public/images");
const QUALITY = 80; // WebP quality (0-100)

async function convertFile(inputPath) {
  const outputPath = inputPath.replace(/\.jpe?g$/i, ".webp");
  
  // Skip if already converted and newer
  if (fs.existsSync(outputPath)) {
    const inputStat = fs.statSync(inputPath);
    const outputStat = fs.statSync(outputPath);
    if (outputStat.mtime > inputStat.mtime) {
      return { file: path.basename(inputPath), skipped: true, reason: "already exists" };
    }
  }

  const beforeSize = fs.statSync(inputPath).size;
  await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath);
  const afterSize = fs.statSync(outputPath).size;
  const savings = ((1 - afterSize / beforeSize) * 100).toFixed(1);

  return {
    file: path.basename(inputPath),
    from: `${(beforeSize / 1024).toFixed(1)}KB`,
    to: `${(afterSize / 1024).toFixed(1)}KB`,
    savings: `${savings}%`,
  };
}

async function main() {
  console.log("═".repeat(60));
  console.log("  LokFee! Landing — JPG → WebP Converter");
  console.log("═".repeat(60));

  // Find all JPG files recursively
  const jpgFiles = [];
  function findJpg(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        findJpg(full);
      } else if (/\.(jpe?g)$/i.test(entry.name)) {
        jpgFiles.push(full);
      }
    }
  }

  try {
    findJpg(IMAGES_DIR);
  } catch (e) {
    console.error("Error reading images directory:", e.message);
    process.exit(1);
  }

  console.log(`\nFound ${jpgFiles.length} JPG files to convert\n`);

  let totalBefore = 0, totalAfter = 0;
  const results = [];

  for (const file of jpgFiles) {
    try {
      const result = await convertFile(file);
      results.push(result);
      if (!result.skipped) {
        totalBefore += fs.statSync(file).size;
        totalAfter += fs.statSync(result.file.replace(".jpg", ".webp").replace(".jpeg", ".webp") 
          ? path.join(path.dirname(file), path.basename(file).replace(/\.(jpe?g)$/i, ".webp"))
          : file.replace(/\.(jpe?g)$/i, ".webp"));
        console.log(`  ✅ ${result.file}: ${result.from} → ${result.to} (${result.savings} saved)`);
      } else {
        console.log(`  ⏭️  ${result.file}: skipped (${result.reason})`);
      }
    } catch (err) {
      console.log(`  ❌ ${path.basename(file)}: ${err.message}`);
    }
  }

  // Recalculate totals from actual webp files
  let actualTotalBefore = 0, actualTotalAfter = 0;
  for (const f of jpgFiles) {
    actualTotalBefore += fs.statSync(f).size;
    const webpPath = f.replace(/\.(jpe?g)$/i, ".webp");
    if (fs.existsSync(webpPath)) {
      actualTotalAfter += fs.statSync(webpPath).size;
    }
  }

  console.log("\n" + "─".repeat(60));
  console.log(`  Total: ${(actualTotalBefore / 1024).toFixed(1)}KB → ${(actualTotalAfter / 1024).toFixed(1)}KB`);
  console.log(`  Savings: ${((1 - actualTotalAfter / actualTotalBefore) * 100).toFixed(1)}%`);
  console.log("─".repeat(60));
}

main().catch(console.error);
