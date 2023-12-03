window.addEventListener('load', function () {
    let url = window.location.href;
    console.log(url);

    let name = document.querySelectorAll('h1.t-heading')[0].innerHTML.trim();
    let price = document.querySelectorAll('.js-purchase-price')[0].innerHTML;
    let strikePriceElement = document.querySelectorAll('.adi__item-sale-price')[0];
    let strikePrice = strikePriceElement ? strikePriceElement.innerHTML : null;
    let description = document.querySelectorAll('.js-item-description')[0].innerHTML;
    let cover = document.querySelectorAll('.item-preview img')[0].src;
    let tags = document.querySelectorAll('.meta-attributes__attr-tags')[0].textContent.trim();
    let nb_ventes = document.querySelectorAll('.item-header__sales-count strong')[0].innerHTML.replace(',', '');

    // Récupérer le fil d'Ariane (breadcrumbs)
    let breadcrumbs = [];
    document.querySelectorAll('nav.breadcrumbs a').forEach(crumb => {
        breadcrumbs.push({
            text: crumb.textContent,
            href: crumb.getAttribute('href')
        });
    });

    // Sélection de la liste d'éléments
    let featureList = document.querySelectorAll('.t-icon-list .t-icon-list__item');

    // Initialisation d'un tableau pour stocker les fonctionnalités
    let features = [];

    // Parcours de chaque élément de la liste
    featureList.forEach(function (item) {
        // Récupération du texte de chaque élément et ajout dans le tableau des fonctionnalités
        features.push(item.textContent.trim().replace('Included:', '').replace('\n', '').replace('More Info', ''));
    });

    let compatibilityData = {};
    document.querySelectorAll('.meta-attributes__table tr').forEach(row => {
        let name = row.querySelector('.meta-attributes__attr-name').textContent.trim();
        let valueElement = row.querySelector('.meta-attributes__attr-detail');

        if (valueElement) {
            let values = Array.from(valueElement.children)
                .map(value => value.textContent.trim())
                .filter(Boolean);

            compatibilityData[name] = values.join(', ');
        }
    });

    const getAuthorlink = document.querySelector('a.js-by-author');

    const data = new FormData();

    const authorLink = getAuthorlink.href;
    const authorName = getAuthorlink.textContent;

    data.append('name', name);
    data.append('authorName', authorName);
    data.append('authorLink', authorLink);
    data.append('url', url);
    data.append('price', price);
    data.append('strikePrice', strikePrice);
    data.append('cover', cover);
    data.append('tags', tags);
    data.append('description', description);
    data.append('nb_ventes', nb_ventes);
    data.append('breadcrumbs', JSON.stringify(breadcrumbs)); // Ajout des breadcrumbs
    data.append('features', JSON.stringify(features)); // Ajout des breadcrumbs
    data.append('compatibilityData', JSON.stringify(compatibilityData));

    // Envoi de la requête POST
    fetch('https://jonathan-websource.websrc.fr/envato/theme', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: data
    }).then(response => {
        console.log(response);
    });
});