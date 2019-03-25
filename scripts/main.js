console.log('123123');

async function getMailList(apiUrl) {
    $.ajax({
        type: "GET",
        url: `${apiUrl}/getMailList.php`,
        dataType: "json",
        success: function (response) {
            const mailData = response;
            loadFolders(mailData);
        }
    });
}

async function loadMailList(mailData) {
    mailData.forEach((element, index) =>{
        let mailEntry = $('.mail-list-template').clone();
        mailEntry.css('display', 'block');
        mailEntry.removeClass('mail-list-template');
        mailEntry.children('.mail-list-text').text(mailData.title);
        mailEntry.children('.mail-list-sender').text(mailData.sender);
        mailEntry.prop('id', `mail-entry-${index}`);
        mailEntry.appendTo('.mail-list-container');
        console.log(mailEntry);
    }); 
}