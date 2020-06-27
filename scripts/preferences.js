import settings from 'electron-settings';
WIN = remote.getCurrentWindow();


win.removeMenu()
 
await settings.set('color', {
  name: 'cerulean',
  code: {
    rgb: [0, 179, 230],
    hex: '#003BE6'
  }
});
 
await settings.get('color.name');
// => "cerulean"
 
await settings.get('color.code.rgb[1]');
// => 179