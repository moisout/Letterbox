function bindMobileHandler() {
    handleResize();
    $(window).on('resize', handleResize);

    $('.menu-btn-mobile').on('click', toggleSideMenu);

    handleDragMenu();

    $('.drag-menu').on('click', function () {
        toggleSideMenu();
    });
}

function handleResize() {
    let width = $(document).width();
    if (width <= 700) {
        enableDragMenu();
    } else {
        disableDragMenu();
    }
}

function enableDragMenu() {
    const sideBar = $('#sidebar');

    slideOutClass(sideBar);
    sideBar.css('transform', 'translateX(-100%)');

    closeDragMenu($('.drag-menu'));
}

function disableDragMenu() {
    const sideBar = $('#sidebar');

    slideInClass(sideBar);
    sideBar.css('transform', 'translateX(0)');
}

function handleDragMenu() {
    $('.drag-menu').draggable({
        axis: 'x',
        containment: 'parent'
    });

    $('.drag-menu').on('drag', function (event, ui) {
        let position = ui.position.left;
        let opacity = position / $(document).width();
        let sideBar = $('#sidebar');
        let sideBarWidth = sideBar.outerWidth();
        slideInClass($('.drag-menu'));
        $('.drag-menu').css('opacity', 0);

        if (position > sideBarWidth) {
            $('#sidebar').css({
                'transform': `translateX(0px)`
            });
        } else {
            $('#sidebar').css({
                'transform': `translateX(calc(${position}px - ${sideBarWidth}px))`
            });
        }
    });

    $('.drag-menu').on('dragstop', function (event, ui) {
        let position = ui.position.left;
        let posDifference = position / $(document).width();
        let tippingPoint = 0.2;

        if (posDifference > tippingPoint) {
            openDragMenu($('.drag-menu'));

        } else if (posDifference <= tippingPoint) {
            closeDragMenu($('.drag-menu'));
        }
    });
}

function openDragMenu(menu) {
    let sideBar = $('#sidebar');

    slideInClass(menu);

    let dragBoxWidth = `calc(100vw - ${sideBar.outerWidth()}px)`;

    menu.css({
        'left': `calc(100vw - ${dragBoxWidth})`,
        'width': dragBoxWidth,
    });

    slideInClass(sideBar);
    sideBar.css('transform', 'translateX(0)');
    setTimeout(() => {
        slideInClass($('.drag-menu'));
        $('.drag-menu').css('opacity', 1);
    }, 300);

    $('.menu-btn-mobile').addClass('active');
}

function closeDragMenu(menu) {
    let sideBar = $('#sidebar');

    slideOutClass(menu);

    menu.css({
        'left': '0',
        'width': '20px',
        'opacity': 0
    });

    slideOutClass(sideBar);
    sideBar.css('transform', 'translateX(-100%)');

    $('.menu-btn-mobile').removeClass('active');
}

function toggleSideMenu() {
    let menuBtn = $('.menu-btn-mobile');
    if (menuBtn.hasClass('active')) {
        slideOutClass($('#sidebar'));

        $('#sidebar').css('transform', 'translateX(-100%)');

        closeDragMenu($('.drag-menu'));
    } else {
        slideInClass($('#sidebar'));

        $('#sidebar').css('transform', 'translateX(0)');

        openDragMenu($('.drag-menu'));
    }
}

async function slideInClass(element) {
    element.addClass('slide-in');

    setTimeout(function () {
        element.removeClass('slide-in');
    }, 300);
}

async function slideOutClass(element) {
    element.addClass('slide-out');

    setTimeout(function () {
        element.removeClass('slide-out');
    }, 300);
}