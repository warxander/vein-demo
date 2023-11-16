(function () {
	const vein = exports.vein;

	const controlWidth = 0.133;
	const labelWidth = 0.1;

	const drawLabel = function (text) {
		vein.setNextItemWidth(labelWidth);
		vein.label(text);
	};

	let holoStyleSheet;

	let isChecked = false;
	let isCollapsed = true;
	let isHoloStyle = false;
	let floatValue = 0;
	let textValue = '';
	let selectable = [false, false, false];

	let frameState = {};
	let isFrameOpened = false;

	const showVeinDemo = async function (frameTick) {
		if (!isFrameOpened) {
			clearTick(frameTick);
			frameState = {};
			return;
		}

		if (!frameState.usedAlready && frameState.rect) {
			frameState.rect.x = 0.5 - frameState.rect.w / 2;
			frameState.rect.y = 0.5 - frameState.rect.h / 2;
			frameState.usedAlready = true;
		}

		if (frameState.scheduleStyleChange) {
			isHoloStyle = !isHoloStyle;
			if (!isHoloStyle) {
				vein.resetStyle();
				vein.addStyleSheet(getInventoryItemSheetStyle());
			} else vein.addStyleSheet(holoStyleSheet);
			frameState.scheduleStyleChange = null;
		}

		vein.beginFrame(frameState.rect ? frameState.rect.x : null, frameState.rect ? frameState.rect.y : null);

		vein.heading('Heading');

		vein.beginRow();
		drawLabel('Button');

		if (vein.button('Toggle Debug')) vein.setDebugEnabled(!vein.isDebugEnabled());
		vein.endRow();

		vein.beginRow();
		drawLabel('CheckBox');

		isChecked = vein.checkBox(isChecked, 'Secret Mode');
		vein.endRow();

		vein.beginRow();
		drawLabel('CollapsingHeader');

		isCollapsed = vein.collapsingHeader(isCollapsed, 'Where is the baby?');
		vein.endRow();
		if (!isCollapsed) {
			vein.heading('There he is!');
		}

		vein.beginRow();
		drawLabel('Custom Item');

		RequestStreamedTextureDict('mpweaponscommon_small');
		inventoryItem('Assault SMG', 'mpweaponscommon_small', 'w_sb_assaultsmg');
		vein.endRow();

		vein.beginRow();
		drawLabel('Dummy');

		vein.dummy(controlWidth, 0.059);
		vein.endRow();

		vein.beginRow();
		drawLabel('Hyperlink');

		vein.hyperlink('https://fivem.net/');
		vein.endRow();

		vein.beginRow();
		drawLabel('Label');

		vein.label('Welcome to Vein');
		vein.endRow();

		vein.beginRow();
		drawLabel('ProgressBar');

		vein.progressBar(0, floatValue, 1, controlWidth);
		vein.endRow();

		vein.beginRow();
		drawLabel('Selectable');

		for (let i = 0; i < selectable.length; ++i) selectable[i] = vein.selectable(selectable[i], `Item ${i}`);
		vein.endRow();

		vein.beginRow();
		drawLabel('Separator');

		vein.separator(controlWidth);
		vein.endRow();

		vein.beginRow();
		drawLabel('Slider');

		const sliderResult = vein.slider(0, floatValue, 1, controlWidth);
		floatValue = sliderResult.value;
		vein.endRow();

		vein.beginRow();
		drawLabel('Sprite');

		RequestStreamedTextureDict('shopui_title_barber3');
		vein.sprite('shopui_title_barber3', 'shopui_title_barber3', controlWidth, 0.059);
		vein.endRow();

		vein.beginRow();
		drawLabel('SpriteButton');

		RequestStreamedTextureDict('mphud');
		if (vein.spriteButton(isHoloStyle ? 'holo' : 'mphud', isHoloStyle ? 'light' : 'spectating', 'Toggle Style'))
			frameState.scheduleStyleChange = true;
		vein.endRow();

		vein.beginRow();
		drawLabel('TextArea');

		vein.textArea(
			'FiveM is the original community-driven and source-available GTA V multiplayer modification project.',
			controlWidth
		);
		vein.endRow();

		vein.beginRow();
		drawLabel('TextEdit');

		const textEditResult = await vein.textEdit(textValue, 'Editing text', 12, isChecked);
		textValue = textEditResult.text;
		vein.endRow();

		vein.spacing();

		if (vein.button('Close')) isFrameOpened = false;

		frameState.rect = vein.endFrame();
	};

	on('onClientResourceStart', function (resourceName) {
		if (resourceName != GetCurrentResourceName()) return;

		const txd = CreateRuntimeTxd('holo');
		CreateRuntimeTextureFromImage(txd, 'button', 'holo/button.png');
		CreateRuntimeTextureFromImage(txd, 'button_hover', 'holo/button_hover.png');
		CreateRuntimeTextureFromImage(txd, 'light', 'holo/light.png');
		CreateRuntimeTextureFromImage(txd, 'frame_bg', 'holo/frame_bg.png');
		RequestStreamedTextureDict('holo');

		const fontFileName = 'roboto';
		RegisterFontFile(fontFileName);
		const fontId = RegisterFontId(fontFileName);

		holoStyleSheet = `text-edit {
			background-color: rgba(45, 49, 50, 1.0);
			font-family: ${fontId};
		}

		button, sprite-button {
			background-color: rgba(254, 254, 254, 1.0);
			background-image: url('holo', 'button');
			font-family: ${fontId};
		}

		button:hover, sprite-button:hover {
			background-color: rgba(254, 254, 254, 1.0);
			background-image: url('holo', 'button_hover');
		}

		check-box {
			background-color: rgba(45, 49, 50, 1.0);
			font-family: ${fontId};
		}

		check-box:hover {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(2, 214, 171, 1.0);
		}

		collapsing-header {
			font-family: ${fontId};
		}

		collapsing-header:hover {
			color: rgba(2, 214, 171, 1.0);
		}

		frame {
			background-color: rgba(254, 254, 254, 1.0);
			background-image: url('holo', 'frame_bg');
		}

		heading {
			font-family: ${fontId};
		}

		hyperlink {
			color: rgba(2, 214, 171, 1.0);
			font-family: ${fontId};
		}

		hyperlink:hover {
			color: rgba(22, 253, 206, 1.0);
		}

		inventory-item {
			background-color: rgba(45, 49, 50, 1.0);
			font-family: ${fontId};
		}

		inventory-item:hover {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(2, 214, 171, 1.0);
		}

		label, text-area {
			color: rgba(255, 255, 240, 1.0);
			font-family: ${fontId};
		}

		progress-bar {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(2, 214, 171, 1.0);
		}

		selectable {
			accent-color: rgba(2, 214, 171, 1.0);
			background-color: rgba(0, 0, 0, 0.0);
			font-family: ${fontId};
		}

		selectable:hover {
			background-color: rgba(45, 49, 50, 1.0);
		}

		separator {
			color: rgba(45, 49, 50, 1.0);
		}

		slider {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(255, 255, 240, 1.0);
		}

		slider:hover {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(2, 214, 171, 1.0);
		}

		text-edit:hover {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(2, 214, 171, 1.0);
		}`;

		vein.addStyleSheet(getInventoryItemSheetStyle());

		RegisterCommand('veinDemo', function () {
			isFrameOpened = !isFrameOpened;
			if (isFrameOpened) {
				const frameTick = setTick(async function () {
					await showVeinDemo(frameTick);
				});
			}
		});
	});
})();
