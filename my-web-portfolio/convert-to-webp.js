const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');

async function convertToWebP() {
  console.log('🖼️  Converting images to WebP format...\n');

  const imagesToConvert = [
    { input: 'light.jpg', output: 'light.webp', maxWidth: 1920, maxHeight: 1080 },
    { input: 'dark.png.jpg', output: 'dark.webp', maxWidth: 1920, maxHeight: 1080 },
    { input: 'bg3.png', output: 'bg3.webp', maxWidth: 1920, maxHeight: 1080 },
    { input: 'bg1.jpeg', output: 'bg1.webp', maxWidth: 1920, maxHeight: 1080 },
    { input: '2.png', output: '2.webp', maxWidth: 1920, maxHeight: 1080 }
  ];

  for (const image of imagesToConvert) {
    const inputPath = path.join(imagesDir, image.input);
    const outputPath = path.join(imagesDir, image.output);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${image.input} - file not found`);
      continue;
    }

    try {
      console.log(`Converting ${image.input} to ${image.output}...`);
      
      await sharp(inputPath)
        .resize(image.maxWidth, image.maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ 
          quality: 85,
          effort: 6
        })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const newSize = fs.statSync(outputPath).size;
      const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`✅ ${image.input} → ${image.output}`);
      console.log(`   Size: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(newSize / 1024 / 1024).toFixed(1)}MB (${reduction}% reduction)\n`);

    } catch (error) {
      console.error(`❌ Error converting ${image.input}:`, error.message);
    }
  }

  console.log('🎉 WebP conversion complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Update your code to use .webp files');
  console.log('2. Keep original files as fallbacks');
  console.log('3. Test the website performance');
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