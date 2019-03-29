$(function () {

    let components = [
        'main',
        'folders',
        'mobile'
    ];

    let loadCount = 0;

    components.forEach(element => {
        $.ajax({
                url: `scripts/${element}.js`,
                crossDomain: true,
                dataType: "script",
            })
            .done(function () {
                loadCount++;

                if (loadCount === components.length) {
                    loadContent();
                }
            });
    });

    async function loadContent() {
        let apiUrl = 'https://maurice.oeger.li/Letterbox-API';

        if (window.location.href.indexOf("localhost") > -1) {
            apiUrl = '../Letterbox-API';
        }

        await getFolders(apiUrl);
        await getMailList(apiUrl);

        bindMobileHandler();

        $('.loading-animation').fadeOut();
    }
});