import { Plugin } from 'obsidian';
import { MicroBlogPluginSettings } from './types';
import { DEFAULT_SETTINGS, MicroBlogSettingTab } from './settings';
import { MicroBlogClient } from './microblog-client';

export default class MicroBlogPlugin extends Plugin {
	settings: MicroBlogPluginSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'obsidian-microblog-publish',
			name: 'Publish to Micro.blog',
			callback: () => {
			  new MicroBlogClient(this.app, this).publishPost();
			},
		  });

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new MicroBlogSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
