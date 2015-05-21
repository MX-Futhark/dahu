/**
 * Created by reyr on 21/05/2015
 */
define([
	'underscore',
	'backbone',
	'uuid'
], function(_, Backbone, UUID){

	var notesModel = Backbone.Model.extend({
		defaults: function () {
			return {
				id: UUID.v4(),
				text: ""
			}
		},

		modifyText: function(newText) {
            this.set('text', newText);
        }
	});

	return notesModel;
});