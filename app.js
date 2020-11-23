const path = require('path');

const express = require('express');

const app = express();

const request = require('request');

const PORT = process.env.PORT || 3000;

const GuardianNewsApiKey = '4435c3e7-0a51-49bb-8cbf-d380038dbfd9';
const NYTNewsApiKey = '9zNGFLsCG6VwywIWNqtpmYWGDEHqA0Z8';

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/Guardian/section/:section', (req, res) => {
  let options = {
    url: ''
  };

  if (req.params.section.toLowerCase() === 'home') {
    options.url = 'https://content.guardianapis.com/search?api-key=' + GuardianNewsApiKey + '&section=(sport|business|technology|politics)&show-blocks=all';
  } else {
    options.url = 'https://content.guardianapis.com/' + req.params.section.toLowerCase() + '?api-key=' + GuardianNewsApiKey + '&show-blocks=all';
  }

  request(options, (error, response, body) => {
    if (error) {
      res.send(error.message);
    }

    try {
      res.set('Access-Control-Allow-Origin', '*');
      res.json(response);
    } catch (e) {
      console.log(e);
    }
  });
});
app.get('/NYTimes/section/:section', (req, res) => {
  let options = {
    url: ''
  };

  if (req.params.section.toLowerCase() === 'home') {
    options.url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=' + NYTNewsApiKey;
  } else {
    options.url = 'https://api.nytimes.com/svc/topstories/v2/' + req.params.section.toLowerCase() + '.json?api-key=' + NYTNewsApiKey;
  }

  request(options, (error, response, body) => {
    if (error) {
      res.send(error.message);
    }

    try {
      res.set('Access-Control-Allow-Origin', '*');
      res.json(response);
    } catch (e) {
      console.log(e);
    }
  });
});
app.get('/search/Guardian/:keyword', (req, res) => {
  let options = {
    url: 'https://content.guardianapis.com/search?q=' + req.params.keyword + '&api-key=' + GuardianNewsApiKey + '&show-blocks=all'
  };
  request(options, (error, response, body) => {
    if (error) {
      return error.message;
    }

    try {
      res.set('Access-Control-Allow-Origin', '*');
      res.json(response);
    } catch (e) {
      console.log(e);
    }
  });
});
app.get('/search/NYTimes/:keyword', (req, res) => {
  let options = {
    url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + req.params.keyword + '&api-key=' + NYTNewsApiKey
  };
  request(options, (error, response, body) => {
    if (error) {
      return error.message;
    }

    try {
      res.set('Access-Control-Allow-Origin', '*');
      res.json(response);
    } catch (e) {
      console.log(e);
    }
  });
});
app.get('/article', (req, res) => {
  let options = {
    url: ''
  };

  if (req.query.apiMode === 'Guardian') {
    options.url = 'https://content.guardianapis.com/' + req.query.id + '?api-key=' + GuardianNewsApiKey + '&show-blocks=all';
  } else {
    options.url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(\"' + req.query.id + '\") &api-key=' + NYTNewsApiKey;
  }

  request(options, (error, response, body) => {
    if (error) {
      res.send(error.message);
    }

    try {
      res.set('Access-Control-Allow-Origin', '*');
      res.json(response);
    } catch (e) {
      console.log(e);
    }
  });
});
app.listen(PORT);
