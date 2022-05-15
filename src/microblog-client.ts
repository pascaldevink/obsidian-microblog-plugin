import { App, MarkdownView, Notice } from "obsidian";
import MicroBlogPlugin from "./main";
import { MicroBlogFrontMatter } from "./types";

export class MicroBlogClient {
    constructor(
        private readonly app: App,
        private readonly plugin: MicroBlogPlugin,
      ) {
        
      }

    async publishPost() {
        console.log('publishing to micro.blog');

        const { workspace } = this.app;
        const activeView = workspace.getActiveViewOfType(MarkdownView);
        if (activeView) {
            try {
                const fileContent = await this.app.vault.cachedRead(activeView.file);
                const frontMatter = this.app.metadataCache.getFileCache(activeView.file)?.frontmatter as MicroBlogFrontMatter;

                if (!frontMatter) {
                    new Notice('Please write frontmatter.');
                    return;
                }

                console.log(frontMatter?.status);
                console.log(this.app.metadataCache.getFileCache(activeView.file)?.headings);
                console.log(this.app.metadataCache.getFileCache(activeView.file)?.tags);
                console.log(activeView.file.name);
            } catch (ex: any) {
                console.warn(ex);
                new Notice(ex.toString());
            }
        } else {
          new Notice('There is no editor found. Nothing will be published.');
        }
    }
}
