$(function() {
    // When the user press any keyboard button
    $("input").keydown(function(event) {
        // if the user press the enter button on the keyboard
        if (event.key == "Enter") {
            var child = $(".results").children();
            // if the results div have children remove them
            if (child.length != 0) {
                child.remove();
            }
            // take the value of the input
            var title = $("#title").val();
            // if the input isn't ""
            if (title != "") {
                // move the input and the link to the top
                $("#box").css({ marginTop: 0 });
                // create the url for the api
                var api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences&exlimit=max&gsrsearch=" + title + "&callback=?";
                // call the function
                takeTheResults(api);
            }
        } else {
            console.log(event.key);
        }

    });
});

// connect to the url which pass as a parameter
function takeTheResults(url) {
    var results = [];
    // connect to the api
    $.getJSON(url, function(data) {
        // take the pages
        var response = data.query.pages;
        // for each page
        $.each(response, function(id, object) {
            // take the results
            var title = object.title;
            var pageid = id; // object.pageid
            var description = object.extract;
            var num = object.index;

            // push the results into an array
            results.push({
                num: num,
                title: title,
                pageid: pageid,
                description: description
            });
        });

        // sort the results
        results.sort(function(a, b) {
            return a.num - b.num;
        });


        // for every result
        for (var i = 0; i < results.length; i++) {
            var data = results[i];
            //create a div with class .res
            var div = $("<div></div>", { class: "res", id: data.pageid });
            // create a h1 header with text the title of the results
            var h1 = $("<h1></h1>").text(data.title);
            // create a paragraph with text the description of the results
            var p = $("<p></p>").text(data.description);
            // append to the div the p and the h1
            div.append(h1, p);
            // append to the div with .result the div.res
            $(".results").append(div);
        };

    });

}