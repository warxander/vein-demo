/* Item constants */
const II_STYLE = {
	sprite: { w: 0.05, h: 0.044 },
	padding: { x: 0.005, y: 0.005 },
	label: { h: 0.035 }
};

const II_SIZE = {
	w: II_STYLE.sprite.w + II_STYLE.padding.x * 2,
	h: II_STYLE.sprite.h + II_STYLE.label.h + II_STYLE.padding.y * 2
};

/* For default style */
function getInventoryItemSheetStyle() {
	return `inventory-item {
		background-color: #242730;
		color: #FFFFF0;
		font-family: 0;
		font-size: 0.25em;
	}

	inventory-item:hover {
		background-color: #F21951;
	}`;
}

function inventoryItem(text, spriteDict, spriteName, weaponHash) {
	/* Get currently processing frame (window) */
	const frame = exports.vein.getFrame();

	/* 1. Decide item size and begin it */
	frame.beginItem(II_SIZE.w, II_SIZE.h);

	/* 2. Process user input */
	const isClicked = frame.isItemClicked();
	if (isClicked) GiveWeaponToPed(PlayerPedId(), weaponHash, 9999, false, true);

	/* 3. Draw item */

	/* Declare selector by considering user-defined styleId and item state */
	const selector = frame.buildStyleSelector('inventory-item', frame.isItemHovered() ? 'hover' : null);

	const p = frame.getPainter();

	/* Background */
	const backgroundColor = frame.getStyleProperty(selector, 'background-color');
	p.setColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);
	p.drawRect(II_SIZE.w, II_SIZE.h);

	/* Sprite */
	p.move(II_STYLE.padding.x, II_STYLE.padding.y);
	p.setColor(254, 254, 254, 255);
	p.drawSprite(spriteDict, spriteName, II_STYLE.sprite.w, II_STYLE.sprite.h);
	p.move(-II_STYLE.padding.x, -II_STYLE.padding.y);

	/* Text */
	const font = frame.getStyleProperty(selector, 'font-family');
	const scale = frame.getStyleProperty(selector, 'font-size');

	p.move(
		(II_SIZE.w - p.getTextWidth(text, font, scale)) / 2,
		II_STYLE.sprite.h + II_STYLE.label.h / 2 + II_STYLE.padding.y
	);

	const color = frame.getStyleProperty(selector, 'color');
	p.setColor(color[0], color[1], color[2], color[3]);
	p.drawText(text, font, scale);

	/* 4. End item */
	frame.endItem();

	/* 5. Return everything you need */
	return isClicked;
}
