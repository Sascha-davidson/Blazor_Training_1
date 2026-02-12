const scrollContainer = document.querySelector('.scroll-content');
const scrollThumb = document.querySelector('.scroll-thumb');
const customScrollbar = document.querySelector('.custom-scrollbar');

function updateScrollbar() {
    const contentHeight = scrollContainer.scrollHeight;
    const containerHeight = scrollContainer.clientHeight;
    const thumbHeight = Math.max((containerHeight / contentHeight) * containerHeight, 30); // Minimum size
    const scrollPercentage = scrollContainer.scrollTop / (contentHeight - containerHeight);

    scrollThumb.style.height = `${thumbHeight}px`;
    scrollThumb.style.top = `${scrollPercentage * (containerHeight - thumbHeight)}px`;
}

scrollContainer.addEventListener('scroll', updateScrollbar);

scrollThumb.addEventListener('mousedown', (event) => {
    const startY = event.clientY;
    const startTop = parseInt(scrollThumb.style.top, 10) || 0;

    const onMouseMove = (moveEvent) => {
        const deltaY = moveEvent.clientY - startY;
        const newTop = Math.min(
            Math.max(startTop + deltaY, 0),
            customScrollbar.clientHeight - scrollThumb.offsetHeight
        );

        scrollThumb.style.top = `${newTop}px`;
        const scrollPercentage = newTop / (customScrollbar.clientHeight - scrollThumb.offsetHeight);
        scrollContainer.scrollTop = scrollPercentage * (scrollContainer.scrollHeight - scrollContainer.clientHeight);
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

updateScrollbar();
