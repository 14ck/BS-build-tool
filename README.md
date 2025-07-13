# 🛠️ BS Build Tool

> A simple and efficient build tool for copying and renaming HTML files from your dist folder

[![npm version](https://img.shields.io/npm/v/bs-build-tool.svg)](https://www.npmjs.com/package/bs-build-tool)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Overview

BS Build Tool is a lightweight Node.js utility that simplifies the process of copying HTML files from your `dist` directory and organizing them in a separate `bsdist` folder with custom naming to load onto a brightsign player without using the BrightAuthor software. Perfect for build workflows where you need to process built assets for brightsign.

## ✨ Features

- 🚀 **Auto-configuration**: Automatically adds scripts and config to your existing `package.json`
- 📁 **Smart file handling**: Copies files from `dist` to `bsdist` with custom renaming
- ⚙️ **Configurable**: Customize source filename, destination filename, and build commands
- 🔧 **Build integration**: Optional build command execution before file processing
- 🛡️ **Error handling**: Graceful handling of missing files and build failures
- 📦 **Zero dependencies**: Lightweight with no external dependencies

## 🚀 Installation

Install the package in your project:

```bash
npm install bs-build-tool
```

Or use it directly with npx:

```bash
npx bs-build-tool
```

## 📖 Usage

### Basic Usage

After installation, run the tool in your project directory:

```bash
npx bs-build
```

On first run, the tool will automatically:

1. Add a `bs-build` script to your `package.json`
2. Add configuration options to your `package.json`. You MUST include the correct destination file name before running the package.  
3. Copy and rename your file according to the configuration

### Using the Added Script

After the initial setup, you can use the script that was added to your `package.json`:

```bash
npm run bs-build
```

### Command Line Options

Skip the build step entirely:

```bash
npx bs-build --skip-build
# or
npx bs-build -s
```

## ⚙️ Configuration

The tool automatically adds a `config` section to your `package.json`. You can customize these settings:

```json
{
  "config": {
    "filename": "index.html",
    "newfile": "bs",
    "buildCommand": ""
  }
}
```
## 📁 File Structure

The tool works with this file structure:

```text
your-project/
├── dist/
│   └── index.html          # Source file
├── bsdist/                 # Created by the tool
│   └── bs                  # Renamed output file
└── package.json           # Auto-configured
```

## 🔄 Workflow

1. **Build Phase** (optional): Runs the configured build command
2. **Copy Phase**: Copies the specified file from `dist/` folder
3. **Rename Phase**: Renames the file to the configured new filename
4. **Output**: File is available in `bsdist/` folder

## 🚨 Requirements

- Node.js (any recent version)
- An existing `package.json` in your project
- A `dist` folder with the source file

## 🐛 Troubleshooting

### Common Issues

#### "No package.json found"

- Make sure you're running the command in a directory with a `package.json` file

#### "Source file does not exist"

- Check that your `dist` folder contains the specified filename
- Verify the `filename` config matches your actual file

#### "Build command failed"

- The tool will continue with file copying even if the build fails
- Set `buildCommand` to `""` to skip the build step entirely

### Debug Mode

Run with more verbose output:

```bash
DEBUG=* npx bs-build
```

## 📝 Example

Here's a complete example of using bs-build-tool in a Vite project:

```json
{
  "name": "my-project",
  "scripts": {
    "build": "vite build",
    "bs-build": "node node_modules/bs-build-tool/index.js"
  },
  "config": {
    "filename": "index.html",
    "newfile": "production",
    "buildCommand": ""
  }
}
```

Run the tool:

```bash
npm run bs-build
```

Result:

- Copies `dist/index.html` → `bsdist/production`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Jackb

---

Made with ❤️ for the people who have the unfortunate task of designing AV ui's that run on a BrightSign player.
