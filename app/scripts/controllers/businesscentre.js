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

        var OBJ_MTLPath = '../assets/business_centre/';

        var OBJFile = 'business_centre.obj';
        var MTLFile = 'business_centre.mtl';
        var TextureFile = 'business_centre.png';

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
            camera.position.y += (mouseY - camera.position.y) * .05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        }

    });
