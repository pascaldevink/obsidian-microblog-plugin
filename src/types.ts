import { FrontMatterCache } from "obsidian";

export interface MicroBlogFrontMatter extends FrontMatterCache {
  previewUrl?: string;
  publishedUrl?: string[];
  status?: string;
}

export interface MicroBlogPluginSettings {
  appToken: string;
}
