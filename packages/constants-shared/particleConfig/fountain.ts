export default {
	alpha: { start: 1, end: 1 },
	scale: { start: 1.8, end: 0.2, minimumScaleMultiplier: 1 },
	color: { start: '#fff200', end: '#ff6f00' },
	speed: { start: 30, end: 30, minimumSpeedMultiplier: 1 },
	acceleration: { x: 0, y: 0 },
	maxSpeed: 40,
	startRotation: { min: 0, max: 0 },
	noRotation: false,
	rotationSpeed: { min: 0, max: 0 },
	lifetime: { min: 1, max: 2 },
	blendMode: 'add',
	frequency: 0.01,
	emitterLifetime: -1,
	maxParticles: 200,
	pos: { x: -100, y: 200 }, // left edge of the screen
	addAtBack: false,
	spawnType: 'point',
};
