document.addEventListener('DOMContentLoaded', function () {
    const loadButton = document.querySelector('.gallery__load-button');
    const loader = document.querySelector('.gallery__loader');
    const gallery = document.querySelector('.gallery__pics');
    const url = 'https://api.thecatapi.com/v1/images/search?limit=10';
    const btn_up = document.querySelector('.gallery__btn-up');

    loadButton.addEventListener('click', async function (event) {
        event.preventDefault();
        loader.style.display = 'block';
        gallery.textContent = '';

        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Failed to load images');
            }
            const data = await res.json();
            if (data){
                data.forEach(cat_img => {
                    const img = document.createElement('img');
                    img.src = cat_img.url;
                    img.alt = "A picture of a cat"
                    gallery.appendChild(img);
            })};
        } catch (e) {
            console.error(e.message);
        } finally {
            loader.style.display = 'none';
        }
    });

    btn_up.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    function checkScroll() {
        if (window.scrollY > window.innerHeight / 2) {
            btn_up.style.display = 'block';
        } else {
            btn_up.style.display = 'none';
        }
    }
    document.addEventListener('scroll', checkScroll);
});