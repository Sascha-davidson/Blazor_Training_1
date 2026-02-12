const scrollContainer = document.querySelector('.scroll-content');
const scrollThumb = document.querySelector('.scroll-thumb');
const customScrollbar = document.querySelector('.custom-scrollbar');

let isDragging = false;
let startY = 0;
let startTop = 0;

// Disable text selection
function disableTextSelection() {
    document.body.style.userSelect = 'none'; // Prevent text selection
}

function enableTextSelection() {
    document.body.style.userSelect = ''; // Re-enable text selection
}

// Update the size and position of the custom scrollbar
function updateScrollbar() {
    const contentHeight = scrollContainer.scrollHeight;
    const containerHeight = scrollContainer.clientHeight;
    const scrollTop = scrollContainer.scrollTop;

    // Calculate thumb height
    const thumbHeight = Math.max((containerHeight / contentHeight) * containerHeight, 30); // Minimum size of 30px
    scrollThumb.style.height = `${thumbHeight}px`;

    // Calculate thumb position
    const maxThumbTop = containerHeight - thumbHeight;
    const thumbTop = (scrollTop / (contentHeight - containerHeight)) * maxThumbTop;
    scrollThumb.style.top = `${thumbTop}px`;
}

// Synchronize scrolling when dragging the scrollbar
function handleThumbDrag(event) {
    if (!isDragging) return;

    const deltaY = event.clientY - startY;
    const maxThumbTop = customScrollbar.clientHeight - scrollThumb.offsetHeight;

    // Calculate new thumb position
    let newTop = Math.min(Math.max(startTop + deltaY, 0), maxThumbTop);
    scrollThumb.style.top = `${newTop}px`;

    // Calculate corresponding scroll position
    const scrollPercentage = newTop / maxThumbTop;
    const newScrollTop = scrollPercentage * (scrollContainer.scrollHeight - scrollContainer.clientHeight);
    scrollContainer.scrollTop = newScrollTop;
}

// Mouse events for dragging
scrollThumb.addEventListener('mousedown', (event) => {
    isDragging = true;
    startY = event.clientY;
    startTop = parseInt(scrollThumb.style.top, 10) || 0;

    disableTextSelection(); // Disable text selection during drag

    document.addEventListener('mousemove', handleThumbDrag); // Listen on the document
    document.addEventListener('mouseup', () => {
        isDragging = false;
        enableTextSelection(); // Re-enable text selection after drag
        document.removeEventListener('mousemove', handleThumbDrag); // Remove listener after drag
    });
});

// Update the custom scrollbar on content scroll
scrollContainer.addEventListener('scroll', updateScrollbar);

// Ensure the scrollbar updates on resize
window.addEventListener('resize', updateScrollbar);

// Initial setup
updateScrollbar();
