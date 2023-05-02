(function () {
	const controlWidth = 0.133;
	const labelWidth = 0.1;

	const vein = exports.vein;

	const drawLabel = function (text) {
		vein.setNextWidgetWidth(labelWidth);
		vein.label(text);
	};

	let checked = false;
	let isDarkMode = true;
	let floatValue = 0;
	let textValue = '';

	let windowPos = { x: 0.5, y: 0.5 };
	let isWindowOpened = false;

	const showVeinDemo = async function (windowTick) {
		if (!isWindowOpened) {
			clearTick(windowTick);
			return;
		}

		vein.beginWindow(windowPos);

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
		drawLabel('Dummy');

		vein.dummy(controlWidth, 0.059);
		vein.endRow();

		vein.beginRow();
		drawLabel('Label');

		vein.setNextTextEntry('STRING', 'Welcome to Vein');
		vein.label();
		vein.endRow();

		vein.beginRow();
		drawLabel('ProgressBar');

		vein.progressBar(0, floatValue, 1, controlWidth);
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
		if (vein.spriteButton('mphud', 'spectating', 'Toggle Color Theme')) {
			isDarkMode = !isDarkMode;
			if (isDarkMode) vein.setDarkColorTheme();
			else vein.setLightColorTheme();
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
