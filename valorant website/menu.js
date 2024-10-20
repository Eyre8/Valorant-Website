document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.option');
    const images = document.querySelectorAll('.images img');


    options.forEach(option => {
        option.addEventListener('mouseenter', () => {
            // Hide all images first
            images.forEach(img => {
                img.classList.remove('visible');
                img.classList.add('hidden');
            });

            // Show the corresponding image
            const imageId = option.getAttribute('data-image');
            const imageToShow = document.getElementById(imageId);
            imageToShow.classList.remove('hidden');
            imageToShow.classList.add('visible');

            option.addEventListener('click', () => {
                const url = option.getAttribute('data-url');
                if (url) {
                    window.location.href = url;
                }
            });
        });
    });
});
