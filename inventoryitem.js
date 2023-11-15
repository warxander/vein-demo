const II_GEOMETRY = {
	sprite: { w: 0.05, h: 0.044 },
	padding: { x: 0.005, y: 0.005 },
	label: { h: 0.035 }
};

const II_SIZE = {
	w: II_GEOMETRY.sprite.w + II_GEOMETRY.padding.x * 2,
	h: II_GEOMETRY.sprite.h + II_GEOMETRY.label.h + II_GEOMETRY.padding.y * 2
};

const II_TEXT = {
	font: 0,
	scale: 0.25
};

function inventoryItem(text, spriteDict, spriteName) {
	const ui = exports.vein.getUi();

	ui.beginItem(II_SIZE.w, II_SIZE.h);

	const p = ui.getPainter();

	if (ui.isItemHovered()) p.setColor(245, 5, 81, 255);
	else p.setColor(36, 39, 48, 255);
	p.drawRect(II_SIZE.w, II_SIZE.h);

	p.move(II_GEOMETRY.padding.x, II_GEOMETRY.padding.y);
	p.setColor(254, 254, 254, 255);
	p.drawSprite(spriteDict, spriteName, II_GEOMETRY.sprite.w, II_GEOMETRY.sprite.h);
	p.move(-II_GEOMETRY.padding.x, -II_GEOMETRY.padding.y);

	p.move(
		(II_SIZE.w - p.getTextWidth(text, II_TEXT.font, II_TEXT.scale)) / 2,
		II_GEOMETRY.sprite.h + II_GEOMETRY.label.h / 2 + II_GEOMETRY.padding.y
	);
	p.setColor(255, 255, 240, 255);
	p.drawText(text, II_TEXT.font, II_TEXT.scale);

	ui.endItem();

	return ui.isItemClicked();
}
