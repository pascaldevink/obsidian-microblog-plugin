import { FrontMatterCache } from "obsidian";

export interface MicroBlogFrontMatter extends FrontMatterCache {
  url?: string;
  tags?: string[];
  tag?: string[];
  status?: string;
}

export interface MicroBlogPluginSettings {
  appToken: string;
}
