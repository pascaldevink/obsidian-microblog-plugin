import { App, PluginSettingTab, Setting } from 'obsidian';
import MicroBlogPlugin from './main';
import { MicroBlogPluginSettings } from './types';

export const DEFAULT_SETTINGS: MicroBlogPluginSettings = {
	appToken: ''
}

export class MicroBlogSettingTab extends PluginSettingTab {
	plugin: MicroBlogPlugin;

	constructor(app: App, plugin: MicroBlogPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for Micro.blog publishing'});

		new Setting(containerEl)
			.setName('App token')
			.setDesc('You can create a new app token at https://micro.blog/account/apps')
			.addText(text => text
				.setPlaceholder('Enter your app token')
				.setValue(this.plugin.settings.appToken)
				.onChange(async (value) => {
					this.plugin.settings.appToken = value;
					await this.plugin.saveSettings();
				}));
	}
}