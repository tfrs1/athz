# athz

Simple and flexible role-based authorization module and middleware for Express

## Getting Started
Install the module with: `npm install athz`

```javascript
var express = require('express'),
    authentication = require('yourchoice'),
    athz = require('athz'),
    app = express();

app.use(authentication);
app.use(app.router);

app.get('/', athz('user'), function(req, res) {
    res.render('index');
});

app.listen(3000);
```

## Documentation
_(Coming soon)_
```javascript

```

## Examples
```javascript
var express = require('express'),
    authentication = require('yourchoice'),
    athz = require('athz'),
    app = express();

app.use(authentication);
app.use(app.router);

var closeFamily = [
  'mom',
  'dad',
  'sister'
];

var family = [
  closeFamily,
  'aunt',
  'uncle'
];

var friends = [
  'friend',
  'bestFriend'
];

var canSeeSecret = [
  'me',
  family,
  friends
];

app.get('/', function(req, res) {
  res.send('index');
});

app.get('/notSoSecret', athz.any, function(req, res) {
  res.send('notSoSecret');
});

app.get('/secret', athz(canSeeSecret), function(req, res) {
  res.send('secret')
});

app.get('/topSecret', athz('me', closeFamily, 'bestFriend'), function(req, res) {
  res.send('topSecret');
});

app.get('/personal', athz('me'), function(req, res) {
  res.send('personal');
});
```

Error handling
```javascript
app.use(err, req, res, next) {
  if (err instanceof athz.AuthorizationError) {
    res.status(403);
    res.send('Not authorized');
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 - Initial release  
0.2.0 - Redesign
0.2.1 - Now able to authorizes any logged in user (athz.any)

## License
Copyright (c) 2014 Aleksandar Micic  
Licensed under the MIT license.
