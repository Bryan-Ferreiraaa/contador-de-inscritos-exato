let urlParams = new URLSearchParams(window.location.search)
let chanURL = urlParams.get('sharedText')

try {
	const chURL = new URL(chanURL)
	if (chURL.href.includes('youtube.com/channel/') || // ID
		chURL.href.includes('youtube.com/c/') || // Custom URL
		chURL.href.includes('youtube.com/user/') || // User
		chURL.href.includes('youtube.com/')) { // Custom URL

		const chunks = chURL.pathname.split('/')
		let urlType, channelInfo, findBy
		if (chunks.length != 2) {
			urlType = chunks[1]
			channelInfo = chunks[2]
		} else {
			if (['watch', 'playlist'].includes(chunks[1])) throw ''
			urlType = 'c'
			channelInfo = chunks[1]
		}

		switch (urlType) {
			case 'channel': findBy = 'id'; break // ID
			case 'user': findBy = 'username'; break // User
			case 'c': findBy = 'name'; break // Custom URL
		}

		let mkCounter = new URLSearchParams()
		mkCounter.set('findChan', channelInfo)
		mkCounter.set('findBy', findBy)

		if (window.innerWidth <= 768) {
			mkCounter.set('thumbSize', '150')
			mkCounter.set('nameSize', '30')
			mkCounter.set('counterSize', '50')
			mkCounter.set('counterMargin', '30')
		}

		window.location.href = `counter.html?${mkCounter.toString()}`
	} else { throw '' }
} catch (err) { showError('A URL solicitada não é válida', 'A URL que você compartilhou não pertence a um canal do YouTube') }

function showError(text, details) {
	$('#loadingMessage').text(text).addClass('text-danger').click(() => {
		alert(details)
	})
	$('#loadingSpinner').addClass('hidden')
	$('#loadingError').removeClass('hidden')
}
