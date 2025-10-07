export default {
    alpha: {
        start: 1,
        end: 0,
    },
    scale: {
        start: 0.5,
        end: 0.1,
        minimumScaleMultiplier: 1,
    },
    color: {
        start: '#fff200',
        end: '#ff6f00',
    },
    speed: {
        start: 30,
        end: 10,
        minimumSpeedMultiplier: 1,
    },
    acceleration: {
        x: 0,
        y: 0,
    },
    maxSpeed: 40,
    startRotation: {
        min: 0,
        max: 360,
    },
    noRotation: false,
    rotationSpeed: {
        min: 0,
        max: 0,
    },
    lifetime: {
        min: 0.5,
        max: 1.2,
    },
    blendMode: 'add',
    frequency: 0.001,
    emitterLifetime: 0.2,
    maxParticles: 200,
    pos: {
        x: 0,
        y: 0,
    },
    addAtBack: false,
    spawnType: 'burst',
    spawnCircle: {
        x: 0,
        y: 0,
        r: 80,
    },
};