'use strict';

// eslint-disable-next-line no-unused-vars
const config = {
  style: 'mapbox://styles/kmunoz/clr7htm0x013401qu6sjycz5t',
  accessToken:
    'pk.eyJ1Ijoia211bm96IiwiYSI6ImNsbHdxemd5NTF3Z3Qza3FqZndrc2hjeXgifQ.3UITue1v6QIP9-AISabmag',
  CSV: './Sample_Data.csv',
  center: [-71.020537, -33.342419],
  zoom: 8.6,
  title: 'Central Chile',
  description:
    'Replace with information about your application. Ex. You can search by address to sort the list below by distance. You can also filter the list by language support options, which days a location is open, and whether they have devices to use to complete the survey by phone or online.',
  sideBarInfo: ['Location_Name', 'Type', 'Google_Maps'],
  popupInfo:  ['Location_Name', 'Type', 'Google_Maps'],
  filters: [
    {
      type: 'dropdown',
      title: 'Languages supported: ',
      columnHeader: 'Languages',
      listItems: [
        'Amharic',
        'ASL',
        'Cambodian',
        'Chinese',
        'Danish',
        'English',
        'French',
        'German',
        'Greek',
        'Hindi',
        'Italian',
        'Japanese',
        'Korean',
        'Language Line Services',
        'Norwegian',
        'Oriya',
        'Portuguese',
        'Punjabi',
        'Russian',
        'Somali',
        'Spanish',
        'Swedish',
        'Tagalog',
        'Thai',
        'Tigrinya',
        'Tongan',
        'Vietnamese',
        'Ukranian',
      ],
    },
    {
      type: 'checkbox',
      title: 'Devices available: ',
      columnHeader: 'Devices_available', // Case sensitive - must match spreadsheet entry
      listItems: ['Computer', 'Wi-Fi', 'Adaptive Laptops'], // Case sensitive - must match spreadsheet entry; This will take up to six inputs but is best used with a maximum of three;
    },
    {
      type: 'dropdown',
      title: 'Clients: ',
      columnHeader: 'Clients',
      listItems: [
        'Adults',
        'Disabled',
        'Homeless',
        'Immigrants/Refugees',
        'Low Income',
        'Seniors',
        'Youth: Pre-teen',
        'Youth: Teen',
      ],
    },
  ],
};


map.on('click', 'layer-id', (e) => {
  // Assuming you have a layer with id 'layer-id' for your data points
  const coordinates = e.features[0].geometry.coordinates.slice();
  const properties = e.features[0].properties;

  // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  populatePopup(properties);
});

function populatePopup(data) {
  document.getElementById('locationName').innerText = data.Location_Name || '';
  document.getElementById('latitude').innerText = "Latitude: " + (data.Latitude || '');
  document.getElementById('longitude').innerText = "Longitude: " + (data.Longitude || '');
  document.getElementById('type').innerText = "Type: " + (data.Type || '');
  document.getElementById('googleMaps').innerHTML = data.Google_Maps ? "<a href='" + data.Google_Maps + "'>Google Maps</a>" : '';
}