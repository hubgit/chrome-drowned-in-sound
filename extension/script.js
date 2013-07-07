// wishlist: hAudio or RDFa markup

findItems({
	item: ".review",
	artist: "h4 a b",
	title: "h4 a i",
})

function findItems(selector) {
	var nodes = document.querySelectorAll(selector.item);

	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];

		var artist = node.querySelectorAll(selector.artist).item(0).textContent.trim();
		var title = node.querySelectorAll(selector.title).item(0).textContent.trim();

		addSpotifyAlbumEmbed(node.appendChild(document.createElement("div")), artist, title);
	}
}

function findSpotifyAlbum(artist, title, callback) {
	var query = 'artist:"' + artist + '" album:"' + title + '"';
	var url = "http://ws.spotify.com/search/1/album.json?q=" + encodeURIComponent(query);

	var xhr = new XMLHttpRequest;
	xhr.open("GET", url, true);

	xhr.onload = function() {
		var data = JSON.parse(this.responseText);

		if (data.albums && data.albums.length) {
			callback(data.albums[0].href);
		}
	};

	xhr.send();
}

function addSpotifyAlbumEmbed(node, artist, title) {
	findSpotifyAlbum(artist, title, function(uri) {
		var container = document.createElement("iframe");
		container.src = "https://embed.spotify.com/?uri=" + uri;
		container.setAttribute("width", 300);
		container.setAttribute("height", 380);
		container.setAttribute("frameborder", 0);
		container.setAttribute("allowtransparency", "true");
		container.style.marginTop = "30px";

		node.appendChild(container);
	});
}
