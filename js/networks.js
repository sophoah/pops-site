soph
#5873
POPS

JB273 — Yesterday at 20:13
Guys, will the URI still be https://pops.one/ for our site?
P-OPS Team Verified Validator
The ONE place for staking as a service

And when is the planned cutover?
Can i do anything else? checking testing ?
I have my community giveaway tweet this afternoon and will add this:
P-OPS Team is rebranding, soon we will launch our new website too!
To create more awareness the P-OPS Team will also launch a giveaway soon, please follow us @pops-team1

haha... this tag sucks... it just strips of the 1
But anyway this is for Twitter...
yelllowsin - POPS — Yesterday at 21:05
yep, domain should remain the same, also the URI
i think what is missing is the API integration and of course test the contact form, but this last one should be ok (tested already, just a matter of setting up before it goes live)
mindstyle — Yesterday at 21:47
yeah just api integration, the rest is done
JB273 — Yesterday at 22:31
Do we plan this for today/tomorrow?
soph — Yesterday at 22:43
for the URI yeah should be the same
for that we'll have to update the github with the latest code
zarkomann — Yesterday at 23:38
I will send you files with API integration done soon, just need to do some final steps
JB273 — Today at 00:01
Nice, we can't wait... Did you checked already..?
zarkomann — Today at 00:43
I tested here on my server with test api @soph sent me and it works:
http://popsone.clean10.mycpanel.rs/
P-OPS Team | Decentralizing the Future
Decentralizing the Future
here are the files
Attachment file type: archive
pops-api-done.zip
2.30 MB
you should only replace the fetch url with the original one in networks.js file
let me know how it works when you put it on your server
and also, I think there is some mistake in the api for Avalanche network. Validator name and address are the same
yelllowsin - POPS — Today at 00:54
hey @zarkomann nice, checking here
one issue i found though, the copy address is not working?
when i click on it it says copied, but cant paste
zarkomann — Today at 00:55
hmm, let me check that out
yelllowsin - POPS — Today at 01:08
thats ok, we didnt set validator names on avalanche yet :slight_smile:
zarkomann — Today at 01:50
ok, here is the code with fixed copy function
Attachment file type: archive
pops-done.zip
2.30 MB
yelllowsin - POPS — Today at 02:10
cool, working for me
i dont have anything left to change, will let others check it as well
JB273 — Today at 02:55
Did you load it on our server?
mindstyle — Today at 03:02
ah  yes, theres no names there so ive just put the node id both times :slight_smile:
ill wait for soph to merge with our site and test, if all ok we can launch it tomorrow!
zarkomann — Today at 03:02
great, let me know how it goes
zarkomann — Today at 06:01
small change in /js/networks.js file
const idToItemMap = {}

function populateDomFromAPI(){
	fetch('http://api.data.pops.one:81/networks')
	.then(response => response.json())
	.then((jsonResponse) => {
Expand
networks.js
4 KB
for making stake now links open in new tab
soph — Today at 18:11
hey guys, let me look at this
﻿
const idToItemMap = {}

function populateDomFromAPI(){
	fetch('http://api.data.pops.one:81/networks')
	.then(response => response.json())
	.then((jsonResponse) => {
		for (const index in jsonResponse) {
			const item = jsonResponse[index]
			idToItemMap[item.ID] = item;
		}
		console.log(idToItemMap);
		fillTiles();		
	});
	
}

function fillTiles() {
	console.log('fill Tiles')
	for (let key in idToItemMap) {
		console.log('item =',idToItemMap[key]);
		fillTile(idToItemMap[key].ID);
	}
}

function fillTile(id) {
	const data = idToItemMap[id];

	// apy comission price total delegation
	const element_apy = document.getElementById(`${id}_apy`);
	if (element_apy !== undefined) {
		element_apy.innerHTML = `${data.APY}%`;
	}
	const element_comission = document.getElementById(`${id}_comission`);
	if (element_comission !== undefined) {
		element_comission.innerHTML = `${data.Fees}%`;
	}
	const element_price = document.getElementById(`${id}_price`);
	if (element_price !== undefined) {
		element_price.innerHTML = `${data.price}$`;
	}
	const element_total_delegation = document.getElementById(`${id}_total_delegation`);
	if (element_total_delegation !== undefined) {
		element_total_delegation.innerHTML = `${data.Total_delegation}`;
	}

	// website and project documentation
	const element_links = document.getElementById(`${id}_links`)
	if (element_links !== undefined) {
		element_links.appendChild(createLink(data.Project_website, data.Project_website, 'website-link'))
		for (url of data.Project_documentations) {
			element_links.appendChild(createLink('Project documentation', url, 'doc-link'));	
		}
	}

	

	// validators
	const element_validators = document.getElementById(`${id}_validators`)
	if (element_validators !== undefined) {
		element_validators.appendChild(createLink(data.Project_website, data.Project_website, 'website-link'))
		let htmlString = '';
		for (validator of data.Validators) {
			htmlString = htmlString.concat(`<div class="validator-row">
											<div class="validator-name">
												<p>${validator.Name}</p>
											</div>
											<div class="validator-links">
												<button class="address-btn" hiddenValueToCopy="${validator.Address}" onClick="copyToClipboard(this)">Copy Address</button>
												<a class="stake-btn" target="_blank" href="${validator.Stake_link}">Stake Now</a>
											</div>
										</div>`);
			element_validators.appendChild(createLink('Project documentation', url, 'doc-link'));	
		}
		element_validators.innerHTML = htmlString;
	}
}

function copyToClipboard(element) {
  const copyText = element.getAttribute('hiddenValueToCopy');
  const el = document.createElement('textarea');
  el.value = copyText;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert("Copied address: " + copyText);
}

function createLink(text, link, className) {
	let a = document.createElement('a');
	let linkText = document.createTextNode(text);
	a.appendChild(linkText);
	a.title = text;
	a.href = link;
	a.setAttribute('target', '_blank');
	a.setAttribute('class', className);
	return a;
}