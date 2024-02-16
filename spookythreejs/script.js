const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
const textureLoader = new THREE.TextureLoader()

let composer

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const params = {
    exposure: 0,
    bloomStrength: 0.5,
    bloomThreshold: .5,
    bloomRadius: 1
}

// Base camera
const camera = new THREE.PerspectiveCamera(10, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 18
camera.position.y = 8
camera.position.z = 20
scene.add(camera)

// Controls
const controls = new THREE.OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = true
controls.enablePan = true
controls.minDistance = 20
controls.maxDistance = 40
controls.minPolarAngle = Math.PI / 4
controls.maxPolarAngle = Math.PI / 2

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,

})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

// Materials
const candleMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 1.0 }, 
        delay: { value: 1.0 }, 
        colorSpeed: { value: 5.0 }, 
        baseColor: { value: new THREE.Color(0xFFD7BC) }
    },
    vertexShader: document.getElementById( 'vertexshaderCandle' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshaderCandle' ).textContent,
})

const bubbleMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0.0 },
    },
    vertexShader: document.getElementById( 'vertexshaderBubble' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshaderBubble' ).textContent,
})

const doorMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 10.0 },
        resolution: { value: new THREE.Vector2() },
      },
    vertexShader: document.getElementById( 'vertexshaderDoor' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshaderDoor' ).textContent,
})

const bakedTexture = textureLoader.load('https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room07/e98dea009fb4cca71d5291097d3d0db49ba1417f/dist/baked.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

const bakedMaterial = new THREE.MeshBasicMaterial({
    map: bakedTexture,
    side: THREE.DoubleSide,
})

const bubbles = ['Sphere010', 'Sphere011', 'Sphere012', 'Sphere020', 'Sphere021']
const candle = [ 'Sphere001', 'Sphere002', 'Sphere003', 'Sphere004', 'Sphere005','Sphere006', 'Sphere007', 'Sphere008', 'Sphere015', 'Sphere016', 'Sphere017', 'Sphere018', 'Sphere019']

//Loader
const loader = new THREE.GLTFLoader()

loader.load( 'https://rawcdn.githack.com/ricardoolivaalonso/ThreeJS-Room07/e98dea009fb4cca71d5291097d3d0db49ba1417f/dist/model.glb',
(gltf) => {
    const model = gltf.scene
        model.traverse( child => {
            child.material = bakedMaterial
            if (candle.includes(child.name)) child.material = candleMaterial 
            if (bubbles.includes(child.name)) child.material = bubbleMaterial
            if (child.name === 'Puerta') child.material = doorMaterial
        })
        scene.add(model)
    },
    ( xhr ) => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
)

const renderScene = new THREE.RenderPass( scene, camera )

const bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( sizes.width, sizes.height ), 1, 1, 1 )

bloomPass.threshold = params.bloomThreshold
bloomPass.strength = params.bloomStrength
bloomPass.radius = params.bloomRadius

composer = new THREE.EffectComposer( renderer )
composer.addPass( renderScene )
composer.addPass( bloomPass )

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	composer.setSize(sizes.width, sizes.height)
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Animation
const tick = () => {
    candleMaterial.uniforms.time.value += 0.075
    bubbleMaterial.uniforms.time.value += 0.025
    doorMaterial.uniforms.time.value += 0.02

    controls.update()
    // renderer.render(scene, camera) 
    composer.render()
    window.requestAnimationFrame(tick)
}

tick()