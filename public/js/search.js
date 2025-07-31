document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", async () => {
        const query = searchInput.value.trim();
        const listingsContainer = document.getElementById("listings-container");

        if (!listingsContainer) return;

        if (query.length === 0) {
            // fetch all listings again
            fetch("/listings/api/search?q=")
                .then(res => res.json())
                .then(data => renderListings(data, listingsContainer));
            return;
        }

        try {
            const response = await fetch(`/listings/api/search?q=${encodeURIComponent(query)}`);
            const listings = await response.json();
            renderListings(listings, listingsContainer);
        } catch (error) {
            console.error("Search error:", error);
        }
    });
});

function renderListings(listings, container) {
    if (!container) return;

    if (listings.length === 0) {
        container.innerHTML = `<p class="text-center">No results found.</p>`;
        return;
    }

    container.innerHTML = listings.map(listing => `
        <div class="card col listing-card mb-4">
          <a href="/listings/${listing._id}" class="listing-link">
            <img src="${listing.image.url}" class="card-img-top" alt="${listing.title}" style="height: 20rem;">
          </a>
          <div class="card-body">
            <h5 class="card-title">${listing.title}</h5>
            <p class="card-text"> ₹${listing.price?.toLocaleString("en-IN") || 'N/A'} / night
              <i class="tax-info">&nbsp;(incl. taxes)</i>
            </p>
          </div>
        </div>
    `).join('');
}
