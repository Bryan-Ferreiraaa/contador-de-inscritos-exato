if (new URLSearchParams(window.location.search).get('pwa') !== null) {
	$('form').removeAttr('target')
}

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js')

	window.addEventListener('beforeinstallprompt', e => {
		if (localStorage.getItem('installPrompt')) {
			e.preventDefault()
		} else {
			localStorage.setItem('installPrompt', 'true')
		}
	})
}

if (localStorage.getItem('newSubCounterDismiss') != 'true')
	$('.newSubCounter').removeClass('hidden')

$('.newSubCounterClose').click(() => localStorage.setItem('newSubCounterDismiss', 'true'))

const presets = {
	'desktop': {
		checks: ['#bgTypeChanThumb', '#thumbPositionTop', '#thumbRadiusCircle'],
		values: {
			'#bgURL': '',
			'#bgColor': '#000000',
			'#bgOpacity': '50',
			'#bgBlur': '15',
			'#vignette': '0',
			'#thumbSize': '200',
			'#thumbMargin': '10',
			'#nameSize': '50',
			'#nameFont': '',
			'#nameColor': '#ffffff',
			'#counterSize': '120',
			'#counterFont': '',
			'#counterMargin': '100',
			'#counterColor': '#ffffff'
		}
	},

	'mobile': {
		checks: ['#bgTypeChanThumb', '#thumbPositionTop', '#thumbRadiusCircle'],
		values: {
			'#bgURL': '',
			'#bgColor': '#000000',
			'#bgOpacity': '50',
			'#bgBlur': '15',
			'#vignette': '0',
			'#thumbSize': '150',
			'#thumbMargin': '10',
			'#nameSize': '30',
			'#nameFont': '',
			'#nameColor': '#ffffff',
			'#counterSize': '50',
			'#counterFont': '',
			'#counterMargin': '30',
			'#counterColor': '#ffffff'
		}
	}
}

$(window).scroll(() => {
	if ($(window).scrollTop() > $('#startCounter').offset().top + $('#startCounter').outerHeight()) {
		$('#floatingStart').fadeIn()
	} else {
		$('#floatingStart').fadeOut()
	}
})

$('#findChan').on('paste keyup', function () {
	try {
		let chURL = new URL($(this).val())
		if (chURL.href.includes('youtube.com/channel/') || // ID
			chURL.href.includes('youtube.com/c/') || // Custom URL
			chURL.href.includes('youtube.com/user/') || // User
			chURL.href.includes('youtube.com/')) { // Custom URL

			const chunks = chURL.pathname.split('/')
			let urlType, channelInfo
			if (chunks.length != 2) {
				urlType = chunks[1]
				channelInfo = chunks[2]
			} else {
				if (['watch', 'playlist'].includes(chunks[1])) throw ''
				urlType = 'c'
				channelInfo = chunks[1]
			}

			switch (urlType) {
				case 'channel': $('#findByID').prop('checked', true); break // ID
				case 'user': $('#findByUsername').prop('checked', true); break // User
				case 'c': $('#findByName').prop('checked', true); break // Custom URL
			}

			$(this).val(channelInfo)
		} else { throw '' }
	} catch { }
})

$(document).ready(updateInputValues)

function updateInputValues() {
	$('.custom-range').each(function () {
		const value = $(this).val()
		$(this).closest('.input').find('.inputValue').text(value)
	})
}

$('.custom-range').on('change mousemove', function () {
	const value = $(this).val()
	$(this).closest('.input').find('.inputValue').text(value)
})

function applyPreset(presetName, skipConfirm = false) {
	const preset = presets[presetName]
	if (skipConfirm || confirm('AVISO: Se você aplicar este preset, todas as suas personalizações serão perdidas. Continuar?')) {
		preset.checks.forEach(id => $(id).prop('checked', true))
		for (id in preset.values) {
			$(id).val(preset.values[id])
		}
		updateInputValues()
	}
}

if (window.innerWidth <= 768) {
	applyPreset('mobile', true)
}
