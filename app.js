const API_KEY = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

// Event listener for form submission
$('#searchForm').on('submit', function (e) {
  e.preventDefault(); // Prevent the form from refreshing the page

  const searchTerm = $('#searchTerm').val(); // Get the input value
  $.ajax({
    url: `http://api.giphy.com/v1/gifs/search`,
    method: 'GET',
    data: {
      q: searchTerm, // Search term from the input
      api_key: API_KEY,
      limit: 1 // Limits to 1 GIF
    }
  })
    .done(function (response) {
      console.log(response.data); // Checks the API response
      if (response.data.length > 0) {
        const gifUrl = response.data[0].images.original.url;
        appendGif(gifUrl);
      } else {
        alert("No GIFs found for your search term!");
      }
    })
    .fail(function () {
      alert("An error occurred while fetching GIFs.");
    });

  $('#searchForm')[0].reset(); // Clears the input field
});

// Function to append a GIF to the page
function appendGif(url) {
  const gifElement = `<img src="${url}" alt="GIF">`;
  $('#gifContainer').append(gifElement); // Adds the GIF to the container
}

// Event listener for removing all GIFs
$('#removeButton').on('click', function () {
  $('#gifContainer').empty(); // Clears all GIFs
});

