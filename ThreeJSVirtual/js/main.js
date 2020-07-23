/*
Original Author
Copyright (c) 2014 Norik Davtian
URL : https://github.com/NorikDavtian/ThreeJS-360-Panorama/blob/master/LICENSE
*/
"use strict";
var camera,
    mesh,
        scene,
        element = document.getElementById('demo'), // Inject scene into this
        renderer,
        onPointerDownPointerX,
        onPointerDownPointerY,
        onPointerDownLon,
        onPointerDownLat,
        fov = 70, // Field of View
        isUserInteracting = false,
        lon = 0,
        lat = 0,
        phi = 0,
        theta = 0,
        onMouseDownMouseX = 0,
        onMouseDownMouseY = 0,
        onMouseDownLon = 0,
        onMouseDownLat = 0,
        width = 1024, // int || window.innerWidth || default 4:3
        height = 768, // int || window.innerHeight || default 4:3
        ratio = width / height;
var defSrc = randomImg();   //'img/TestImg.JPG'
var texture = THREE.ImageUtils.loadTexture(defSrc, new THREE.UVMapping(), function() {
    init();
    animate();
});
function init() {
    camera = new THREE.PerspectiveCamera(fov, ratio, 1, 1000);
    scene = new THREE.Scene();
    mesh = new THREE.Mesh(new THREE.SphereGeometry(500, 60, 40), new THREE.MeshBasicMaterial({map: texture}));
    mesh.scale.x = -1;
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    element.appendChild(renderer.domElement);
    element.addEventListener('mousedown', onDocumentMouseDown, false);
    element.addEventListener('mousewheel', onDocumentMouseWheel, false);
    element.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);
    window.addEventListener('resize', onWindowResized, false);
    onWindowResized(null);
}
function onWindowResized(event) {
//    renderer.setSize(window.innerWidth, window.innerHeight);
//    camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
    renderer.setSize(width, height);
    camera.projectionMatrix.makePerspective(fov, ratio, 1, 1100);
}
function onDocumentMouseDown(event) {
    event.preventDefault();
    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
    isUserInteracting = true;
    element.addEventListener('mousemove', onDocumentMouseMove, false);
    element.addEventListener('mouseup', onDocumentMouseUp, false);
}
function onDocumentMouseMove(event) {
    lon = (event.clientX - onPointerDownPointerX) * -0.175 + onPointerDownLon;
    lat = (event.clientY - onPointerDownPointerY) * -0.175 + onPointerDownLat;
}
function onDocumentMouseUp(event) {
    isUserInteracting = false;
    element.removeEventListener('mousemove', onDocumentMouseMove, false);
    element.removeEventListener('mouseup', onDocumentMouseUp, false);
}
function onDocumentMouseWheel(event) {
    // WebKit
    if (event.wheelDeltaY) {
        fov -= event.wheelDeltaY * 0.05;
        // Opera / Explorer 9
    } else if (event.wheelDelta) {
        fov -= event.wheelDelta * 0.05;
        // Firefox
    } else if (event.detail) {
        fov += event.detail * 1.0;
    }
    if (fov < 45 || fov > 90) {
        fov = (fov < 45) ? 45 : 90;
    }
    camera.projectionMatrix.makePerspective(fov, ratio, 1, 1100);
}
function animate() {
    requestAnimationFrame(animate);
    render();
}
function render() {
    if (isUserInteracting === false) {
        lon += .05;
    }
    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);
    camera.position.x = 100 * Math.sin(phi) * Math.cos(theta);
    camera.position.y = 100 * Math.cos(phi);
    camera.position.z = 100 * Math.sin(phi) * Math.sin(theta);
    var log = ("x: " + camera.position.x);
    log = log + ("<br/>y: " + camera.position.y);
    log = log + ("<br/>z: " + camera.position.z);
    log = log + ("<br/>fov: " + fov);
    document.getElementById('log').innerHTML = log;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
function chgImg(string)
{
    alert("Main");
}
function chgToSq()
{
    width = 1024, // int || window.innerWidth
    height = 768, // int || window.innerHeight
    ratio = width / height;
    /*
    texture = THREE.ImageUtils.loadTexture('img/TestImg.JPG', new THREE.UVMapping(), function() {
        init();
        animate();
    });
    */
   renderer.setSize(width, height);
   camera.projectionMatrix.makePerspective(fov, ratio, 1, 1100);
}
function chgToWide()
{
    width = 1280, // int || window.innerWidth
    height = 720, // int || window.innerHeight
    ratio = width / height;
    /*
    texture = THREE.ImageUtils.loadTexture('img/TestImg.JPG', new THREE.UVMapping(), function() {
        init();
        animate();
    });
    */
   renderer.setSize(width, height);
   camera.projectionMatrix.makePerspective(fov, ratio, 1, 1100);
}
function chgRes(iWidth, iHeight)
{
    width = iWidth;
    height = iHeight;
    ratio = width / height;
    renderer.setSize(width, height);
    camera.projectionMatrix.makePerspective(fov, ratio, 1, 1100);
}
function chgImg(item)
{
    var newSrc = '';
    if(item != undefined)
    {   
        switch(item)
        {
            case 'Dry Kitchen Progress':
                newSrc = 'img/Demo/R0010036.JPG';
                break;
            case 'Master Bedroom Progress':
                newSrc = 'img/Demo/R0010048.JPG';
                break;
            case 'Living Room Progress':
                newSrc = 'img/Demo/R0010035.JPG';
                break;
            default:
                newSrc = randomImg();
                break;
        }
        mesh.material.map = THREE.ImageUtils.loadTexture(newSrc);
        mesh.material.needsUpdate = true;
    }
   
   //init();
   //animate();
   //onWindowResized(null);
}

function randomImg()
{
    var rNum = Math.round(Math.random() * 17);
    var rImg = '';
    switch(rNum)
    {
        case 1:
            rImg = 'img/Demo/R0010035.JPG';
            break;
        case 2:
            rImg = 'img/Demo/R0010036.JPG';
            break;
        case 3:
            rImg = 'img/Demo/R0010037.JPG';
            break;
        case 4:
            rImg = 'img/Demo/R0010038.JPG';
            break;
        case 5:
            rImg = 'img/Demo/R0010039.JPG';
            break;
        case 6:
            rImg = 'img/Demo/R0010040.JPG';
            break;
        case 7:
            rImg = 'img/Demo/R0010042.JPG';
            break;
        case 8:
            rImg = 'img/Demo/R0010043.JPG';
            break;
        case 9:
            rImg = 'img/Demo/R0010044.JPG';
            break;
        case 10:
            rImg = 'img/Demo/R0010045.JPG';
            break;
        case 11:
            rImg = 'img/Demo/R0010046.JPG';
            break;
        case 12:
            rImg = 'img/Demo/R0010047.JPG';
            break;
        case 13:
            rImg = 'img/Demo/R0010048.JPG';
            break;
        case 14:
            rImg = 'img/Demo/R0010049.JPG';
            break;
        case 15:
            rImg = 'img/Demo/R0010050.JPG';
            break;
        case 16:
            rImg = 'img/Demo/R0010051.JPG';
            break;
        case 17:
        default:
            rImg = 'img/Demo/R0010052.JPG';
            break;
    }
    return rImg;
}