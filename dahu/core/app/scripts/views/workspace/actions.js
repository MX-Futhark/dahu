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
    //modules
    'modules/kernel/SCI',
    'modules/utils/exceptions'
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
    //modules
    Kernel,
    Exceptions
) {

    /**
     * Workspace actions view
     */
    return Marionette.CompositeView.extend({

        template: Handlebars.default.compile(actionsTemplate),
        className: "actionsListContainer",
        childViewContainer : ".actionsList",

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
               actionsAvailable: this.collection.getAvailableActions(),
           }
        },
        triggers: {
          "click .buttonAdd": "create:action"
        },

        onCreateAction: function() {
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
                default:{
                    /*var filename=this.screencast.model.getProjectFilename();
                    throw new Exceptions.IOError("this type of action doesn't exist.concerned project #{project}",{
                    project:filename
                    });*/
                    kernel.console.error("this type of action doesn't exist");  
                }
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