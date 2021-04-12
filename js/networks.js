const idToItemMap = {}

function populateDomFromAPI(){
	fetch('https://api.data.pops.one/networks')
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