// JS for DSA pages
    function handleChapterClick(chapterIndex) {
        const extraContent = document.querySelector(`.single-chapter-extra-content-div-${chapterIndex}`);
        const hiddenContent = document.querySelector(`.single-chapter-hidden-div-${chapterIndex}`);
        const icon = document.querySelector(`.single-chapter-icon-${chapterIndex} i`);

        if (extraContent.style.maxHeight === '0px' || extraContent.style.maxHeight === '') {
            extraContent.style.maxHeight = extraContent.scrollHeight + 'px';
            hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px';
            icon.style.transform = 'rotate(90deg)';
        } else {
            extraContent.style.maxHeight = '0';
            hiddenContent.style.maxHeight = '0';
            icon.style.transform = 'rotate(-90deg)';
        }
    }
