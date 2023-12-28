(function () {
	const controlWidth = 0.133;
	const labelWidth = 0.1;

	const drawLabel = function (text) {
		vein.setNextItemWidth(labelWidth);
		vein.label(text);
	};

	let vein = null;
	let holoStyleSheet = null;

	let isDemoOpened = false;

	let itemsFrameState = {};
	let optionsFrameState = {};

	async function showItemsFrame() {
		if (!itemsFrameState.selectables) itemsFrameState.selectables = [false, false, false];
		if (!itemsFrameState.floatValue) itemsFrameState.floatValue = 0;
		if (!itemsFrameState.textValue) itemsFrameState.textValue = '';

		if (!itemsFrameState.positionInitialized && itemsFrameState.rect) {
			vein.setNextFramePosition(0.5 - itemsFrameState.rect.w / 2, 0.5 - itemsFrameState.rect.h / 2);
			itemsFrameState.positionInitialized = true;
		}

		vein.setNextFrameSpacing(itemsFrameState.horizontalSpacing, itemsFrameState.verticalSpacing);
		vein.setNextFrameScale(itemsFrameState.scale);
		if (itemsFrameState.disableBackground) vein.setNextFrameDisableBackground();
		if (itemsFrameState.disableBorder) vein.setNextFrameDisableBorder();
		if (itemsFrameState.disableInput) vein.setNextFrameDisableInput();
		if (itemsFrameState.disableMove) vein.setNextFrameDisableMove();

		if (itemsFrameState.scheduleStyleChange) {
			itemsFrameState.isHoloStyle = !itemsFrameState.isHoloStyle;

			if (!itemsFrameState.isHoloStyle) {
				vein.resetStyle();
				vein.addStyleSheet(getInventoryItemSheetStyle());
			} else vein.addStyleSheet(holoStyleSheet);

			itemsFrameState.scheduleStyleChange = false;
		}

		vein.beginFrame('veinItems');

		vein.heading('Heading');

		vein.beginRow();
		vein.pushItemWidth(labelWidth);
		vein.label('Button');
		vein.popItemWidth();

		if (itemsFrameState.disableItems) vein.setNextItemDisabled();
		if (vein.button('Click Me')) itemsFrameState.isChecked = !itemsFrameState.isChecked;
		vein.endRow();

		vein.beginRow();
		drawLabel('CheckBox');

		if (itemsFrameState.disableItems) vein.setNextItemDisabled();
		itemsFrameState.isChecked = vein.checkBox(itemsFrameState.isChecked, 'Secret Mode');
		vein.endRow();

		vein.beginRow();
		drawLabel('Custom Item');

		RequestStreamedTextureDict('mpweaponscommon_small');
		if (itemsFrameState.disableItems) vein.setNextItemDisabled();
		if (inventoryItem('Assault SMG', 'mpweaponscommon_small', 'w_sb_assaultsmg', GetHashKey('weapon_assaultsmg'))) {
			BeginTextCommandThefeedPost('STRING');
			AddTextComponentString('Assault SMG');
			EndTextCommandThefeedPostTicker(true, true);
		}
		vein.endRow();

		vein.beginRow();
		drawLabel('Dummy');

		vein.dummy(controlWidth, 0.035);
		vein.endRow();

		vein.beginRow();
		drawLabel('Hyperlink');

		if (itemsFrameState.disableItems) vein.setNextItemDisabled();
		vein.hyperlink('https://fivem.net/');
		vein.endRow();

		vein.beginRow();
		drawLabel('Label');

		vein.label('Welcome to Vein');
		vein.endRow();

		vein.beginRow();
		drawLabel('ProgressBar');

		vein.progressBar(itemsFrameState.floatValue, controlWidth);
		vein.endRow();

		vein.beginRow();
		drawLabel('Selectable');

		for (let i = 0; i < itemsFrameState.selectables.length; ++i) {
			if (itemsFrameState.disableItems) vein.setNextItemDisabled();
			itemsFrameState.selectables[i] = vein.selectable(itemsFrameState.selectables[i], `Item ${i}`);
		}
		vein.endRow();

		vein.beginRow();
		drawLabel('Separator');

		vein.separator(controlWidth);
		vein.endRow();

		vein.beginRow();
		drawLabel('Slider');

		if (itemsFrameState.disableItems) vein.setNextItemDisabled();
		itemsFrameState.floatValue = vein.slider(itemsFrameState.floatValue, 0, 1, controlWidth);
		vein.endRow();

		vein.beginRow();
		drawLabel('Sprite');

		RequestStreamedTextureDict('shopui_title_barber3');
		vein.sprite('shopui_title_barber3', 'shopui_title_barber3', controlWidth, 0.059);
		vein.endRow();

		vein.beginRow();
		drawLabel('SpriteButton');

		RequestStreamedTextureDict('mphud');
		if (itemsFrameState.disableItems) vein.setNextItemDisabled();
		if (
			vein.spriteButton(
				itemsFrameState.isHoloStyle ? 'holo' : 'mphud',
				itemsFrameState.isHoloStyle ? 'light' : 'spectating',
				'Toggle Style'
			)
		)
			itemsFrameState.scheduleStyleChange = true;
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

		if (itemsFrameState.disableItems) vein.setNextItemDisabled();
		itemsFrameState.textValue = await vein.textEdit(
			itemsFrameState.textValue,
			'Editing text',
			12,
			itemsFrameState.isChecked,
			'Search...'
		);
		vein.endRow();

		itemsFrameState.rect = vein.endFrame();
	}

	function showOptionsFrame() {
		if (!itemsFrameState.horizontalSpacing) itemsFrameState.horizontalSpacing = 0.005;
		if (!itemsFrameState.verticalSpacing) itemsFrameState.verticalSpacing = 0.01;
		if (!itemsFrameState.scale) itemsFrameState.scale = 1.0;

		if (!optionsFrameState.alreadyShown) {
			vein.setNextFramePosition(0.65, 0.15);
			optionsFrameState.alreadyShown = true;
		}

		vein.beginFrame('veinOptions');

		const isDebugEnabled = vein.isDebugEnabled();
		if (vein.checkBox(isDebugEnabled, 'Toggle Debug') !== isDebugEnabled) vein.setDebugEnabled(!isDebugEnabled);

		optionsFrameState.frameOptionsOpened = vein.collapsingHeader(
			optionsFrameState.frameOptionsOpened,
			'Frame Options'
		);
		if (optionsFrameState.frameOptionsOpened) {
			RequestStreamedTextureDict('mpleaderboard');

			vein.beginRow();
			vein.label('Horizontal Spacing');
			itemsFrameState.horizontalSpacing = vein.slider(
				itemsFrameState.horizontalSpacing,
				0,
				0.01,
				0.1,
				itemsFrameState.horizontalSpacing.toFixed(3)
			);
			if (vein.spriteButton('mpleaderboard', 'leaderboard_lap_icon')) itemsFrameState.horizontalSpacing = null;
			vein.endRow();

			vein.beginRow();
			vein.label('Vertical Spacing');
			itemsFrameState.verticalSpacing = vein.slider(
				itemsFrameState.verticalSpacing,
				0,
				0.05,
				0.1,
				itemsFrameState.verticalSpacing.toFixed(3)
			);
			if (vein.spriteButton('mpleaderboard', 'leaderboard_lap_icon')) itemsFrameState.verticalSpacing = null;
			vein.endRow();

			vein.beginRow();
			vein.label('Scale');
			itemsFrameState.scale = vein.slider(itemsFrameState.scale, 0.7, 1.3, 0.1);
			if (vein.spriteButton('mpleaderboard', 'leaderboard_lap_icon')) itemsFrameState.scale = null;
			vein.endRow();

			itemsFrameState.disableBackground = vein.checkBox(itemsFrameState.disableBackground, 'Disable Background');
			itemsFrameState.disableBorder = vein.checkBox(itemsFrameState.disableBorder, 'Disable Border');
			itemsFrameState.disableInput = vein.checkBox(itemsFrameState.disableInput, 'Disable Input');
			itemsFrameState.disableMove = vein.checkBox(itemsFrameState.disableMove, 'Disable Move');
			itemsFrameState.disableItems = vein.checkBox(itemsFrameState.disableItems, 'Disable Items');
		}

		vein.endFrame();
	}

	on('onClientResourceStart', function (resourceName) {
		if (resourceName != GetCurrentResourceName()) return;

		vein = exports.vein;

		const txd = CreateRuntimeTxd('holo');
		CreateRuntimeTextureFromImage(txd, 'button', 'holo/button.png');
		CreateRuntimeTextureFromImage(txd, 'button_hover', 'holo/button_hover.png');
		CreateRuntimeTextureFromImage(txd, 'light', 'holo/light.png');
		CreateRuntimeTextureFromImage(txd, 'frame_bg', 'holo/frame_bg.png');
		RequestStreamedTextureDict('holo');

		const fontFileName = 'roboto';
		RegisterFontFile(fontFileName);
		const fontId = RegisterFontId(fontFileName);

		// TODO: Redefine all selectors and states
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
			accent-color: rgba(255, 255, 240, 1.0);
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(255, 255, 240, 1.0);
			font-family: ${fontId};
		}

		slider:hover {
			accent-color: rgba(2, 214, 171, 1.0);
			background-color: rgba(45, 49, 50, 1.0);
		}

		text-edit:hover {
			background-color: rgba(45, 49, 50, 1.0);
			color: rgba(2, 214, 171, 1.0);
		}`;

		vein.addStyleSheet(getInventoryItemSheetStyle());

		RegisterCommand('veinDemo', function () {
			isDemoOpened = !isDemoOpened;
			if (isDemoOpened) {
				const frameTick = setTick(async function () {
					if (!isDemoOpened) {
						clearTick(frameTick);
						itemsFrameState = {};
						optionsFrameState = {};
						return;
					}

					showOptionsFrame();
					await showItemsFrame();
				});
			}
		});
	});
})();
