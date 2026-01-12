document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("bookModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalAuthor = document.getElementById("modalAuthor");
  const modalDesc = document.getElementById("modalDesc");

  const closeBtn = modal.querySelector(".modal__close");
  const overlay = modal.querySelector(".modal__overlay");

  // Ambil semua tombol detail
  const detailButtons = document.querySelectorAll(".btn-detail");

  detailButtons.forEach(button => {
    button.addEventListener("click", () => {
      const title = button.dataset.title;
      const author = button.dataset.author;
      const desc = button.dataset.desc;

      modalTitle.textContent = title;
      modalAuthor.textContent = author;
      modalDesc.textContent = desc;

      modal.classList.add("active");
    });
  });

  // Tutup modal
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Tutup dengan ESC
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      modal.classList.remove("active");
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const bookGrid = document.querySelector(".grid--3");
  const books = Array.from(document.querySelectorAll(".card--book"));

  const sortSelect = document.querySelector(
    'select[aria-label="Urutkan katalog"]'
  );
  const categorySelect = document.querySelector(
    'select[aria-label="Filter kategori"]'
  );

  // FILTER KATEGORI
  categorySelect.addEventListener("change", () => {
    const category = categorySelect.value.toLowerCase();

    books.forEach(book => {
      const genre = book.dataset.genre;

      if (category === "semua" || genre === category) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    });
  });

  // SORTING
  sortSelect.addEventListener("change", () => {
    let sortedBooks = [...books];

    switch (sortSelect.value) {
      case "Harga: Rendah ke Tinggi":
        sortedBooks.sort(
          (a, b) => Number(a.dataset.price) - Number(b.dataset.price)
        );
        break;

      case "Harga: Tinggi ke Rendah":
        sortedBooks.sort(
          (a, b) => Number(b.dataset.price) - Number(a.dataset.price)
        );
        break;

      case "Terlaris":
        sortedBooks.sort(
          (a, b) => (b.dataset.popular === "true") - (a.dataset.popular === "true")
        );
        break;

      default:
        return;
    }

    // render ulang
    bookGrid.innerHTML = "";
    sortedBooks.forEach(book => bookGrid.appendChild(book));
  });
});

const images = document.querySelectorAll('.hero .box img');
const next = document.getElementById('next');
const prv = document.getElementById('prv');


let index = 0;

function slider(){
    images.forEach(img => {
        img.classList.remove('im', 'im-m')
        img.style.display = "none";
    }); 

    images[index].style.display = "block";
  images[index].classList.add('im');

  // gambar belakang (preview)
  let nextIndex = (index + 1) % images.length;
  images[nextIndex].style.display = "block";
  images[nextIndex].classList.add('im-m');


}

next.addEventListener('click', () =>{
    index = (index + 1) % images.length;
    slider();
});

prv.addEventListener('click', () =>{
    index = (index - 1 + images.length) % images.length;
    slider();
});

slider();
// cart

