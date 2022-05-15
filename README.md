# Obsidian Micro.blog publishing Plugin

Publish directly to Micro.blog from Obsidian.

## Instructions

- From the plugin settings page, add your app token
- Use the "Publish to Micro.blog" command to upload the current page to Micro.blog

## Plugin Options

- In the front matter you can specify the status for your post: `draft` or `published`

### Example Front Matter:

```yml
---
status: draft
---
```

### Commenting

Text surrounded by HTML comment tags (see below), will be ignored and not published to Micro.blog. Handy if there are bits you want to exclude from Micro.blog but keep in the same Obsidian markdown file.

```plaintext
<!--
This is a multi-line
comment, cool!
-->
```

```plaintext
<!-- This is an in-line comment. -->
```
