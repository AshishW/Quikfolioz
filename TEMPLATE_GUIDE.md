# Adding New Templates to Quikfolioz

This guide explains how to add new portfolio templates to Quikfolioz with dynamic loading capabilities.

## Quick Start

1. **Create a new template directory** in the `templates/` folder
2. **Add your template files** (`index.html`, `thumbnail.png`, etc.)
3. **Run the generator script**: `node generate-templates.js`
4. **Refresh the browser** to see your new template automatically appear!

## Detailed Steps

### 1. Create Template Directory

Create a new directory in the `templates/` folder with a descriptive name:

```bash
mkdir templates/my_awesome_portfolio
```

**Naming Convention:**
- Use lowercase letters
- Separate words with underscores
- Be descriptive but concise
- Examples: `minimal_blog`, `creative_agency`, `developer_showcase`

### 2. Add Required Files

Your template directory should contain:

#### Required Files:
- **`index.html`** - The main template file
- **`thumbnail.png`** - Screenshot of your template (recommended: 1920x1080 or 16:10 aspect ratio)

#### Optional Files:
- **`metadata.json`** - Custom template information (see below)
- **`README.md`** - Template-specific documentation

### 3. Create metadata.json (Optional but recommended)

Add a `metadata.json` file to customize how your template appears in the UI:

```json
{
    "name": "My Awesome Portfolio",
    "description": "A stunning portfolio template with unique animations and modern design.",
    "category": "creative",
    "technologies": ["HTML5", "CSS3", "JavaScript", "GSAP"],
    "features": ["Smooth Animations", "Responsive Design", "Dark Mode", "Portfolio Showcase"]
}
```

#### Metadata Schema:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Display name (auto-generated from folder name if omitted) |
| `description` | string | No | Template description (auto-generated if omitted) |
| `category` | string | No | Category for filtering (default: "modern") |
| `technologies` | array | No | Technologies used (default: ["HTML5", "CSS3", "JavaScript"]) |
| `features` | array | No | Key features of the template |

#### Available Categories:
- `modern` - Contemporary, clean designs
- `creative` - Artistic, unique layouts
- `minimalist` - Simple, minimal designs
- `terminal` - Command-line inspired
- `unique` - Special themes (cyberpunk, retro, etc.)

### 4. Generate Templates JSON

Run the generator script to update the templates list:

```bash
node generate-templates.js
```

This will:
- Scan all template directories
- Load metadata.json files if present
- Generate fallback data for templates without metadata
- Update `templates.json` automatically

### 5. Verify Your Template

1. **Refresh the browser** - Your template should appear automatically
2. **Check the template count** - Should increment by 1
3. **Test filtering** - Ensure your template appears in the correct category
4. **Verify thumbnail** - Should display your screenshot or a placeholder

## Example Template Structure

```
templates/
└── my_awesome_portfolio/
    ├── index.html          # Main template file
    ├── thumbnail.png       # Template screenshot
    ├── metadata.json       # Template metadata
    ├── style.css          # Template styles
    ├── script.js          # Template JavaScript
    └── README.md          # Template documentation
```

## Thumbnail Guidelines

- **Recommended size:** 1920x1080 pixels (16:9) or 1600x1000 pixels (16:10)
- **Format:** PNG (for better quality)
- **Content:** Screenshot of the full template homepage
- **File name:** Must be exactly `thumbnail.png`

## Best Practices

### Template Development:
1. **Make it responsive** - Ensure it works on all device sizes
2. **Optimize performance** - Keep file sizes reasonable
3. **Use semantic HTML** - For better accessibility
4. **Include comments** - Help users understand and customize
5. **Test thoroughly** - Verify all features work correctly

### Metadata:
1. **Be descriptive** - Help users understand what makes your template special
2. **Use accurate categories** - Makes filtering more useful
3. **List key technologies** - Helps developers find relevant templates
4. **Highlight unique features** - What sets your template apart?

### Screenshots:
1. **Show the full page** - Capture the complete homepage
2. **Use good content** - Add realistic placeholder content
3. **High quality** - Clear, crisp images work best
4. **Consistent style** - Match the overall aesthetic

## Troubleshooting

### Template Not Appearing:
1. Check that `index.html` exists in the template directory
2. Verify the generator script ran without errors
3. Refresh the browser (templates.json is cached)
4. Check browser console for any loading errors

### Metadata Not Loading:
1. Verify `metadata.json` is valid JSON (use a JSON validator)
2. Check for typos in field names
3. Ensure the file is in the correct template directory

### Thumbnail Not Showing:
1. Verify the file is named exactly `thumbnail.png`
2. Check file permissions and location
3. Clear browser cache and refresh

## Advanced Usage

### Bulk Template Addition:
When adding multiple templates:

1. Create all template directories
2. Add all required files
3. Run the generator once: `node generate-templates.js`
4. All templates will be added automatically

### CI/CD Integration:
You can integrate the generator into your build process:

```bash
# Add to your build script
npm run build-templates

# Or add to package.json scripts:
"scripts": {
    "build-templates": "node generate-templates.js"
}
```

### Custom Generator:
The generator script can be modified to:
- Support additional metadata fields
- Integrate with external APIs
- Add custom validation
- Generate additional files

## Template Submission Guidelines

If you're contributing templates to the main repository:

1. **Follow the file structure** outlined above
2. **Include comprehensive metadata** with accurate descriptions
3. **Provide high-quality thumbnails** that showcase the template
4. **Test thoroughly** on different devices and browsers
5. **Document any special requirements** in the template's README
6. **Use original content** or properly licensed assets
7. **Ensure responsive design** works on mobile devices

## Support

If you encounter issues or need help:

1. Check this documentation first
2. Look at existing templates for examples
3. Verify your JSON syntax with a validator
4. Check the browser console for error messages
5. Open an issue in the repository if problems persist

---

**Happy template building! 🚀**