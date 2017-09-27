var AppStateModel = require('../model/appStateModel');

var YamlController = {
    setupConfig: function() {
        var deferred = $.Deferred();
        var remaining = 3;

        function updateCount() {
            remaining--;
            if (remaining == 0) deferred.resolve();
        }
        setupBackgrounds()
            .done(_.bind(AppStateModel.setBackgroundModel, AppStateModel))
            .always(updateCount);
        setupClasses()
            .done(_.bind(AppStateModel.setClassModel, AppStateModel))
            .always(updateCount);
        setupRaces()
            .done(_.bind(AppStateModel.setRaceModel, AppStateModel))
            .always(updateCount);

        return deferred.promise();
    }
};

function setupBackgrounds() {
    return loadAndParse('/resources/backgrounds.yaml');
}

function setupClasses() {
    return loadAndParse('/resources/classes.yaml');
}

function setupRaces() {
    return loadAndParse('/resources/races.yaml');
}

function loadAndParse(pathToFile) {
    var deferred = $.Deferred();
    $.get(pathToFile)
        .done(function(text) {
            parseYaml(text).done(deferred.resolve).fail(deferred.reject);
        })
        .fail(function() {
            deferred.reject();
        });
    return deferred.promise();
}

function parseYaml(text) {
    var deferred = $.Deferred();
    var data = {text: text};
    $.ajax({
        type: 'POST',
        url: '/api/yaml/parse',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function(resp) {
            resp = _.isArray(resp) ? resp[0] : resp;
            deferred.resolve(resp);
        },
        error: function(resp) {
            deferred.reject();
        }
    });
    return deferred.promise();
}

module.exports = YamlController;