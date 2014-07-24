'use strict'

var express = require("express");
var elasticsearch = require('elasticsearch');


var esHost = process.env.ELASTICSEARCH_HOST || 'localhost:9200';
var esLogLEvel = process.env.ELASTICSEARCH_LOG_LEVEL || 'trace';
var esApiVersion = process.env.ELASTICSEARCH_API_VERSION || '1.2';
var esKeepAlive = process.env.ELASTICSEARCH_KEEP_ALIVE || true;

var client = new elasticsearch.Client({
    host: esHost,
    log: esLogLEvel,
    apiVersion: esApiVersion,
    keepAlive: esKeepAlive
});

var app = express();

// Search properties by address
app.get('/API/v1/properties/search/:address', function (req, res) {
    client.search({
        index: 'hub',
        type: 'property',
        body: {
            query: {
                match: {
                    address: req.params.address
                }
            }
        }
    }).then(function (body) {
        var hits = body.hits.hits;
        res.json(hits);
    }, function (error) {
        console.trace(error.message);
        res.json(error);
    });
});


// Search properties by location

// Add a new Property to the index

// catch all route restric to defined urls

var port = Number(process.env.PORT || 5000);
app.listen(port);
