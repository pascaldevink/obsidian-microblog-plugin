import { FrontMatterCache } from "obsidian";

export interface MicroBlogFrontMatter extends FrontMatterCache {
  previewUrl?: string;
  publishedUrl?: string[];
  status?: MicroBlogStatus;
}

export interface MicroBlogPluginSettings {
  appToken: string;
}

export enum MicroBlogStatus {
  draft = 'draft',
  published = 'published',  
}