function clearFilters() {
    document.querySelectorAll('.sidebar input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
}


