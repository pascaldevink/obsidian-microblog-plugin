import { MicroBlogFrontMatter } from "./types";

export function toStringFrontMatter(frontMatter: MicroBlogFrontMatter): string {
    const frontMatterString = Object.entries(frontMatter)
      .filter(([key]) => key !== 'position')
      .map(([key, value]) => `${key}: ${value ?? ''}`)
      .join('\n');
    return `---\n${frontMatterString}\n---`;
  }
  
  export function addFrontMatter(
    oldFrontMatter: MicroBlogFrontMatter,
    {
        previewUrl,
        publishedUrl,
    }: Partial<Pick<MicroBlogFrontMatter, 'previewUrl' | 'publishedUrl'>>,
  ): MicroBlogFrontMatter {
    const newFrontMatter = Object.assign({}, oldFrontMatter);
  
    const frontMatterKeysForMicroBlog = ['previewUrl', 'publishedUrl'];
    frontMatterKeysForMicroBlog.forEach(key => {
      if (!newFrontMatter.hasOwnProperty(key)) {
        newFrontMatter[key] = '';
      }
    });
  
    newFrontMatter.previewUrl = previewUrl;
    newFrontMatter.publishedUrl = publishedUrl;
    
    return newFrontMatter;
  }