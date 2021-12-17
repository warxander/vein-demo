local controlWidth = 0.13
local labelWidth = 0.1

local vein = exports.vein

local function drawLabel(text)
	vein:pushWidgetWidth(labelWidth)
	vein:label(text)
	vein:popWidgetWidth()
end

local function showVeinDemo()
	local checked = false
	local isDarkMode = true
	local floatValue = 0.
	local textValue = ''

	local windowX
	local windowY

	while true do
		Citizen.Wait(0)

		vein:beginWindow(windowX, windowY)

		vein:heading('Heading')

		vein:beginRow()
			drawLabel('Button')

			if vein:button('Toggle Debug') then
				vein:setDebugEnabled(not vein:isDebugEnabled())
			end
		vein:endRow()

		vein:beginRow()
			drawLabel('CheckBox')

			checked = vein:checkBox(checked, 'Secret Mode')
		vein:endRow()

		vein:beginRow()
			drawLabel('Dummy')

			vein:dummy(controlWidth, 0.059)
		vein:endRow()

		vein:beginRow()
			drawLabel('Label')

			vein:pushTextEntry('STRING', 'Welcome to Vein')
			vein:label()
			vein:popTextEntry()
		vein:endRow()

		vein:beginRow()
			drawLabel('ProgressBar')

			vein:progressBar(0., floatValue, 1., controlWidth)
		vein:endRow()

		vein:beginRow()
			drawLabel('Separator')

			vein:separator(controlWidth)
		vein:endRow()

		vein:beginRow()
			drawLabel('Slider')

			_, floatValue = vein:slider(0., floatValue, 1., controlWidth)
		vein:endRow()

		vein:beginRow()
			drawLabel('Sprite')

			RequestStreamedTextureDict('shopui_title_barber3')
			vein:sprite('shopui_title_barber3', 'shopui_title_barber3', 0.133, 0.059)
		vein:endRow()

		vein:beginRow()
			drawLabel('SpriteButton')

			RequestStreamedTextureDict('mphud')
			if vein:spriteButton('mphud', 'spectating', 'Toggle Color Theme') then
				isDarkMode = not isDarkMode
				if isDarkMode then
					vein:setDarkColorTheme()
				else
					vein:setLightColorTheme()
				end
			end
		vein:endRow()

		vein:beginRow()
			drawLabel('TextEdit')

			_, textValue = vein:textEdit(textValue, 'Editing text', 12, checked)
		vein:endRow()

		vein:spacing()

		if vein:button('Close') then
			break
		end

		windowX, windowY = vein:endWindow()
	end
end

AddEventHandler('onClientResourceStart', function(resourceName)
	if resourceName ~= GetCurrentResourceName() then
		return
	end

	RegisterCommand('veinDemo', function()
		Citizen.CreateThread(showVeinDemo)
	end)
end)
