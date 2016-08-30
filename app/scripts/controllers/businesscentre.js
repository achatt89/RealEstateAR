'use strict';

/**
 * @ngdoc function
 * @name arRealEstateApp.controller:BusinesscentreCtrl
 * @description
 * # BusinesscentreCtrl
 * Controller of the arRealEstateApp
 */
angular.module('arRealEstateApp')
    .controller('BusinesscentreCtrl', function($scope) {

        var container, stats;
        var camera, scene, renderer;

        var mouseX = 0,
            mouseY = 0;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

/*        var texturePath = '../assets/texture_exports/';
        var textureExtension = '.jpg';*/

        var OBJ_MTLPath = '../assets/';

        var OBJFile = 'business_centre.obj';
        var MTLFile = 'business_centre.mtl';
        var TextureFile = 'business_centre.png';

        /*var textureFilePath = [
            { name: 'texture_1', URL: texturePath + 'boss chairVRayCompleteMap' + textureExtension },
            { name: 'texture_2', URL: texturePath + 'bottle003VRayCompleteMap' + textureExtension },
            { name: 'texture_3', URL: texturePath + 'bottle006VRayCompleteMap' + textureExtension },
            { name: 'texture_4', URL: texturePath + 'bottle007VRayCompleteMap' + textureExtension },
            { name: 'texture_5', URL: texturePath + 'bottle008VRayCompleteMap' + textureExtension },
            { name: 'texture_6', URL: texturePath + 'bottle009VRayCompleteMap' + textureExtension },
            { name: 'texture_7', URL: texturePath + 'bottle010VRayCompleteMap' + textureExtension },
            { name: 'texture_8', URL: texturePath + 'chair 1VRayCompleteMap' + textureExtension },
            { name: 'texture_9', URL: texturePath + 'chair 2VRayCompleteMap' + textureExtension },
            { name: 'texture_10', URL: texturePath + 'chair 3VRayCompleteMap' + textureExtension },
            { name: 'texture_11', URL: texturePath + 'chair 4VRayCompleteMap' + textureExtension },
            { name: 'texture_12', URL: texturePath + 'chair 5VRayCompleteMap' + textureExtension },
            { name: 'texture_13', URL: texturePath + 'chair 6VRayCompleteMap' + textureExtension },
            { name: 'texture_14', URL: texturePath + 'chair 7VRayCompleteMap' + textureExtension },
            { name: 'texture_15', URL: texturePath + 'chair 8VRayCompleteMap' + textureExtension },
            { name: 'texture_16', URL: texturePath + 'doorVRayCompleteMap' + textureExtension },
            { name: 'texture_17', URL: texturePath + 'fileVRayCompleteMap' + textureExtension },
            { name: 'texture_18', URL: texturePath + 'floorVRayCompleteMap' + textureExtension },
            { name: 'texture_19', URL: texturePath + 'glassVRayCompleteMap' + textureExtension },
            { name: 'texture_20', URL: texturePath + 'lamp 1VRayCompleteMap' + textureExtension },
            { name: 'texture_21', URL: texturePath + 'lamp 2VRayCompleteMap' + textureExtension },
            { name: 'texture_22', URL: texturePath + 'lamp 3VRayCompleteMap' + textureExtension },
            { name: 'texture_23', URL: texturePath + 'lamp 4VRayCompleteMap' + textureExtension },
            { name: 'texture_24', URL: texturePath + 'laptopVRayCompleteMap' + textureExtension },
            { name: 'texture_25', URL: texturePath + 'Object001VRayCompleteMap' + textureExtension },
            { name: 'texture_26', URL: texturePath + 'Object004VRayCompleteMap' + textureExtension },
            { name: 'texture_27', URL: texturePath + 'Object005VRayCompleteMap' + textureExtension },
            { name: 'texture_28', URL: texturePath + 'photoframeVRayCompleteMap' + textureExtension },
            { name: 'texture_29', URL: texturePath + 'pro screeenVRayCompleteMap' + textureExtension },
            { name: 'texture_30', URL: texturePath + 'projectorVRayCompleteMap' + textureExtension },
            { name: 'texture_31', URL: texturePath + 'shelfVRayCompleteMap' + textureExtension },
            { name: 'texture_32', URL: texturePath + 'slidingVRayCompleteMap' + textureExtension },
            { name: 'texture_33', URL: texturePath + 'tableVRayCompleteMap' + textureExtension }
        ];*/

        init();
        animate();

        function init() {

            container = document.createElement('div');
            document.body.appendChild(container);

            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.x = -160;
            camera.position.y = -50;
            camera.position.z = 0;
            /*camera.lookAt(scene.position);*/
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            /*            var camControls = new THREE.FirstPersonControls(camera);
                        //camControls.lookSpeed = 0.2;
                        //camControls.movementSpeed = 5;
                        //camControls.noFly = true;
                        camControls.lookVertical = true;
                        camControls.constrainVertical = true;
                        camControls.verticalMin = 0.1;
                        camControls.verticalMax = 0.5;
                        //camControls.lon = -150;
                        //camControls.lat = 120;*/

            // scene

            scene = new THREE.Scene();

            var ambient = new THREE.AmbientLight(0xffffff);
            scene.add(ambient);

            var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(40, 40, 40);
            scene.add(directionalLight);

            // model

            var onProgress = function(xhr) {
                if (xhr.lengthComputable) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                    console.log(Math.round(percentComplete, 2) + '% downloaded');
                }
            };

            var onError = function(xhr) {};

            //THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

            var texture = new THREE.Texture();

            //Material LOADER
            var MTLLoader = new THREE.MTLLoader();
            MTLLoader.setPath(OBJ_MTLPath);
            MTLLoader.load(MTLFile, function(materials) {
                materials.preload();

                //Object LOADER
                var OBJLoader = new THREE.OBJLoader();
                OBJLoader.setMaterials(materials);
                OBJLoader.setPath(OBJ_MTLPath);
                OBJLoader.load(OBJFile, function(object) {

                    object.traverse(function(child) {
                        if (child instanceof THREE.Mesh) {
                            child.material.map = texture;
                        }
                    });

                    object.position.y = -100;
                    object.position.x = 1000;
                    object.position.z = -130;
                    scene.add(object);

                }, onProgress, onError);
            });


            //Texture LOADER
            var textureLoader = new THREE.ImageLoader();
            textureLoader.setPath(OBJ_MTLPath);
            textureLoader.load(TextureFile, function(image) {
                texture.image = image;
                texture.needsUpdate = true;
                console.log("Texture OBJ", texture);
            });

            //Render CODE
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            document.addEventListener('mousemove', onDocumentMouseMove, false);
            window.addEventListener('resize', onWindowResize, false);
        }

        function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) / 2;
            mouseY = (event.clientY - windowHalfY) / 2;
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            camera.position.x += (mouseX - camera.position.x) * .05;
            camera.position.y += (-mouseY - camera.position.y) * .05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        }

    });
