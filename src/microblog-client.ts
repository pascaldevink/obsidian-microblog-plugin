import { App, MarkdownView, Notice, requestUrl, RequestUrlParam } from "obsidian";
import { addFrontMatter, toStringFrontMatter } from "./frontmatter";
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
        if (!activeView) {
            new Notice('There is no editor found. Nothing will be published.');
            return;
        }

        try {
            const name = activeView.file.basename
            const fileContent = await this.app.vault.cachedRead(activeView.file);
            const frontMatter = this.app.metadataCache.getFileCache(activeView.file)?.frontmatter as MicroBlogFrontMatter;

            if (!frontMatter) {
                new Notice('Please write frontmatter.');
                return;
            }

            const status = frontMatter?.status
            
            const parsedContent = fileContent
                .slice(frontMatter.position.end.offset)
                .replace(/^<!--.*-->$/ms, '') // remove comments
                .replace(/#[\w/]+/, '') // remove tags
                .trim();

            const request: RequestUrlParam = {
                url: 'https://micro.blog/micropub',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.plugin.settings.appToken,
                },
            };
            request.body = 'h=entry&post-status=' + status + '&name=' + name + '&content=' + parsedContent

            requestUrl(request).then(response => {
                const previewUrl = response.json.preview
                const publishedUrl = response.json.url

                const newFrontMatter = addFrontMatter(frontMatter, {
                    previewUrl: previewUrl,
                    publishedUrl: publishedUrl,
                });

                const frontMatterString = toStringFrontMatter(newFrontMatter);
                const newFileContent = `${frontMatterString}${fileContent.slice(frontMatter.position.end.offset)}`;

                this.app.vault.modify(activeView.file, newFileContent);
            })

        } catch (exception) {
            console.warn(exception);
            new Notice(exception.toString());
        }
    }
}
