// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var ampm = h >= 12 ? 'PM' : 'AM';
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	var h = h % 12;
	var h = h ? h : 12; // the hour '0' should be '12'

	//---------------------

	var dow = DAYS[today.getDay()]
	var dd = ('0' + today.getDate()).slice(-2)
	var mm = ('0' + (today.getMonth() + 1 )).slice(-2)
	var yy = today.getFullYear()

	document.getElementById('date').innerHTML = dow + ' ' + yy + '-' + mm + '-' + dd

	//---------------------

	document.getElementById('time').innerHTML =
	h + ":" + m + ":" + s + ' ' + ampm;
	var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

var dateElem = document.getElementById('date')

var vpwidth = document.documentElement.clientWidth
var sections = document.querySelectorAll('.box')
function fixSectionHeight() {
	var step = 1
	if (vpwidth >= 480) step = 2;
	if (vpwidth >= 768) step = 4;

	sections.forEach(function (s) {
		s.style.height = 'auto'
	})

	for (var i = 0; i < sections.length; i += step) {
		var ss = Array.prototype.slice.call(sections, i, i + step)
		var hss = ss.map(function (e) { return e.clientHeight })
		var h = Math.max.apply(null, hss)
		ss.forEach(function (s) {
			s.style.height = h + 'px'
		})
	}
}

{/* <section>
	<div class="box">
		<span class="title">Stuff</span>
		<div class="content">
			<a href="https://youtube.com/"><span class="links">yt</span></a>
			<a href="https://youtube.com/feed/subscriptions"><span class="links">yts</span></a>
			<a href="https://mail.google.com"><span class="links">mail</span></a>
		</div>
	</div>
</section> */}


function addLinks(DATA) {
	const main = document.querySelector("main");

	function createSection(linkGroup) {
		const section = document.createElement("section");

		const box = document.createElement("div");
		box.classList.add("box");

		const title = document.createElement("span");
		title.classList.add("title");
		title.innerHTML = linkGroup.category;

		const content = document.createElement('div');
		content.classList.add('content');

		for (let link of linkGroup.links) {
			const anchor = document.createElement('a');
			anchor.setAttribute('href', link.url);

			const anchorSpan = document.createElement('span');
			anchorSpan.classList.add('links');
			anchorSpan.innerHTML = link.name;

			anchor.appendChild(anchorSpan);

			content.appendChild(anchor);
		}

		box.appendChild(title);
		box.appendChild(content)

		section.appendChild(box);

		return section;
	}

	for (let linkGroup of DATA.linkGroups) {
		const section = createSection(linkGroup);

		main.appendChild(section);
	}
}

new CustomStartStorage().get()
    .then(data => {
		addLinks(data);
    });

//fixSectionHeight()
//window.addEventListener('resize', fixSectionHeight)
// @license-end
