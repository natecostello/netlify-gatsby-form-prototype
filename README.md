This is a template repository for a development container for Gatsby developing.

When you run `gatsby new`, gatsby will clone a repo, so the directory for the new project is one level down and has its own git database.  To make everything propery structured, directory-wise and git-wise, do the following:
1. When you create your repo from template, name it [gatsby-project-name]
2. Run: ```gatsby [gatsby-project-name] [starter url]```

3. Run: `cp -R [gatsby-project-name]/* [gatsby-project-name]/.* .`
4. Run `rm -rf [gatsby-project-name]/`

Now everything should be in the proper place relative to normal gatsby developent and use of git.  Hope that makes sense.
