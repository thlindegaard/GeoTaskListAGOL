define([
    "dojo/ready", 
    "dojo/_base/declare",
    "dojo/_base/lang",
    "esri/arcgis/utils",
    "esri/IdentityManager",
    "dojo/on",
    "application/App"
],
function(
    ready, 
    declare,  
    lang,
    arcgisUtils,
    IdentityManager,
    on,
    App
) {
    return declare("", null, {
        map:{},
        constructor:function(map){
            this.map=map;
            ready(lang.hitch(this, function(){
                this._addListener();

            }));


        },
        _updateTaskList:function(event){
            var features = event.target.graphics;
            var taskListElement = document.getElementById("taskListDiv");
            taskListElement.innerHTML="<h3>tasks..</h3>";
            for (var i=0; i<features.length; i++)
            {
                var newDiv = document.createElement("div");
                newDiv.innerHTML = features[i].attributes.Title;
                taskListElement.appendChild(newDiv);
            }



        },
        _addListener:function(){
            var featureLayer = this.map.getLayersVisibleAtScale(this.map.getScale())[1];
            on (featureLayer, "update-end", this._updateTaskList);
        }

    });
}
);