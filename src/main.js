import * as THREE from 'three'
import {Timer} from 'three/addons/misc/Timer.js'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import Stats from 'stats.js'
import {Sky} from 'three/addons/objects/Sky.js'

// canvas
const canvas = document.querySelector('.webgl')

// gui
// const gui = new GUI()

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
const roofColorTexture = textureLoader.load('./roof/color.webp')
roofColorTexture.colorSpace = THREE.SRGBColorSpace
const roofAOTexture = textureLoader.load('./roof/ao.webp')
const roofNormalTexture = textureLoader.load('./roof/normal.webp')
const roofRoughnessTexture = textureLoader.load('./roof/roughness.webp')
const roofHeightTexture = textureLoader.load('./roof/height.webp')

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
const garageDoorColorTexture = textureLoader.load('/main-roof/color.webp')
garageDoorColorTexture.colorSpace = THREE.SRGBColorSpace
const garageDoorAOTexture = textureLoader.load('./main-roof/ao.webp')
const garageDoorNormalTexture = textureLoader.load('./main-roof/normal.webp')
const garageDoorHeightTexture = textureLoader.load('./main-roof/height.webp')

// lower-window
// const lowerWindowColorTexture = textureLoader.load('/lower-window/color.webp')
// const lowerWindowAOTexture = textureLoader.load('./lower-window/ao.webp')
// const lowerWindowNormalTexture = textureLoader.load('./lower-window/normal.webp')
// const lowerWindowRoughnessTexture = textureLoader.load('./lower-window/roughness.webp')
// const lowerWindowHeightTexture = textureLoader.load('./lower-window/height.webp')

// upper-window
// const upperWindowAlphaTexture = textureLoader.load('/upper-window/alpha.jpg')
const upperWindowColorTexture = textureLoader.load('/upper-window/color.webp')
upperWindowColorTexture.colorSpace = THREE.SRGBColorSpace
const upperWindowAOTexture = textureLoader.load('./upper-window/ao.webp')
const upperWindowNormalTexture = textureLoader.load('./upper-window/normal.webp')
const upperWindowRoughnessTexture = textureLoader.load('./upper-window/roughness.webp')
const upperWindowHeightTexture = textureLoader.load('./upper-window/height.webp')
// const upperWindowMetalnessTexture = textureLoader.load('./upper-window/metallic.webp')

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
  new THREE.PlaneGeometry(20, 20, 50, 50),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    // opacity: 0.5,
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
    color: '#86ae48',
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
    color: '#86ae48',
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
    color: '#86ae48',
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
    map: garageDoorColorTexture,
    aoMap: garageDoorAOTexture,
    // metalnessMap: garageDoorMetalnessTexture,
    normalMap: garageDoorNormalTexture,
    displacementMap: garageDoorHeightTexture,
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
const bushGeometry = new THREE.SphereGeometry(1, 64, 64)
const bushMaterial = new THREE.MeshStandardMaterial({
      map: bushColorTexture,  
      aoMap: bushAOTexture,
      normalMap: bushNormalTexture
    })

// bushes.material.wireframe = true
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.position.set(0.8, 0.2, 1.3)
bush1.scale.setScalar(0.4)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.position.set(1.4, 0.1, 1.2)
bush2.scale.setScalar(0.25)
bush2.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.position.set(-1, 0.1, 1.3)
bush3.scale.setScalar(0.4)
bush3.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
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
  grave.position.y = Math.random() * 0.3
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
camera.position.y = 1
camera.position.x = 4
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({
canvas:canvas,
antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.12)
scene.add(ambientLight)

// light above the door
const aboveDoor = new THREE.PointLight('#eabf20', 3)
aboveDoor.position.y += 0.9
aboveDoor.position.x -= 2
aboveDoor.position.z += 1 + 0.003
house.add(aboveDoor)

const aboveGarageDoor = new THREE.PointLight('#eabf20', 3)
aboveGarageDoor.position.y += 0.9
aboveGarageDoor.position.x += 2
aboveGarageDoor.position.z += 1 + 0.003
house.add(aboveGarageDoor)

// gui for lights
// gui.add(directionalLight, 'intensity').min(0).max(3).step(0.01).name('dr light')
// gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001).name('am light')
// gui.add(aboveDoor, 'intensity').min(0).max(5).step(0.01).name('door light')
// gui.add(aboveGarageDoor, 'intensity').min(0).max(5).step(0.01).name('garage light')

// ghost lights
const ghost1 = new THREE.PointLight('#8800ff', 1)
const ghost2 = new THREE.PointLight('#ff0088', 1)
const ghost3 = new THREE.PointLight('#E6534E', 1)

house.add(ghost1, ghost2, ghost3)

// shadow
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// light shadow
directionalLight.castShadow = true
aboveDoor.castShadow = true
aboveGarageDoor.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

// walls shadow
midBlock.castShadow = true
midBlock.receiveShadow = true
leftBlock.castShadow = true
leftBlock.receiveShadow = true
rightBlock.castShadow = true
rightBlock.receiveShadow = true

// roof shadow
roof.castShadow = true
leftRoof.castShadow = true
rightRoof.castShadow = true

// bushes
bush1.castShadow = true
bush1.receiveShadow = true  

bush2.castShadow = true
bush2.receiveShadow = true

bush3.castShadow = true
bush3.receiveShadow = true

bush4.castShadow = true
bush4.receiveShadow = true

// graves shadow
for(const grave of graves.children){
  grave.castShadow = true
  grave.receiveShadow = true
}

// floor shadow
floor.receiveShadow = true

// shadow mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 25

aboveGarageDoor.shadow.mapSize.width = 256
aboveGarageDoor.shadow.mapSize.height = 256

aboveGarageDoor.shadow.mapSize.width = 256
aboveGarageDoor.shadow.mapSize.height = 256

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10 

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10 

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10 


// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minPolarAngle = Math.PI / 4; 
controls.maxPolarAngle = Math.PI / 2.1; 
controls.minDistance = 4
controls.maxDistance = 12

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

// sky
const sky = new Sky()
sky.scale.setScalar(100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038,-0.95)


// fog
scene.fog = new THREE.FogExp2('#14333e', 0.11)
// gui.add(scene.fog, 'density').min(0).max(0.5).step(0.001)

// Animate
const timer = new Timer()
const tick = ()=>{
  // stats
  stats.begin()

  // timer update
  timer.update()

  const elapsedTime = timer.getElapsed()

  const ghost1angle = elapsedTime * 0.4
  ghost1.position.x = Math.sin(ghost1angle) * 4
  ghost1.position.z = Math.cos(ghost1angle) *4
  ghost1.position.y = Math.sin(ghost1angle) * Math.sin(ghost1angle * 2.34) * Math.sin(ghost1angle * 3.25)

  const ghost2angle = -elapsedTime * 0.34
  ghost2.position.x = Math.sin(ghost2angle) * 6
  ghost2.position.z = Math.cos(ghost2angle) * 6
  ghost2.position.y = Math.sin(ghost2angle) * Math.sin(ghost2angle * 2.34) * Math.sin(ghost2angle * 3.25)

  const ghost3angle = elapsedTime * 0.23
  ghost3.position.x = Math.sin(ghost3angle) * 7
  ghost3.position.z = Math.cos(ghost3angle) * 7
  ghost3.position.y = Math.sin(ghost3angle) * Math.sin(ghost3angle * 2.34) * Math.sin(ghost3angle * 3.25)


  controls.update()

  renderer.render(scene, camera)
  stats.end()

  window.requestAnimationFrame(tick)
}
tick()