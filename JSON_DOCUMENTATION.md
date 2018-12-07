// JSON documentation for economists-films
// json is avaliable on url: https://economist.twivel.net/api/v1/root/json

// json object consist of 2 main parts - shelves array containing multiple objects 
//                                     - config object containing basic app information
// each shelf object represents one section(row) on the website, e.g. daily watch, featured, all Series...    
{
shelves: [  
{}, 
{},
{},
{},
{},
{},
{},
{},
{},
{}
],
config: {
app_theme: [string] - main theme of the app, e.g. "dark"  
frontpage_back: [string] - frontpage backgound color 
header_image: [string] - main logo(with title) on header    
header_image_height: width of main(without title) logo on header,
twitter_handle: [string] - empty string 
app_name: [string] - the name of the app
mobile_header_image: [string] - main logo(without title)
mobile_header_colour: [string] - background color of logo
mobile_header_pos: [string] - position of the logo on the page, e.g. left
mobile_background_image: [null]
}
}


// json view after unpacking shelves:
// this json contain 2 main parts 1. - object with initial info of the shelf, 2. - items array  
{
id: [number] - id of the section(row) 
title: [string] - string of the section(row)
series_id: [null] or [number] - number if the section(row) is representation of one of the series, null if it is not (e.g daily watch, which is seria)  
order: [number] - it is an order number of shelves(rows) in json, not in app
created_at: [string] - date and time, when the shelf(row) was created  updated_at: [string] - date and time, when the shelf(row) was updated for the last time
thumbnail_size: [string] - layout type of the thumbnail image
item_order: [string] - order acoording to date (e.g. date_old)
item_layout: [string]
type: [string] - type of the shelves(rows), either "category"(e.g. daily watch) or "series"(e.g. passport) or "" for others
analytics_tags: {
TwID: [string] - twivel id
TwLinkPage: [string] - title name of the shelf created by tviwel
CreatedDate: [string] - date, when the shelf was created on twivel
},
items: []
},


// state after unpacking item array
// items = objects of videos within the seria 
// there are all the json data regarding video inside the item object
{
id: [number] - id of the video
title: [string] - video title
description: [string] - video description
created_at: [string] - date, when the video was created
updated_at: [string] - date, when the video was updated for the last time
series_id: [number] - id of the seria, which the video belongs to, null if the video does not belong to any seria
video_url: [string] - url of the video
episode_number: [number] - episode number within the seria,
hide_title: [boolean] - test if title is hidden 
subtitle: [string] - subtitle of the video
thumbnail: {
url: [string] - image of the video (normal size)
portrait: {
url: [string] - image of the video (portrait size)
},
landscape: {
url: [string] - image of the video (landscape size)
},
square: {
url: [string] - image of the video (square size)
},
feature: {
url: [string] - image of the video (feature size)
},
thumb: {
url: [string] - image of the video (thumb size)
},
full_width: {
url: [string] - image of the video (full_width size)
},
small_landscape: {
url: [string] - image of the video (small_landscape size)
},
small_portrait: {
url: [string] - image of the video (small_portrait size)
}
},
published: [number]
video_type: [string]
preview_video: [string]
preview_video_type: [string]
itunes_link: [string]
web_share_url: [string]
//thumbnail images of various sizes
landscape_thumbnail: {
url: [string] 
landscape: {
url: [string]  
},
thumb: {
url: [string] 
},
small_landscape: {
url: [string] 
}
},

youtube_id: [string] - id of video if it is avaliable on you tube
publication_date: [string] - date of publication
long_title: [string] - title in long format (seria name: episode name)
category_list: [array of strings] - names of the categories related to the video
type: [string] - type of the video (e.g. Episode)
json_URL: [string] - url of the whole json object for a single episode
analytics_tags: {
TwID: [string] - id of the video on twivel 
TwVideoName: [string] - name of the video on the twivel (using hyphens)
TwName: [string] - name of the video on the twivel (using spaces)
TwLinkPage: [string] - link name of the video on the twivel identical with TwName 
CreatedDate: [string] - date, when the video was created 
PublicationDate: [string] - date, when the video was published
},
video_file: [string] - file with the video
preview_file: [string] - video file preview, when avaliable
// images related to the video
additional_assets: [
{
id: [number] - id of the background image 
key: [string] - key(name) of the background image
file: {
url: [string] - background (large) image of the video
thumb: {
url: [string] - thumbnail (smaller) image of the video
}
},
created_at: [string] - date, when the background image was created
updated_at: [string] - date, when the background image was updated for the last time
},
{
id: [number] - id of the sponsor logo
key: [string] - key(name) of the sponsor logo
file: {
url: [string] - sponsor logo image
thumb: {
url: [string] - sponsor logo image
}
},
created_at: [string] - date, when the sponsor image logo was created
updated_at: [string] - date, when the sponsor image logo was updated for the last time
}
]
},



