function randomColor() {
    gsap.to('h1', { 
        duration: gsap.utils.random(0.2, 0.6), 
        // using CSS var
        '--randomColor': "rgb(random(0,255,1), random(0,255,1), random(0, 255,1))",
        onComplete: randomColor 
    })
}
function randomGreenishColor() {
    gsap.to('p', { 
        duration: gsap.utils.random(0.6, 0.8), 
        // using tag
        'color': "rgb(random(0,155,100), random(1,255,0), random(155,0,1))", // tend to green
        onComplete: randomGreenishColor 
    })
}
gsap.registerEffect({
    name: "spin360",
    effect: (targets, props) => {
        return gsap.to(targets, {
            duration: props.duration,
            delay: props.delay,
            rotation: 360,
            ease: 'power3.out'
        })
    },
    defaults: {
        duration: .5
    }
})
gsap.registerEffect({
    name: "staggerJump",
    effect: (targets, props) => {
        return gsap.to(
            targets,
            {  ease: "power2.out", keyframes: [
                {stagger: 0.3, y: "random(-30%, -100%)"},
                // possibility to use chained timelines instead of negative delay
                {stagger: 0.3, y: "0", delay: -0.7}, 
            ] }
          );
    },
    defaults: {
        duration: .2
    }
})

/******************/

const TL_APPEAR = gsap.timeline({
    defaults: {
        duration: 1,
        ease: 'power2.out',
    },
    onComplete: () => gsap.effects.staggerJump('img')
})

TL_APPEAR
.from('.img1', {autoAlpha: 0, y: -50})
.from('.img2', {autoAlpha: 0, y: -50}, '-=.6')
.from('.img3', {autoAlpha: 0, y: -50}, '-=.6')
.addLabel('imagesVisibleTreshold')
.from('h1', {autoAlpha: 0, y: -50})
.from('p', {autoAlpha: 0, y: -50}, '-=.75')
.add(() => gsap.effects.spin360('.img3', {delay: 1}))
.add(randomColor)
.add(randomGreenishColor)