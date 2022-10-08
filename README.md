# whereDoIRun

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/STASYA00/whereDoIRun">
    <img src="assets/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">WhereDoIRun</h3>

  <p align="center">
    A web application that shows stats on where you run.
    <br />
    <a href="https://github.com/STASYA00/whereDoIRun"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/STASYA00/whereDoIRun">View Demo</a>
    ·
    <a href="https://github.com/STASYA00/whereDoIRun/issues">Report Bug</a>
    ·
    <a href="https://github.com/STASYA00/whereDoIRun/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![WhereDoIRun][product-screenshot]](https://example.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* Javascript
* [Nodejs](Nodejs-url)
* [Leaflet](Leaflet-url)
* [D3](d3-url)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* Strava account
* For developing, you would need a strava application and tokens - [here](https://developers.strava.com/) how to get it


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/STASYA00/whereDoIRun.git
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

* Log in to Strava and provide the access to your running activity data.
* Choose the running area, the statistics of which you are interested in
* Explore the statistics!

<p align="center">
<img src="assets/illustrations/frontpage.png" width="300"/>
<img src="assets/illustrations/changepage.png" width="300"/>
</p>


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Current limitations

Limitations:

* Application does not support the areas that are not mapped on [OpenStreetMap](https://openstreetmap.org/)

<!-- ROADMAP -->
## Roadmap

- Percentage of a geographical area covered by runs (streets mapped on OSM)
- Two types of maps: binary (run / not run) and where a person runs most
- Caching the activity and the geo data, to ease the load on OSM and strava
- CSS for styles
- Dynamic website version
- Mobile app version
- Different color styles for the app and graphics
- Timeline to show how the territory discovery changes
- An option to upload local activity files without using strava
- an option to connect to the other running apps
- rewrite as typescript
- reactjs

See the [open issues](https://github.com/STASYA00/whereDoIRun/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Stasja Fedorova (Developer) - [@linkedin_shield](https://www.linkedin.com/in/stanislava-fedorova/) - 0.0stasya@gmail.com

Emil Lindstedt (UI / UX Designer) - [@linkedin_shield](https://www.linkedin.com/in/emil-lindstedt-227a6410b/) - emil.lindstedt@hm.com

Project Link: [https://github.com/STASYA00/whereDoIRun](https://github.com/STASYA00/whereDoIRun)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments and credits

* [Geographical data](openstreetmap.org) - available under Open Database License, “© OpenStreetMap contributors”
* [Geocoding](https://nominatim.openstreetmap.org/) - “© OpenStreetMap contributors”
* [Leaflet - geometry operations](https://leafletjs.com/) - © 2010–2022 Volodymyr Agafonkin
* [Strava - running data](https://strava.com/) - Powered by Strava
* [README template](https://github.com/othneildrew/Best-README-Template)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/STASYA00/whereDoIRun.svg?style=for-the-badge
[contributors-url]: https://github.com/STASYA00/whereDoIRun/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/STASYA00/whereDoIRun.svg?style=for-the-badge
[forks-url]: https://github.com/STASYA00/whereDoIRun/network/members
[stars-shield]: https://img.shields.io/github/stars/STASYA00/whereDoIRun.svg?style=for-the-badge
[stars-url]: https://github.com/STASYA00/whereDoIRun/stargazers
[d3-url]: https://d3js.org/
[Leaflet-url]: https://leafletjs.com/
[Node-url]: https://nodejs.org/en/
[issues-shield]: https://img.shields.io/github/issues/STASYA00/whereDoIRun.svg?style=for-the-badge
[issues-url]: https://github.com/STASYA00/whereDoIRun/issues
[license-shield]: https://img.shields.io/github/license/STASYA00/whereDoIRun.svg?style=for-the-badge
[license-url]: https://github.com/STASYA00/whereDoIRun/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/stanislava-fedorova/
[product-screenshot]: assets/illustrations/UI.png


## Development notes

if you are getting ```FetchError: request to [YOUR_URL_REQUEST] failed, reason: unable to get local issuer certificate``` try:
```$ npm config set strict-ssl false```

if ```127.0.0.1:3000``` works with ```http``` but not with ```express```, try ```localhost:3000``` instead.

if the runs are not coherent with the map, the issue probably lies in backslashes. They should be double in the encoded string.

## TODO:

define a standard for lat-lon