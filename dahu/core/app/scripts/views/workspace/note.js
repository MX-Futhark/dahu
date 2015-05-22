/**
 * Created by obzota on 22/05/15.
 */

define([
    'handlebars',
    'backbone.marionette',
    'fit',
    // modules
    'modules/events',
    'modules/requestResponse',
    // models
    'models/objects/image',
    'models/objects/mouse',
    'models/objects/tooltip',
    // views
    'views/common/objects/image',
    'views/workspace/objects/mouse',
    'views/workspace/objects/tooltip',
    // templates
    'text!templates/views/workspace/note.html'
], function(
    Handlebars,
    Marionette,
    fit,
    // modules
    events,
    reqres,
    // models
    ImageModel,
    MouseModel,
    TooltipModel,
    // view
    ImageView,
    MouseView,
    TooltipView,
    // templates
    noteTemplate){

    /**
     * Note screen view
     */
    return Marionette.ItemView.extend({
        template: Handlebars.default.compile(noteTemplate),

        className: 'note',

        initialize: function (options) {
            _.extend(this, _.pick(options, ['screencast', 'screenId']));
            kernel.console.log('Initialising noteView');
            this.model = this.screencast.model.getScreenById(this.screenId).get('note');
        },

        onSave: function () {
            this.model.text = this.el.getValue();
        },

        onBeforeSelectedView: function () {
            this.model.text = this.el.getValue();
        }
    });
});