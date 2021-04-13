# Visualizing Data with Leaflet

## Background

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. 

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

![1-Logo](Images/1-Logo.png)


## Project Description

### All Earthquakes from the Past 7 Days

Below you will see a map that plots all the earthquakes from the data set based on their longitude and latitude. The ***data markers*** reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color. When a marker is clicked, there will be a ***popup*** that provide additional information about the earthquake, such as location and time. There is another ***map layer*** that illustrate the relationship between tectonic plates and seismic activity. You can select different map layers for different view options.

![5-Advanced](Images/5-Advanced.png)


### Data Set

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. I will visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick the data set ('All Earthquakes from the Past 7 Days') to visualize. I will be using the URL of this JSON to pull in the data for our visualization.

![3-Data](Images/3-Data.png)
![4-JSON](Images/4-JSON.png)


