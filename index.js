let express = require("express");
let axios = require("axios")

let app = express();

let PORT = process.env.PORT || 3000;

var hikingBermuda = {
    author: "Cecile Davidson",
    price: 17.95,
    title: "Hiking Bermuda",
    sections: {
        0: {
            sectionName: "Preface",
            chapters: [{
                name: "Trail Locator",
                page: 12
            }]
        },
        1: {
            sectionName: "Introduction",
            chapters: [{
                    name: "Map Legend",
                    page: 24
                },
                {
                    name: "Rating System",
                    page: 22
                }
            ]
        },
        2: {
            sectionName: "West End",
            chapters: [{
                    name: "Botanical Gardens",
                    page: 63
                },
                {
                    name: "Rockaway, Whale Bay Park",
                    page: 45
                },
                {
                    name: "Somerset Bridge, Hog Bay Park",
                    page: 39
                }
            ]
        }
    },
    trails: [{
            name: "Somerset to Hamilton Railway Trail",
            page: 75,
            section: "West End",
            distanceInMiles: 11.7,
            rating: "Hardy"
        },
        {
            name: "City of Hamilton",
            page: 69,
            section: "West End",
            distanceInMiles: 2.4,
            rating: "Easy"
        },
        {
            name: "St. George's Point",
            page: 131,
            section: "East End",
            distanceInMiles: 3.6,
            rating: "Moderate"
        },
        {
            name: "South Shore Beaches",
            page: 53,
            section: "West End",
            distanceInMiles: 5.0,
            rating: "Moderate"
        },
    ]
}

// GET /trails/rating/:level
// localhost:3000/trails/rating/easy
// localhost:3000/trails/rating/hardy
// Returns all the trails with the rating of level
app.get("/trails/rating/:level", (req, res) => {
    let {
        level
    } = req.params
    level = level.toLowerCase()

    let {
        trails
    } = hikingBermuda

    // Returns all the trails with the rating of level
    // Go over the trails array and return only the items for which their rating property is the same as the level the client sent in the request
    let myFilteredTrails = filterTrails(trails, level)

    res.send(myFilteredTrails)

})


// GET /trails?level
// Returns all the trails with the rating of level
app.get("/trails", (req, res) => {
    //giphy api
    let gif_url = "https://api.tenor.com/v1/search?tag=trails&key=V156DEG9RW12&limit=18"

    axios.get(gif_url)
        .then(function (apiRes) {
            console.log(apiRes.data)
        })
        .catch(function (error) {
            console.log(error)
        })
})

function filterTrails(myTrails, levelInput) {

    let filteredTrails = [];
    for (let index = 0; index < myTrails.length; index++) {
        const trail = myTrails[index];

        if (trail.rating.toLowerCase() === levelInput) {
            filteredTrails.push(trail)
        }
    }

    // USING THE FILTER ARRAY METHOD
    // let filteredTrails = trails.filter(function(trail){
    //     if (trail.rating.toLowerCase() === level){
    //         return true
    //     } else {
    //         return false
    //     }
    // })

    return filteredTrails;

}

app.listen(PORT, () => {
    console.log("Listening on PORT: " + PORT);
})