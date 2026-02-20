# Git Repository Setup Guide

Your code has been committed locally! Now follow these steps to push to GitHub:

## Option 1: Create New Repository on GitHub (Recommended)

### Step 1: Create Repository on GitHub
1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `donation-transparency-platform` (or your preferred name)
4. Description: "Full-stack Donation Transparency & Trust Platform with InstantDB"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

### Step 2: Add Remote and Push
After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
cd c:\Users\Lenovo\Desktop\hacathoncse

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

**Example:**
If your GitHub username is `johndoe` and repository name is `donation-platform`:
```bash
git remote add origin https://github.com/johndoe/donation-platform.git
git branch -M main
git push -u origin main
```

## Option 2: Use SSH (If you have SSH keys set up)

```bash
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## Option 3: Quick Push Script

If you already have a repository URL, run:

```bash
# Replace with your actual repository URL
git remote add origin YOUR_REPOSITORY_URL
git branch -M main
git push -u origin main
```

## Troubleshooting

### Authentication Issues
If you get authentication errors:
- Use **Personal Access Token** instead of password
- Generate token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
- Use token as password when pushing

### Branch Name Issues
If you see branch name errors:
```bash
git branch -M main
git push -u origin main
```

### Already Have a Remote?
If you already have a remote configured:
```bash
git remote set-url origin YOUR_NEW_REPOSITORY_URL
git push -u origin main
```

## Current Status

✅ Git repository initialized
✅ All files committed locally
✅ Ready to push to remote

**Next:** Add remote repository and push!
