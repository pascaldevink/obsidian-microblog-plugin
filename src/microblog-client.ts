import { App, MarkdownView, Notice, requestUrl, RequestUrlParam } from "obsidian";
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
                .replace(/\#[\w/]+/, '') // remove tags
                .trim();

            const request: RequestUrlParam = {
                url: 'https://micro.blog/micropub',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.plugin.settings.appToken,
                },
            };
            request.body = 'h=entry&post-status=' + status + '&name=' + name + '&content=' + parsedContent

            console.log(request)

            requestUrl(request).then(response => {
                console.log(response)
                console.log(response.json)
                // @todo put publish url in frontmatter
            })

        } catch (ex: any) {
            console.warn(ex);
            new Notice(ex.toString());
        }
    }
}
