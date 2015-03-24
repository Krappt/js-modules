var Dressformer;

if(typeof Dressformer === 'undefined') {
    Dressformer = {};
}

(function (Dressformer) {

    'use strict';

    /* start Viewport */

    function Viewport(objectId, uuid, viewportType) {
        this.UUID = uuid;
        this.viewportLoad = false;
        this.Object = null;
        this.viewportType = viewportType;

        this.Garment = new Garment(uuid);
        this.Avatar = new Avatar(uuid);
        this.Background = new Background(uuid);
        this.UI = new UI(uuid);
        this.Camera = new Camera(uuid);
        this.System = new System(uuid);

        if(typeof Dressformer.Event != 'undefined') Dressformer.Event.subscribe(this);

        Dressformer.SysMethods.viewports.push(this);

        if(this.viewportType == "flash") Dressformer.SysMethods.addFlashApplication(uuid, objectId);
        else if(this.viewportType == "webgl") Dressformer.SysMethods.addWebGLApplication(uuid, objectId);
    }

    Viewport.prototype = {
        api: function(/* String */ command, /* Object */ data, /* Function */ callback) {
            if(this.viewportLoad && this.Object) callback(this.Object["api"](command, data));
            else {
                var commands =  Dressformer.SysMethods.commands;
                var commandObject = {
                    uuid: this.UUID,
                    command: command,
                    data: data,
                    callback: callback
                };

                for (var i = 0; i < commands.length; i++) {
                    if(commands[i].command == commandObject.command) return;
                }

                Dressformer.SysMethods.commands.push(commandObject);
            }
        },
        init: function() {
            this.viewportLoad = true;
        },
        accept: function( /* Object */ event) {
            return this.UUID == event.uuid;
        },
        onEvent: function(/* Object */ event) {
            if (typeof(this[event.event]) == "function"){
                this[event.event](event);
            }
        }
    };

    function Garment(uuid){ this.UUID = uuid; }
    function Avatar(uuid){ this.UUID = uuid; }
    function Background(uuid){ this.UUID = uuid; }
    function UI(uuid){ this.UUID = uuid; }
    function Camera(uuid){ this.UUID = uuid; }
    function System(uuid){ this.UUID = uuid; }

    Garment.prototype = {
        add: function(data) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Garment.add",data, function(/* Object */ data){

            });
        },
        remove: function(data) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Garment.remove",data, function(/* Object */ data){

            });
        },
        clear: function() {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Garment.clear",null, function(/* Object */ data){

            });
        },
        center: function() {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Garment.center",null, function(/* Object */ data){

            });
        },
        addMaterial: function(data) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Garment.addMaterial",data, function(/* Object */ data){

            });
        }
    };

    Avatar.prototype = {
        bodyAdd: function(data) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Avatar.bodyAdd",data, function(/* Object */ data){

            });
        },
        bodyRemove: function(data) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Avatar.bodyRemove",data, function(/* Object */ data){

            });
        },
        hairAdd: function(data) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Avatar.hairAdd",data, function(/* Object */ data){

            });
        },
        hairRemove: function(data) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Avatar.hairRemove",data, function(/* Object */ data){

            });
        },
        clear: function() {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Avatar.clear",null, function(/* Object */ data){

            });
        }
    };

    Background.prototype = {
        add: function(data) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Background.add",data, function(/* Object */ data){

            });
        },
        remove: function(data) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Background.remove",data, function(/* Object */ data){

            });
        },
        clear: function() {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Background.clear",null, function(/* Object */ data){

            });
        },
        fill: function(data) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Background.fill",data, function(/* Object */ data){

            });
        }
    };

    UI.prototype = {
        splashScreen: function(url) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.UI.splashScreen",{url:url}, function(/* Object */ data){

            });
        },
        loadingScreen: function(url) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.UI.loadingScreen",{url:url}, function(/* Object */ data){

            });
        },
        showLoading: function(showLoading) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.UI.showLoading",{showLoading:showLoading}, function(/* Object */ data){

            });
        },
        loading: function(loading) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.UI.loading",{loading:loading}, function(/* Object */ data){

            });
        },
        rotationButtons: function(show) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.UI.rotationButtons",{show:show}, function(/* Object */ data){

            });
        },
        moveButtons: function(show) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.UI.moveButtons",{show:show}, function(/* Object */ data){

            });
        },
        distanceButtons: function(show) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.UI.distanceButtons",{show:show}, function(/* Object */ data){

            });
        },
        render: function(render) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.UI.render",{render:render}, function(/* Object */ data){

            });
        },
        capture: function(width,height) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.UI.capture",{width:width,height:height}, function(/* Object */ data){

            });
        },
        screenshot: function(callback) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.UI.screenshot",null, function(/* Object */ data){
                callback(data);
            });
        },
        size: function(width,height) {
            var object = Dressformer.SysMethods.getViewport(this.UUID).Object;
            object.style.width = width+"px";
            object.style.height = height+"px";
        },
        show: function(show) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.UI.show",{show:show}, function(/* Object */ data){

            });
        }
    };

    Camera.prototype = {
        sceneRotate: function(pan,tilt) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Camera.sceneRotate",{pan:pan,tilt:tilt}, function(/* Object */ data){

            });
        },
        sceneMove: function(x,y) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Camera.sceneMove",{x:x,y:y}, function(/* Object */ data){

            });
        },
        sceneDistance: function(distance) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.Camera.sceneDistance",{distance:distance}, function(/* Object */ data){

            });
        }
    };

    System.prototype = {
        abortLoading: function(model) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.System.abortLoading",{model:model}, function(/* Object */ data){

            });
        },
        monitoringInterval: function(interval) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.System.monitoringInterval",null, function(/* Object */ data){

            });
        },
        synchronize: function(delegates) {
            Dressformer.SysMethods.getViewport(this.UUID).api("Viewport.System.synchronize",null, function(/* Object */ data){

            });
        },
        playerVersion: function() {
            var version = swfobject.getFlashPlayerVersion();
            return version.major + "." + version.minor + "." + version.release;
        }
    };

    /* end Viewport */

    Dressformer.createViewport = function(objectId, viewportType) {
        return new Viewport(objectId, Dressformer.SysMethods.generateUUID(), viewportType);
    };

    function SysMethods() {

        SysMethods.viewports = [];
        SysMethods.commands = [];
        SysMethods.addApplicationsStack = [];
        SysMethods.swfObjectIsLoad = false;

        SysMethods.getViewport = function(uuid) {
            for (var i = 0; i < SysMethods.viewports.length; i++) {
                var viewport = SysMethods.viewports[i];
                if(viewport.UUID == uuid) return viewport;
            }
            return null;
        };

        SysMethods.stackCommands = function() {
            for (var i = 0; i < SysMethods.commands.length; i++) {
                var command = SysMethods.commands[i];
                Dressformer.SysMethods.getViewport(command.uuid).api(command.command, command.data, command.callback);
            }

            SysMethods.commands = [];
        };

        SysMethods.init = function(data) {
            var viewport = SysMethods.getViewport(data.uuid);
            if(viewport) viewport.init();
            SysMethods.stackCommands();
        };

        SysMethods.generateUUID = function() {
            var d = new Date().getTime();
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
            });
        };

        SysMethods.addFlashApplication = function (/* String */ uuid, /* String */ tagId) {
            // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection.
            var swfVersionStr = "11.8.0";
            // To use express install, set to playerProductInstall.swf, otherwise the empty string.
            var xiSwfUrlStr = Dressformer.viewportDirectory+"swf/playerProductInstall.swf";
            var pageHost = ((document.location.protocol == "https:") ? "https:" : "http:");
            var flashvars = {};
            flashvars.UUID = uuid;
            flashvars.pageHost = pageHost;
            var params = {};
            params.quality = "high";
            params.bgcolor = "#f6f6f6";
            params.wmode = "direct";
            params.allowscriptaccess = "always";
            params.allowfullscreen = "true";
            params.allowFullScreenInteractive = "true";
            var attributes = {};
            attributes.id = uuid;
            attributes.name = uuid;
            attributes.align = "middle";

            swfobject.embedSWF(
                Dressformer.viewportDirectory+"swf/dressformer-viewport.swf", tagId,
                "100%", "100%",
                swfVersionStr, xiSwfUrlStr,
                flashvars, params, attributes, function(event) {
                    if(event.ref) {
                        var viewport = SysMethods.getViewport(uuid);
                        viewport.Object = document.getElementById(uuid);
                    }
                });
            // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
            swfobject.createCSS("#"+tagId, "display:block;text-align:left;");
        };

        SysMethods.addWebGLApplication = function (/* String */ uuid, /* String */ tagId) {
           var viewport = SysMethods.getViewport(uuid),
                appendScript = function (path) {
                    var ref = document.createElement('script');
                    ref.id = uuid;
                    ref.setAttribute("type", "text/javascript");
                    ref.setAttribute("src", Dressformer.viewportDirectory+path);
                    document.getElementsByTagName("head")[0].appendChild(ref);
                };

            appendScript('webgl/libs/jquery-pointerevents.min.js');
            appendScript('webgl/webgl-api.js');

            window.webGLViewportLoaded = function(core) {
                core.UUID = uuid;
                core.tagId = tagId;

                core.mediator.on('Start', function () {
                    viewport.Object = new Dressformer.WebGL(uuid, tagId, core.mediator);
                    Dressformer.SysMethods.init({uuid: uuid});
                });
            };
        };

        return SysMethods;
    }

    Dressformer.SysMethods = SysMethods();
    Dressformer.viewportVersion = null;
})(Dressformer);
