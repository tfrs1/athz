# athz

Express authorization module and middleware

## Getting Started
Install the module with: `npm install athz`

```javascript
var express = require('express'),
    athz = require('athz'),
    app = express();
    
autz.initialize(app);
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

```javascript
athz.get('/', function(req, res, next) {
  res.render('index');
});

athz.get('/admin', 'admin', function(req, res, next) {
  res.render('admin');
});

athz.get('/users', ['admin', 'moderator'],
  function(req, res, next) {
    res.render('admin');
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Aleksandar Micic  
Licensed under the MIT license.
