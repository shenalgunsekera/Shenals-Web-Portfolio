const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');

async function convertToWebP() {
  console.log('🖼️  Converting images to WebP format...\n');

  // Get all image files in the directory and subdirectories
  function getAllImageFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively get images from subdirectories
        const subFiles = getAllImageFiles(fullPath);
        files.push(...subFiles);
      } else if (stat.isFile()) {
        // Check if it's an image file
        const ext = path.extname(item).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif'].includes(ext)) {
          files.push({
            input: fullPath,
            output: fullPath.replace(ext, '.webp'),
            relativePath: path.relative(imagesDir, fullPath),
            relativeOutput: path.relative(imagesDir, fullPath).replace(ext, '.webp')
          });
        }
      }
    }
    
    return files;
  }

  const imageFiles = getAllImageFiles(imagesDir);
  
  if (imageFiles.length === 0) {
    console.log('No image files found to convert.');
    return;
  }

  console.log(`Found ${imageFiles.length} image(s) to convert:\n`);

  let totalOriginalSize = 0;
  let totalNewSize = 0;

  for (const image of imageFiles) {
    try {
      const originalSize = fs.statSync(image.input).size;
      totalOriginalSize += originalSize;
      
      console.log(`Converting ${image.relativePath} to ${image.relativeOutput}...`);
      
      await sharp(image.input)
        .resize(1920, 1080, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ 
          quality: 85,
          effort: 6
        })
        .toFile(image.output);

      const newSize = fs.statSync(image.output).size;
      totalNewSize += newSize;
      const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`✅ ${image.relativePath} → ${image.relativeOutput}`);
      console.log(`   Size: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(newSize / 1024 / 1024).toFixed(1)}MB (${reduction}% reduction)\n`);

    } catch (error) {
      console.error(`❌ Error converting ${image.relativePath}:`, error.message);
    }
  }

  const totalReduction = ((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1);
  
  console.log('🎉 WebP conversion complete!');
  console.log(`📊 Total size reduction: ${(totalOriginalSize / 1024 / 1024).toFixed(1)}MB → ${(totalNewSize / 1024 / 1024).toFixed(1)}MB (${totalReduction}% reduction)`);
  console.log('\n📝 Next steps:');
  console.log('1. Update your code to use .webp files');
  console.log('2. Keep original files as fallbacks');
  console.log('3. Test the website performance');
  console.log('\n💡 Usage:');
  console.log('   node convert-to-webp.js');
  console.log('   (Run this script whenever you add new images)');
}

// Check if sharp is installed
try {
  require('sharp');
  convertToWebP();
} catch (error) {
  console.log('❌ Sharp library not found!');
  console.log('\n📦 Install sharp first:');
  console.log('npm install sharp');
  console.log('\nThen run: node convert-to-webp.js');
} 