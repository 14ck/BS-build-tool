#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if package.json exists
let packageJson;
let packageJsonModified = false;

if (fs.existsSync('package.json')) {
    try {
        packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        console.log('Found existing package.json');
        
        // Add bs-build script if it doesn't exist
        if (!packageJson.scripts) {
            packageJson.scripts = {};
        }
        if (!packageJson.scripts['bs-build']) {
            packageJson.scripts['bs-build'] = 'node node_modules/bs-build-tool/index.js';
            packageJsonModified = true;
            console.log('Added bs-build script to package.json');
        }
        
        // Add or update config section
        if (!packageJson.config) {
            packageJson.config = {
                filename: "index.html",
                newfile: "rename-to-SH1<GUID>",
                buildCommand: ""
            };
            packageJsonModified = true;
            console.log('Added config section to package.json');
        } else {
            // Ensure config has the required fields
            if (!packageJson.config.filename) {
                packageJson.config.filename = "index.html";
                packageJsonModified = true;
            }
            if (!packageJson.config.newfile) {
                packageJson.config.newfile = "bs";
                packageJsonModified = true;
            }
            if (!packageJson.config.hasOwnProperty('buildCommand')) {
                packageJson.config.buildCommand = "";
                packageJsonModified = true;
            }
            if (packageJsonModified) {
                console.log('Updated config section in package.json');
            }
        }
        
        // Write back to file if modified
        if (packageJsonModified) {
            fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
        }
        
    } catch (error) {
        console.error('Error reading package.json:', error.message);
        console.error('Cannot proceed without a valid package.json file');
        process.exit(1);
    }
} else {
    console.error('No package.json found in current directory');
    console.error('This tool requires a package.json file to work');
    process.exit(1);
}

const filename = packageJson.config.filename || 'index.html';
const newfile = packageJson.config.newfile || 'bs';
const buildCommand = packageJson.config.buildCommand || '';

// Check for command line arguments to prevent infinite loops
const args = process.argv.slice(2);
const skipBuild = args.includes('--skip-build') || args.includes('-s') || !buildCommand || buildCommand.trim() === '';

const sourceFile = path.join('dist', filename);
const destFolder = 'bsdist';
const destFile = path.join(destFolder, filename);
const destNewFile = path.join(destFolder, newfile)

try {
    // Run the build command if it exists and we're not skipping it
    if (skipBuild) {
        console.log('Skipping build step...');
    }

    // Check if source file exists
    if (!fs.existsSync(sourceFile)) {
        console.error(`Source file ${sourceFile} does not exist`);
        process.exit(1);
    }

    // Create destination folder if it doesn't exist
    if (!fs.existsSync(destFolder)) {
        fs.mkdirSync(destFolder, { recursive: true });
        console.log(`Created folder: ${destFolder}`);
    }

    // Copy the file (will overwrite if it already exists)
    const fileExists = fs.existsSync(destFile);
    fs.copyFileSync(sourceFile, destFile);
    
    if (fileExists) {
        console.log(`File replaced successfully: ${destFile}`);
    } else {
        console.log(`File copied successfully from ${sourceFile} to ${destFile}`);
    }
    fs.renameSync(destFile, destNewFile);
    console.log(`File renamed successfully to ${destNewFile}`);
} catch (error) {
    console.error('Error copying file:', error.message);
    process.exit(1);
}
