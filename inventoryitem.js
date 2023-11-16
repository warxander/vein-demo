const II_GEOMETRY = {
	sprite: { w: 0.05, h: 0.044 },
	padding: { x: 0.005, y: 0.005 },
	label: { h: 0.035 }
};

const II_SIZE = {
	w: II_GEOMETRY.sprite.w + II_GEOMETRY.padding.x * 2,
	h: II_GEOMETRY.sprite.h + II_GEOMETRY.label.h + II_GEOMETRY.padding.y * 2
};

function getInventoryItemSheetStyle() {
	return `inventory-item {
		background-color: #242730;
		color: #FFFFF0;
		font-family: 0;
		font-size: 0.25em;
	}

	inventory-item:hover {
		background-color: #F50551;
	}`;
}

function inventoryItem(text, spriteDict, spriteName) {
	const frame = exports.vein.getFrame();

	frame.beginItem(II_SIZE.w, II_SIZE.h);

	const selector = frame.buildStyleSelector('inventory-item', frame.isItemHovered() ? 'hover' : null);
	const p = frame.getPainter();

	const backgroundColor = frame.getStyleProperty(selector, 'background-color');
	p.setColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);
	p.drawRect(II_SIZE.w, II_SIZE.h);

	p.move(II_GEOMETRY.padding.x, II_GEOMETRY.padding.y);
	p.setColor(254, 254, 254, 255);
	p.drawSprite(spriteDict, spriteName, II_GEOMETRY.sprite.w, II_GEOMETRY.sprite.h);
	p.move(-II_GEOMETRY.padding.x, -II_GEOMETRY.padding.y);

	const font = frame.getStyleProperty(selector, 'font-family');
	const scale = frame.getStyleProperty(selector, 'font-size');

	p.move(
		(II_SIZE.w - p.getTextWidth(text, font, scale)) / 2,
		II_GEOMETRY.sprite.h + II_GEOMETRY.label.h / 2 + II_GEOMETRY.padding.y
	);

	const color = frame.getStyleProperty(selector, 'color');
	p.setColor(color[0], color[1], color[2], color[3]);
	p.drawText(text, font, scale);

	frame.endItem();

	return frame.isItemClicked();
}
