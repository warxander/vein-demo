(function () {
	const vein = exports.vein;

	const controlWidth = 0.133;
	const labelWidth = 0.1;

	const drawLabel = function (text) {
		vein.setNextItemWidth(labelWidth);
		vein.label(text);
	};

	let holoStyleSheet;

	let checked = false;
	let isHoloStyle = false;
	let floatValue = 0;
	let textValue = '';
	let selectable = [false, false, false];

	let windowPos = {};
	let isWindowOpened = false;

	const showVeinDemo = async function (windowTick) {
		if (!isWindowOpened) {
			clearTick(windowTick);
			return;
		}

		vein.beginWindow(windowPos.x, windowPos.y);

		vein.heading('Heading');

		vein.beginRow();
		drawLabel('Button');

		if (vein.button('Toggle Debug')) vein.setDebugEnabled(!vein.isDebugEnabled());
		vein.endRow();

		vein.beginRow();
		drawLabel('CheckBox');

		checked = vein.checkBox(checked, 'Secret Mode');
		vein.endRow();

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
		if (vein.spriteButton(isHoloStyle ? 'holo' : 'mphud', isHoloStyle ? 'light' : 'spectating', 'Toggle Style')) {
			isHoloStyle = !isHoloStyle;
			if (isHoloStyle) vein.setStyleSheet(holoStyleSheet);
			else vein.useDefaultStyle();
		}
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

		const textEditResult = await vein.textEdit(textValue, 'Editing text', 12, checked);
		textValue = textEditResult.text;
		vein.endRow();

		vein.spacing();

		if (vein.button('Close')) isWindowOpened = false;

		windowPos = vein.endWindow();
	};

	on('onClientResourceStart', function (resourceName) {
		if (resourceName != GetCurrentResourceName()) return;

		const txd = CreateRuntimeTxd('holo');
		CreateRuntimeTextureFromImage(txd, 'button', 'holo/button.png');
		CreateRuntimeTextureFromImage(txd, 'button_hover', 'holo/button_hover.png');
		CreateRuntimeTextureFromImage(txd, 'light', 'holo/light.png');
		CreateRuntimeTextureFromImage(txd, 'window', 'holo/window.png');
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

		check-box {
			background-color: rgba(45, 49, 50, 1.0);
			font-family: ${fontId};
		}

		check-box:hover {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(2, 214, 171, 1.0);
		}

		button:hover, sprite-button:hover {
			background-color: rgba(254, 254, 254, 1.0);
			background-image: url('holo', 'button_hover');
		}

		heading {
			font-family: ${fontId};
		}

		label, text-area {
			color: rgba(255, 255, 240, 1.0);
			font-family: ${fontId};
		}

		progress-bar {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(2, 214, 171, 1.0);
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
		}

		window {
			background-color: rgba(254, 254, 254, 1.0);
			background-image: url('holo', 'window');
		}`;

		RegisterCommand('veinDemo', function () {
			isWindowOpened = !isWindowOpened;
			if (isWindowOpened) {
				const windowTick = setTick(async function () {
					await showVeinDemo(windowTick);
				});
			}
		});
	});
})();
