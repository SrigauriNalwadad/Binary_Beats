function clearFilters() {
    document.querySelectorAll('.sidebar input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
}

// To sort
document.addEventListener('DOMContentLoaded', function () {
    const sortByDropdown = document.querySelector('.sort-by-dropdown .dropdown-menu');
    const currentSortElement = document.getElementById('currentSort');

    sortByDropdown.addEventListener('click', function (e) {
        const selectedSort = e.target.getAttribute('data-sort');
        if (selectedSort) {
            currentSortElement.textContent = selectedSort;

            // Remove active class from all items and add it to the selected one
            const items = sortByDropdown.querySelectorAll('.dropdown-item');
            items.forEach(item => {
                item.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });
});


