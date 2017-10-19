var ExportedClass = module.exports = Backbone.Model.extend();

var ChoiceCollection = require('../../collection/rules/parts/choiceCollection');
var FeatureCollection = require('../../collection/rules/parts/featureCollection');
var ProficiencyCollection = require('../../collection/rules/parts/proficiencyCollection');

var BackgroundModel = Backbone.Model.extend({
    defaults: {
        choices: null,                  //ChoiceCollection
        description: [],                //List of Strings
        equipment: [],                  //List of Strings
        features: null,                 //FeatureCollection
        name: null,                     //String
        proficiencies: null,            //ProficiencyCollection
        suggestedCharacteristics: null  //SuggestedCharacteristicsModel
    },

    initialize: function(attrs, options) {
        attrs = attrs || {};

        var choiceModels = _.map(attrs.choices, ChoiceCollection.model) || [];
        this.set(BackgroundModel.fields.CHOICES, new ChoiceCollection(choiceModels));

        var featureModels = _.map(attrs.features, FeatureCollection.model) || [];
        this.set(BackgroundModel.fields.FEATURES, new FeatureCollection(featureModels));

        var proficiencyModels = _.map(attrs.proficiencies, ProficiencyCollection.model) || [];
        this.set(BackgroundModel.fields.PROFICIENCIES, new ProficiencyCollection(proficiencyModels));
    },

    getChoices: function() {
        return this.get(BackgroundModel.fields.CHOICES);
    },

    setChoices: function(choiceModels) {
        this.getChoices().reset(choiceModels || []);
        return this;
    },

    getDescription: function() {
        return this.get(BackgroundModel.fields.DESCRIPTION);
    },

    getEquipment: function() {
        return this.get(BackgroundModel.fields.EQUIPMENT);
    },

    getFeatures: function() {
        return this.get(BackgroundModel.fields.FEATURES);
    },

    setFeatures: function(featureModels) {
        this.getFeatures().reset(featureModels || []);
        return this;
    },

    getName: function() {
        return this.get(BackgroundModel.fields.NAME);
    },

    getProficiencies: function() {
        return this.get(BackgroundModel.fields.PROFICIENCIES);
    },

    setProficiencies: function(proficiencyModels) {
        this.getProficiencies().reset(proficiencyModels || []);
        return this;
    },

    getSuggestedCharacteristics: function() {
        return this.get(BackgroundModel.fields.SUGGESTED_CHARACTERISTICS);
    }
},{
    fields: {
        CHOICES: 'choices',
        DESCRIPTION: 'description',
        EQUIPMENT: 'equipment',
        FEATURES: 'features',
        NAME: 'name',
        PROFICIENCIES: 'proficiencies',
        SUGGESTED_CHARACTERISTICS: 'suggestedCharacteristics'
    }
});

_.extend(ExportedClass, BackgroundModel);
ExportedClass.prototype = BackgroundModel.prototype;