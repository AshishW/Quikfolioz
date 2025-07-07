#!/usr/bin/env node

/**
 * Generate templates.json from template directories
 * This script scans the templates directory and generates templates.json automatically
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = './templates';
const OUTPUT_FILE = './templates.json';

// Default metadata for templates that don't have a metadata.json file
const DEFAULT_METADATA = {
    category: 'modern',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    features: ['Responsive Design', 'Modern UI', 'Clean Code']
};

function generateTemplateId(folderName) {
    return folderName.toLowerCase().replace(/[^a-z0-9]/g, '_');
}

function formatTemplateName(folderName) {
    return folderName
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

function generateDescription(name) {
    return `A beautiful and modern ${name.toLowerCase()} template with clean design and responsive layout.`;
}

function scanTemplates() {
    const templates = [];
    
    if (!fs.existsSync(TEMPLATES_DIR)) {
        console.error(`Templates directory ${TEMPLATES_DIR} not found!`);
        process.exit(1);
    }
    
    const templateDirs = fs.readdirSync(TEMPLATES_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .sort();
    
    console.log(`Found ${templateDirs.length} template directories:`);
    
    for (const templateDir of templateDirs) {
        const templatePath = path.join(TEMPLATES_DIR, templateDir);
        const metadataPath = path.join(templatePath, 'metadata.json');
        const thumbnailPath = path.join(templatePath, 'thumbnail.png');
        
        // Check if template has index.html
        const indexPath = path.join(templatePath, 'index.html');
        if (!fs.existsSync(indexPath)) {
            console.warn(`⚠️  Skipping ${templateDir} - no index.html found`);
            continue;
        }
        
        let metadata = { ...DEFAULT_METADATA };
        
        // Load metadata.json if it exists
        if (fs.existsSync(metadataPath)) {
            try {
                const customMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
                metadata = { ...metadata, ...customMetadata };
                console.log(`📋 Loaded metadata for ${templateDir}`);
            } catch (error) {
                console.warn(`⚠️  Invalid metadata.json for ${templateDir}:`, error.message);
            }
        }
        
        // Generate template object
        const template = {
            id: generateTemplateId(templateDir),
            name: metadata.name || formatTemplateName(templateDir),
            description: metadata.description || generateDescription(metadata.name || formatTemplateName(templateDir)),
            category: metadata.category,
            technologies: metadata.technologies,
            features: metadata.features,
            preview: fs.existsSync(thumbnailPath) 
                ? `templates/${templateDir}/thumbnail.png`
                : `https://placehold.co/400x250/6b7280/ffffff?text=${encodeURIComponent(metadata.name || formatTemplateName(templateDir))}`,
            folder: templateDir
        };
        
        templates.push(template);
        console.log(`✅ Added ${template.name}`);
    }
    
    return templates;
}

function main() {
    console.log('🚀 Generating templates.json...\n');
    
    const templates = scanTemplates();
    
    // Write templates.json
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(templates, null, 4));
    
    console.log(`\n✨ Generated ${OUTPUT_FILE} with ${templates.length} templates!`);
    console.log('\nTo use this script:');
    console.log('1. Add new template directories to ./templates/');
    console.log('2. Add metadata.json to template directories (optional)');
    console.log('3. Run: node generate-templates.js');
    console.log('4. Refresh your browser to see new templates!');
}

if (require.main === module) {
    main();
}

module.exports = { scanTemplates, generateTemplateId, formatTemplateName };