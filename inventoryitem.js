/* Item constants */
const STYLE = {
	sprite: { w: 0.05, h: 0.044 },
	padding: { x: 0.005, y: 0.005 },
	label: { h: 0.035 }
};

const SIZE = {
	w: STYLE.sprite.w + STYLE.padding.x * 2,
	h: STYLE.sprite.h + STYLE.label.h + STYLE.padding.y * 2
};

/* For default style */
function getInventoryItemSheetStyle() {
	return `inventory-item {
		background-color: #242730;
		color: #FFFFF0;
		font-family: 0;
		font-size: 0.25;
	}

	inventory-item:active {
		background-color: #893240;
	}

	inventory-item:disabled {
		color: #4F5259;
	}

	inventory-item:hover {
		background-color: #F21951;
	}`;
}

function inventoryItem(text, spriteDict, spriteName) {
	/* Get currently processing frame (window) */
	const frame = exports.vein.getFrame();
	const style = frame.getStyle();

	/* 1. Decide item size and begin it */
	frame.beginItem(SIZE.w, SIZE.h);

	/* 2. Process user input */
	const isClicked = frame.isItemClicked();

	/* 3. Draw item */

	/* Declare selector by considering user-defined styleId and item state */
	const selector = frame.buildItemStyleSelector(
		'inventory-item',
		frame.isItemDisabled() ? 'disabled' : frame.isItemPressed() ? 'active' : frame.isItemHovered() ? 'hover' : null
	);

	const p = frame.getPainter();

	/* Background */
	const backgroundColor = style.getProperty(selector, 'background-color');
	p.setColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);
	p.drawRect(SIZE.w, SIZE.h);

	/* Sprite */
	p.move(STYLE.padding.x, STYLE.padding.y);
	p.setColor(254, 254, 254, 255);
	p.drawSprite(spriteDict, spriteName, STYLE.sprite.w, STYLE.sprite.h);
	p.move(-STYLE.padding.x, -STYLE.padding.y);

	/* Text */
	const font = style.getProperty(selector, 'font-family');
	const scale = style.getProperty(selector, 'font-size');

	p.move(
		(SIZE.w - p.getTextWidth(text, font, scale)) / 2,
		STYLE.sprite.h + STYLE.label.h / 2 + STYLE.padding.y
	);

	const color = style.getProperty(selector, 'color');
	p.setColor(color[0], color[1], color[2], color[3]);
	p.drawText(text, font, scale);

	/* 4. End item */
	frame.endItem();

	/* 5. Return everything you need */
	return isClicked;
}
