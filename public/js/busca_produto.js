document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    const productList = document.getElementById('product-list');
    const paginationContainer = document.getElementById('pagination');
    const resultInfo = document.getElementById('result-info');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const products = Array.from(productList.children);
    const itemsPerPage = 4;
    let currentPage = 1;

    function updateProductDisplay() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        const filteredProducts = products.filter(product => {
            const productName = product.querySelector('h3 a').textContent.toLowerCase();
            return productName.includes(searchTerm);
        });

        // Ordena os produtos
        if (filterValue === "A-Z") {
            filteredProducts.sort((a, b) => {
                const nameA = a.querySelector('h3 a').textContent.toLowerCase();
                const nameB = b.querySelector('h3 a').textContent.toLowerCase();
                return nameA.localeCompare(nameB);
            });
        } else if (filterValue === "Z-A") {
            filteredProducts.sort((a, b) => {
                const nameA = a.querySelector('h3 a').textContent.toLowerCase();
                const nameB = b.querySelector('h3 a').textContent.toLowerCase();
                return nameB.localeCompare(nameA);
            });
        }

        // Atualiza a paginação
        updatePagination(filteredProducts);
    }

    function updatePagination(filteredProducts) {
        productList.innerHTML = '';
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const productsToDisplay = filteredProducts.slice(start, end);

        productsToDisplay.forEach(product => productList.appendChild(product));

        // Atualiza as informações dos resultados
        resultInfo.innerHTML = `Mostrando de <span class="font-medium">${start + 1}</span> a <span class="font-medium">${Math.min(end, filteredProducts.length)}</span> de <span class="font-medium">${filteredProducts.length}</span> resultados`;

        // Atualiza a paginação
        updatePaginationControls(totalPages);
    }

    function updatePaginationControls(totalPages) {
        paginationContainer.innerHTML = '';

        if (currentPage > 1) {
            const prevButton = createPageButton('Previous', currentPage - 1);
            paginationContainer.appendChild(prevButton);
        }

        for (let i = 1; i <= totalPages; i++) {
            const button = createPageButton(i, i);
            if (i === currentPage) {
                button.classList.add('z-10', 'bg-marrom', 'text-white');
            }
            paginationContainer.appendChild(button);
        }

        if (currentPage < totalPages) {
            const nextButton = createPageButton('Next', currentPage + 1);
            paginationContainer.appendChild(nextButton);
        }
    }

    function createPageButton(text, page) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('relative', 'inline-flex', 'items-center', 'px-4', 'py-2', 'text-sm', 'font-medium', 'text-marrom', 'ring-1', 'ring-inset', 'ring-gray-300', 'hover:bg-amber-950', 'hover:text-white', 'focus:z-20', 'focus:outline-offset-0');
        button.addEventListener('click', () => {
            currentPage = page;
            updateProductDisplay();
        });
        return button;
    }

    searchInput.addEventListener('input', () => {
        currentPage = 1;
        updateProductDisplay();
    });
    filterSelect.addEventListener('change', () => {
        currentPage = 1;
        updateProductDisplay();
    });

    updateProductDisplay();
});
