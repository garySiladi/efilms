# Fetch API in Economist Films
We use data fetching for getting the proper data for the website.
We can fetch:
* the whole root JSON
* a series by ID
* an episode by ID
# Fetch functions
#### getRoot()
```
getRoot().then((data) => {
    ... the whole root JSON
});
```
#### getSeriesByID(id)
```
getSeriesByID(id).then((data) => {
    ... the series with the given ID in JSON format
});
```
#### getEpisodeByID(id)
```
getEpisodeByID(id).then((data) => {
    ... the episode with the given ID in JSON format
});
```
