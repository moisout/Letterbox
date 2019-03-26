async function getFolders(apiUrl){
    $.ajax({
        type: "GET",
        url: `${apiUrl}/getInboxFolders.php`,
        dataType: "json",
        success: function (response) {
            const folderNames = response;
            loadFolders(folderNames);
        }
    });
}

async function loadFolders(folderNames){
    folderNames.forEach((element, index) =>{
        let folder = $('.folder-template').clone();
        folder.css('display', 'block');
        folder.removeClass('folder-template');
        folder.text(element);
        folder.prop('id', `folder-${index}`);
        folder.appendTo('.folder-container');
    });

    $('#folder-0').addClass('selected');
}