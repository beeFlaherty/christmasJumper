function link(handlebars) {
	handlebars.registerHelper('link', (href, text) => {
		const url = href || '#';
		const title = text || url;
		return new handlebars.SafeString(
			`<a href="${url}" title="${title}">${title}</a>`
		);
	});
}

module.exports = link;
