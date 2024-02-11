


$(document).ready(function () {
    $('#getFilmsButton').click(function () {
        var sortCriteria = $('#sortDropdown').val(); // Get the selected sorting criteria
        var sortOrder = $('#sortOrder').val();
        $.ajax({
            url: '/get_films',
            type: 'GET',
            data: { 'sort_by': sortCriteria, 'sort_order': sortOrder },
            success: function (response) {
                var filmsGrid = '<div class="row">'; // Start a row for the grid
                $.each(response.films, function (index, film) {
                    var filmDetails = film.slice(1, -1).split(',');
                    var filmID = filmDetails[0]; // Assuming the first element is the film ID

                    var title = filmDetails[1].trim().replace(/^'(.*)'$/, '$1'); // Remove quotes and trim
                    var encodedTitle = encodeURIComponent(title); // Encode for URL
                    

                    var firstThreeDetails = filmDetails.slice(1, 3); // Get the first three elements
                    var image_url = filmDetails[filmDetails.length - 1].trim().replace(/^'(.*)'$/, '$1');

                    var formattedFilm = firstThreeDetails.join(' - ').trim();

                    filmsGrid += `
                        <div class="col-md-2">
                            <div class="card">
                                <a href="/film/${encodedTitle}/${filmID}">
                                    <img class="card-img-top" src="${image_url}" alt="Film image">
                                </a>
                                <div class="card-body">
                                    <h5 class="card-title">${formattedFilm}</h5>
                                    <a href="/film/${encodedTitle}/${filmID}" class="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>`;
                });
                filmsGrid += '</div>'; // Close the row
                $('#filmsContainer').html(filmsGrid).show();
                $('#toggleFilmsButton').show();

                $('#getFilmsButton').remove();
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $('#deleteButton').click(function () {
        if (confirm("Are you sure you want to delete this record?")) {
            var entryId = getFilmIdFromElement();
            console.log(entryId)
            deleteRecord(entryId);
        }
    });

    function getFilmIdFromElement() {
        var filmIdElement = document.getElementById('dbIndex');
        if (filmIdElement) {
            var filmId = filmIdElement.textContent || filmIdElement.innerText;
            console.log('Extracted ID:', filmId); // Debug: Log the extracted ID
            return filmId;
        } else {
            console.error('Element with ID "dbIndex" not found.');
            return null; // Or handle the error as needed
        }
    }

    $('#reportSubmit').click(function () {
        var searchQuery = $('#reportSearch').val();
        var category = $('#reportCategory').val(); // Get the selected sorting criteria
        var sortCriteria = $('#sortDropdown').val(); // Get the selected sorting criteria
        var sortOrder = $('#sortOrder').val();
        $.ajax({
            url: '/report',
            type: 'GET',
            data: { 'query': searchQuery, 'category': category, 'sort_by': sortCriteria, 'sort_order': sortOrder },
            success: function (response) {
                var filmsGrid = '<div class="row">';
                $.each(response.results, function (index, film) {
                    var filmDetails = film.slice(1, -1).split(',');

                    var title = filmDetails[1].trim().replace(/^'(.*)'$/, '$1'); // Remove quotes and trim
                    var encodedTitle = encodeURIComponent(title); // Encode for URL

                    var filmID = filmDetails[0]; // Assuming the first element is the film ID
                    var firstThreeDetails = filmDetails.slice(1, 3); // Get the first three elements
                    var image_url = filmDetails[filmDetails.length - 1].trim();
                    image_url = image_url.replace(/^'(.*)'$/, '$1');

                    // Join the first three details for the text
                    var formattedFilm = firstThreeDetails.join(' - ').trim();
                    // ...
                    filmsGrid += `
                        <div class="col-md-2">
                            <div class="card">
                                <a href="/film/${encodedTitle}/${filmID}">
                                    <img class="card-img-top" src="${image_url}" alt="Film image">
                                </a>
                                <div class="card-body">
                                    <h5 class="card-title">${formattedFilm}</h5>
                                    <a href="/film/${encodedTitle}/${filmID}" class="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>`;
                });
                filmsGrid += '</div>';
                $('#filmsContainer').html(filmsGrid).show();
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $('#searchButton').click(function () {
        var searchQuery = $('#searchInput').val();
        var sortCriteria = $('#sortDropdown').val(); // Get the selected sorting criteria
        var sortOrder = $('#sortOrder').val();
        $.ajax({
            url: '/search',
            type: 'GET',
            data: { 'query': searchQuery, 'sort_by': sortCriteria, 'sort_order': sortOrder },
            success: function (response) {
                var filmsGrid = '<div class="row">';
                $.each(response.results, function (index, film) {
                    var filmDetails = film.slice(1, -1).split(',');

                    var title = filmDetails[1].trim().replace(/^'(.*)'$/, '$1'); // Remove quotes and trim
                    var encodedTitle = encodeURIComponent(title); // Encode for URL

                    var filmID = filmDetails[0]; // Assuming the first element is the film ID
                    var firstThreeDetails = filmDetails.slice(1, 3); // Get the first three elements
                    var image_url = filmDetails[filmDetails.length - 1].trim();
                    image_url = image_url.replace(/^'(.*)'$/, '$1');

                    // Join the first three details for the text
                    var formattedFilm = firstThreeDetails.join(' - ').trim();
                    // ...
                    filmsGrid += `
                        <div class="col-md-2">
                            <div class="card">
                                <a href="/film/${encodedTitle}/${filmID}">
                                    <img class="card-img-top" src="${image_url}" alt="Film image">
                                </a>
                                <div class="card-body">
                                    <h5 class="card-title">${formattedFilm}</h5>
                                    <a href="/film/${encodedTitle}/${filmID}" class="btn btn-primary">View Details</a>
                                </div>
                            </div>
                        </div>`;
                });
                filmsGrid += '</div>';
                $('#filmsContainer').html(filmsGrid).show();
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $('#toggleFilmsButton').click(function () {
        $('#filmsContainer').toggle(); // Toggle the visibility
        $(this).text($(this).text() === 'Hide Films' ? 'Show Films' : 'Hide Films'); // Toggle button text
    });

    $('#editButton').click(function () {
        $('#editForm').toggle();
    });

    $('#addButton').click(function () {
        $('#addForm').toggle();
    });
    
    $('#reportButton').click(function () {
        $('#reportForm').toggle();
    });
});

$(document).ready(function () {
    $('#searchInput').keypress(function (e) {
        if (e.which == 13) { // 13 is the keycode for Enter
            e.preventDefault();
            $('#searchButton').click();
        }
    });
});

function deleteRecord(entryId) {
    $.ajax({
        url: '/delete_film/' + entryId,
        type: 'POST',
        success: function (response) {
            alert('Record deleted successfully!');
            // Redirect to another page or refresh
            window.location.href = '/';  // Example: redirect to home
        },
        error: function (error) {
            console.log(error);
            alert('Error deleting the record.');
        }
    });
}



document.addEventListener('DOMContentLoaded', function () {
    window.resetAndHideForm = function () {
        document.getElementById('editFormContent').reset();
        document.getElementById('editForm').style.display = 'none';
    };
});

document.addEventListener('DOMContentLoaded', function () {
    window.resetAndHideAddForm = function () {
        document.getElementById('addFormContent').reset();
        document.getElementById('addForm').style.display = 'none';
    };
});

document.addEventListener('DOMContentLoaded', function () {
    window.resetAndHideReportForm = function () {
        document.getElementById('reportFormContent').reset();
        document.getElementById('reportForm').style.display = 'none';
    };
});

