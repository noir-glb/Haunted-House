import * as THREE from 'three'
import {Timer} from 'three/addons/misc/Timer.js'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import Stats from 'stats.js'

// canvas
const canvas = document.querySelector('.webgl')

// gui
const gui = new GUI()

// stats
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

// Scene
const scene = new THREE.Scene()

// textures
const textureLoader = new THREE.TextureLoader()

// floor
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('/floor/forest/color.webp')
floorColorTexture.colorSpace = THREE.SRGBColorSpace
const floorAOTexture = textureLoader.load('./floor/forest/ao.webp')
const floorNormalTexture = textureLoader.load('./floor/forest/normal.webp')
const floorRoughnessTexture = textureLoader.load('./floor/forest/roughness.webp')
const floorHeightTexture = textureLoader.load('./floor/forest/height.png')

floorColorTexture.repeat.set(3, 1)
floorColorTexture.wrapS = THREE.RepeatWrapping

floorAOTexture.repeat.set(3, 1)
floorAOTexture.wrapS = THREE.RepeatWrapping

floorNormalTexture.repeat.set(3, 1)
floorNormalTexture.wrapS = THREE.RepeatWrapping

floorHeightTexture.repeat.set(3, 1)
floorHeightTexture.wrapS = THREE.RepeatWrapping

floorRoughnessTexture.repeat.set(3, 1)
floorRoughnessTexture.wrapS = THREE.RepeatWrapping


// walls
// const mainwallsColorTexture = textureLoader.load('/main-walls/color.webp')
// const mainwallsAOTexture = textureLoader.load('./main-walls/ao.webp')
// const mainwallsNormalTexture = textureLoader.load('./main-walls/normal.webp')
// const mainwallsRoughnessTexture = textureLoader.load('./main-walls/roughness.webp')
// const mainwallsHeightTexture = textureLoader.load('./main-walls/disp.png')

// Garage Walls
const garagewallColorTexture = textureLoader.load('/garage-walls/color.webp')
garagewallColorTexture.colorSpace = THREE.SRGBColorSpace
const garagewallAOTexture = textureLoader.load('./garage-walls/ao.webp')
const garagewallNormalTexture = textureLoader.load('./garage-walls/normal.webp')
const garagewallRoughnessTexture = textureLoader.load('./garage-walls/roughness.webp')
const garagewallHeightTexture = textureLoader.load('./garage-walls/height.webp')
const garagewallMetalnessTexture = textureLoader.load('./garage-walls/metalness.webp')

garagewallColorTexture.repeat.set(5, 1)
garagewallColorTexture.wrapS = THREE.RepeatWrapping

garagewallAOTexture.repeat.set(3, 1)
garagewallAOTexture.wrapS = THREE.RepeatWrapping

garagewallNormalTexture.repeat.set(3, 1)
garagewallNormalTexture.wrapS = THREE.RepeatWrapping

garagewallHeightTexture.repeat.set(3, 1)
garagewallHeightTexture.wrapS = THREE.RepeatWrapping

garagewallRoughnessTexture.repeat.set(3, 1)
garagewallRoughnessTexture.wrapS = THREE.RepeatWrapping

garagewallMetalnessTexture.repeat.set(3, 1)
garagewallMetalnessTexture.wrapS = THREE.RepeatWrapping
// roof
const roofColorTexture = textureLoader.load('/main-roof/color.webp')
roofColorTexture.colorSpace = THREE.SRGBColorSpace
const roofAOTexture = textureLoader.load('./main-roof/ao.webp')
const roofNormalTexture = textureLoader.load('./main-roof/normal.webp')
const roofRoughnessTexture = textureLoader.load('./main-roof/roughness.webp')
const roofHeightTexture = textureLoader.load('./main-roof/height.webp')

roofColorTexture.repeat.set(3, 2)
roofColorTexture.wrapS = THREE.RepeatWrapping
roofColorTexture.wrapT = THREE.RepeatWrapping

roofAOTexture.repeat.set(3, 1)
roofAOTexture.wrapS = THREE.RepeatWrapping
roofColorTexture.wrapT = THREE.RepeatWrapping

roofNormalTexture.repeat.set(3, 1)
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofColorTexture.wrapT = THREE.RepeatWrapping

roofHeightTexture.repeat.set(3, 1)
roofHeightTexture.wrapS = THREE.RepeatWrapping
roofColorTexture.wrapT = THREE.RepeatWrapping

roofRoughnessTexture.repeat.set(3, 1)
roofRoughnessTexture.wrapS = THREE.RepeatWrapping
roofColorTexture.wrapT = THREE.RepeatWrapping

// main-door
const mainDoorColorTexture = textureLoader.load('/main-door/color.webp')
mainDoorColorTexture.colorSpace = THREE.SRGBColorSpace
const mainDoorAOTexture = textureLoader.load('./main-door/ao.webp')
const mainDoorNormalTexture = textureLoader.load('./main-door/normal.webp')
const mainDoorRoughnessTexture = textureLoader.load('./main-door/roughness.webp')
const mainDoorHeightTexture = textureLoader.load('./main-door/height.webp')

// mainDoorColorTexture.repeat.set(3, 1)
// mainDoorColorTexture.wrapS = THREE.RepeatWrapping

// mainDoorAOTexture.repeat.set(3, 1)
// mainDoorAOTexture.wrapS = THREE.RepeatWrapping

// mainDoorNormalTexture.repeat.set(3, 1)
// mainDoorNormalTexture.wrapS = THREE.RepeatWrapping

// mainDoorHeightTexture.repeat.set(3, 1)
// mainDoorHeightTexture.wrapS = THREE.RepeatWrapping

// mainDoorRoughnessTexture.repeat.set(3, 1)
// mainDoorRoughnessTexture.wrapS = THREE.RepeatWrapping

// garage-door
// const garageDoorColorTexture = textureLoader.load('/garage-door/color.webp')
// garageDoorColorTexture.colorSpace = THREE.SRGBColorSpace
// const garageDoorAOTexture = textureLoader.load('./garage-door/ao.webp')
// const garageDoorNormalTexture = textureLoader.load('./garage-door/normal.webp')
// const garageDoorHeightTexture = textureLoader.load('./garage-door/disp.webp')
// const garageDoorMetalnessTexture = textureLoader.load('./garage-door/metal.webp')

// lower-window
// const lowerWindowColorTexture = textureLoader.load('/lower-window/color.webp')
// const lowerWindowAOTexture = textureLoader.load('./lower-window/ao.webp')
// const lowerWindowNormalTexture = textureLoader.load('./lower-window/normal.webp')
// const lowerWindowRoughnessTexture = textureLoader.load('./lower-window/roughness.webp')
// const lowerWindowHeightTexture = textureLoader.load('./lower-window/height.webp')

// upper-window
const upperWindowAlphaTexture = textureLoader.load('/upper-window/alpha.jpg')
const upperWindowColorTexture = textureLoader.load('/upper-window/color.webp')
upperWindowColorTexture.colorSpace = THREE.SRGBColorSpace
const upperWindowAOTexture = textureLoader.load('./upper-window/ao.webp')
const upperWindowNormalTexture = textureLoader.load('./upper-window/normal.webp')
const upperWindowRoughnessTexture = textureLoader.load('./upper-window/roughness.webp')
const upperWindowHeightTexture = textureLoader.load('./upper-window/height.webp')
const upperWindowMetalnessTexture = textureLoader.load('./upper-window/metallic.webp')

// graves
const graveColorTexture = textureLoader.load('/graves/color.webp')
graveColorTexture.colorSpace = THREE.SRGBColorSpace
const graveAOTexture = textureLoader.load('./graves/ao.webp')
const graveNormalTexture = textureLoader.load('./graves/normal.webp')
const graveRoughnessTexture = textureLoader.load('./graves/roughness.webp')
const graveMetalnessTexture = textureLoader.load('./graves/metalness.webp')
const graveHeightTexture = textureLoader.load('./graves/height.webp')


// bushes
const bushColorTexture = textureLoader.load('/bushes/color.webp')
bushColorTexture.colorSpace = THREE.SRGBColorSpace
const bushAOTexture = textureLoader.load('./bushes/ao.webp')
const bushNormalTexture = textureLoader.load('./bushes/normal.webp')


// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 20, 20),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorAOTexture,
    normalMap: floorNormalTexture,
    roughnessMap: floorRoughnessTexture,
    displacementMap: floorHeightTexture,
    displacementScale: 0.4,
    displacementBias: -0.05
  })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

// House
const house = new THREE.Group()
scene.add(house)

// House- mid block
const midBlock = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  new THREE.MeshStandardMaterial({
    map: garagewallColorTexture,
    aoMap: garagewallAOTexture,
    roughnessMap: garagewallRoughnessTexture,
    metalnessMap: garagewallMetalnessTexture,
    normalMap: garagewallNormalTexture,
    displacementMap: garagewallHeightTexture,
    displacementScale: 0.0001
  })
)
// midBlock.material.wireframe = true
midBlock.position.y += 1
house.add(midBlock)

// House- right block
const rightBlock = new THREE.Mesh(
  new THREE.BoxGeometry(2,1,2),
  new THREE.MeshStandardMaterial({
    map:garagewallColorTexture,
    aoMap:garagewallAOTexture,
    roughnessMap:garagewallRoughnessTexture,
    metalnessMap: garagewallMetalnessTexture,
    normalMap:garagewallNormalTexture,
    displacementMap:garagewallHeightTexture,
    displacementScale: 0.0001
  })
)
rightBlock.position.y += 0.5 
rightBlock.position.x += 2 
house.add(rightBlock)

// left block- roof
const leftRoof = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1.5, 0.5, 4, 1),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofAOTexture,
    roughnessMap: roofRoughnessTexture,
    normalMap: roofNormalTexture,
    displacementMap: roofHeightTexture,
    displacementScale: 0.0001
  })
)
leftRoof.position.y += 1.25
leftRoof.position.x -= 2.05
leftRoof.rotation.y = Math.PI * 0.25
house.add(leftRoof)

// house- right block
const leftBlock = new THREE.Mesh(
  new THREE.BoxGeometry(2,1,2),
  new THREE.MeshStandardMaterial({
    map: garagewallColorTexture,
    aoMap: garagewallAOTexture,
    roughnessMap: garagewallRoughnessTexture,
    metalnessMap: garagewallMetalnessTexture,
    normalMap: garagewallNormalTexture,
    displacementMap: garagewallHeightTexture,
    displacementScale: 0.0001
  })
)
leftBlock.position.y += 0.5 
leftBlock.position.x -= 2 
house.add(leftBlock)

// right block- roof
const rightRoof = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1.5, 0.5, 4, 1),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofAOTexture,
    roughnessMap: roofRoughnessTexture,
    normalMap: roofNormalTexture,
    displacementMap: roofHeightTexture,
    displacementScale: 0.0001
  })
)
rightRoof.position.y += 1.25
rightRoof.position.x += 2.05
rightRoof.rotation.y = Math.PI * 0.25
house.add(rightRoof)

// roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(2, 1, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofAOTexture,
    roughnessMap: roofRoughnessTexture,
    normalMap: roofNormalTexture,
    displacementMap: roofHeightTexture,
    displacementScale: 0.0001
  })
)
roof.position.y += 2.5 
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// garageDoor
const rightDoor = new THREE.Mesh(
  new THREE.PlaneGeometry(1.2,1),
  new THREE.MeshStandardMaterial({
    color: 'red',
    map: roofColorTexture,
    aoMap: roofAOTexture,
    // metalnessMap: roofMetalnessTexture,
    normalMap: roofNormalTexture,
    displacementMap: roofHeightTexture,
    displacementScale: 0.0001
  })
)
rightDoor.position.y += 0.5
rightDoor.position.x += 2
rightDoor.position.z += 1 + 0.001
house.add(rightDoor)

// mainDoor
const leftDoor = new THREE.Mesh(
  new THREE.PlaneGeometry(0.6,0.8),
  new THREE.MeshStandardMaterial({
    map: mainDoorColorTexture, 
    aoMap: mainDoorAOTexture,
    roughnessMap: mainDoorRoughnessTexture,
    normalMap: mainDoorNormalTexture,
    displacementMap: mainDoorHeightTexture,
    displacementScale: 0.0001
  })
)
leftDoor.position.y += 0.4
leftDoor.position.x -= 2
leftDoor.position.z += 1 + 0.001
house.add(leftDoor)

// windows
const Window = new THREE.Mesh(
  new THREE.PlaneGeometry(0.5, 0.8),
  new THREE.MeshStandardMaterial({
    color: '#888888',
    map: upperWindowColorTexture,
    aoMap: upperWindowAOTexture,
    roughnessMap: upperWindowRoughnessTexture,
    normalMap: upperWindowNormalTexture,
    displacementMap: upperWindowHeightTexture,
    displacementScale: 0.005
  })
)

const window1 = Window.clone()
window1.position.y += 0.6
window1.position.x += 0.4
window1.position.z += 1.001
house.add(window1)

const window2 = Window.clone()
window2.position.y += 0.6
window2.position.x -= 0.4
window2.position.z += 1.001
house.add(window2)

const window3 = Window.clone()
window3.position.y += 1.6
// window3.position.x -= 0
window3.position.z += 1.001
window3.rotation.z = Math.PI * 0.5
house.add(window3)

// bushes
const bushes = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),
    new THREE.MeshStandardMaterial({
      map: bushColorTexture,  
      aoMap: bushAOTexture,
      normalMap: bushNormalTexture
    })
)

// bushes.material.wireframe = true
const bush1 = bushes.clone()
bush1.position.set(0.8, 0.2, 1.3)
bush1.scale.setScalar(0.4)
bush1.rotation.x = -0.75

const bush2 = bushes.clone()
bush2.position.set(1.4, 0.1, 1.2)
bush2.scale.setScalar(0.25)
bush2.rotation.x = -0.75

const bush3 = bushes.clone()
bush3.position.set(-1, 0.1, 1.3)
bush3.scale.setScalar(0.4)
bush3.rotation.x = -0.75

const bush4 = bushes.clone()
bush4.position.set(-2.6, 0.05, 1.2)
bush4.scale.setScalar(0.3)
bush4.rotation.x = -0.75

// graves
const graveGeomemtry = new THREE.BoxGeometry(0.4, 0.6, 0.1)
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveAOTexture,
  roughnessMap: graveRoughnessTexture,
  metalnessMap: graveMetalnessTexture,
  normalMap: graveNormalTexture,
  displacementMap: graveHeightTexture,
  displacementScale: 0.0001
})

const graves = new THREE.Group()
house.add(graves)

for(let i=0; i<25; i++){

  const angle = Math.random() * Math.PI * 2
  const radius = 4 + Math.random() * 4
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius
  // geometry
  const grave = new THREE.Mesh(graveGeomemtry, graveMaterial)
  grave.position.x = x
  grave.position.y = Math.random() * 0.4
  grave.position.z = z

  grave.rotation.x = (Math.random() - 0.5) * 0.4
  grave.rotation.y = (Math.random() - 0.5) * 0.8
  grave.rotation.z = (Math.random() - 0.5) * 0.4
 
  // adding to scene
  graves.add(grave)

}

house.add(bush1, bush2, bush3, bush4)
// Sizes
const sizes = {
width: window.innerWidth,
height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 8
camera.position.y = 2
camera.position.x = 4
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({
canvas:canvas,
antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

// light above the door
const aboveDoor = new THREE.PointLight('white', 5)
aboveDoor.position.y += 0.9
aboveDoor.position.x -= 2
aboveDoor.position.z += 1 + 0.001
house.add(aboveDoor)

const aboveGarageDoor = new THREE.PointLight('white', 5)
aboveGarageDoor.position.y += 0.9
aboveGarageDoor.position.x += 2
aboveGarageDoor.position.z += 1 + 0.001
house.add(aboveGarageDoor)
// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// screenSize
window.addEventListener('resize', ()=>{
// update sizes
sizes.width = window.innerWidth,
sizes.height = window.innerHeight,

// update camera
camera.aspect = sizes.width / sizes.height
camera.updateProjectionMatrix()

// update renderer
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Full Screen
window.addEventListener('dblclick',(event)=>{
if(!document.fullscreenElement){
canvas.requestFullscreen()
} else{
document.exitFullscreen()
}
})

// fog
scene.fog = new THREE.FogExp2('white', 0.05)

// Animate
const timer = new Timer()
const tick = ()=>{
  stats.begin()
  timer.update()
  const elapsedTime = timer.getElapsed()
  controls.update()
  renderer.render(scene, camera)
  stats.end()
  window.requestAnimationFrame(tick)
}
tick()