/**
 * Created by nabilbenabbou1 on 6/13/14.
 */

define([
    'handlebars',
    'backbone.marionette',
    // models
    'models/actions/appear',
    'models/actions/disappear',
    'models/actions/move',
    'models/action',
    // views
    'views/workspace/actions/action',
    // templates
    'text!templates/views/workspace/actions.html',
    'modules/kernel/SCI'
], function(
    Handlebars,
    Marionette,
    // models
    AppearModel,
    DisappearModel,
    MoveModel,
    ActionModel,
    // views

    ActionView,
    // templates
    actionsTemplate,
    Kernel
) {

    /**
     * Workspace actions view
     */
    return Marionette.CompositeView.extend({

        template: Handlebars.default.compile(actionsTemplate),
        className: "ActionsList",
        childViewContainer : ".listActions",

        childView: ActionView,

        initialize : function (options) {
            // mandatory arguments
            this.screencast = options.screencast;
            this.screenId = options.screenId;

            this.collection = this.screencast.model.getScreenById(this.screenId).get('actions');

            this.childViewOptions = {
                objects : this.screencast.model.getScreenById(this.screenId).get('objects').models
            };

            /*@remove
            // Specify that the collection we want to iterate, for the childView, is
            // given by the attribute actions.
            if (this.model != null) {
                this.collection = this.model.get('actions');
                // Tell the view to render itself when the
                // model/collection is changed.
                this.model.on('change', this.onChanged(), this);
                if (this.collection != null) {
                    this.collection.on('change', this.onChanged(), this);
                }
            }*/
        },
        templateHelpers: function () {
           return{
               ActionsAvailable: this.collection.getAvailableActions(),
           }
        },
        events: {
          'click .buttonAdd': 'clickedButton',
          'change .addAction': 'addActionChoice'
        },

        clickedButton: function() {
            var type= $('#addActionChoice').val();
            switch (type) {
                case "move":{
                    this.collection.add(new MoveModel());
                    break;
                }
                case "appear":{
                    this.collection.add(new AppearModel());
                    break;
                }
                case "disappear":{
                    this.collection.add(new DisappearModel());
                    break;
                }
                default:
                    this.collection.add(new AppearModel());
            }
            this.$childViewContainer[0].scrollTop=this.$childViewContainer[0].scrollHeight;
        },

        getChildView: function(item) {
            if (item instanceof DisappearModel) {
                return DisappearView;
            };
            if (item instanceof MoveModel) {
                return MoveView;
            };
            if (item instanceof AppearModel) {
                return AppearView;
            };
        },

        onChildviewSelect: function (viewSelected) {
            this.children.each(function(view){
                if (view !== viewSelected) {
                    view.setToggle(false);
                };
            });
        }
    });
});