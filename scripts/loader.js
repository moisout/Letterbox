$(function () {

    let components = [
        'main',
        'folders'
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
        let apiUrl = 'maurice.oeger.li/Letterbox-API';

        if (window.location.href.indexOf("localhost") > -1) {
            apiUrl = '../Letterbox-API';
        }

        await getFolders(apiUrl);
    }
});