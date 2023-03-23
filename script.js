function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
init()


var a = -200
setInterval(function(){
    if(a >= -1200){
        gsap.to("#inner h1",{
            opacity:1,
        })
        gsap.to("#inner h1",{
            delay:1,
            y:a+"%",
            opacity:1,
        })
        // console.log(a)
    }else{
        a = 0
        gsap.to("#inner h1",{
            y:"0%",
            opacity:0,
            duration:0
        })
    }
    a -= 200
    
},2000)


gsap.from("#nav", {
    y: -100,
    duration: 0.8,
    delay: 0.2,
    opacity: 0
})

gsap.from("#platform", {
    y: 200,
    duration: 0.9,
    delay: 0,
    // opacity:0
})
gsap.from("#gola", {
    y: -800,
    duration: 1.2,
    delay: 0.6,
    opacity: 0
})
gsap.from("#page1>h1", {
    y: 100,
    duration: 1.2,
    delay: 1.6,
    opacity: 0,
    onUpdate: function () {
        $('#page1>h1').textillate({ in: { effect: 'fadeIn' } });
    }
})
var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        // markers: true,
        start: "top -5%",
        scrub: 3
    }
})


var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        // markers: true,
        start: "top -525%",
        end: "top -545%",
        scrub: 2
    }
})


tl.to("#gola", {
    left: "95%",
    top: "70vh",
    rotate: 540,
    duration: 2
}, "anim1")

tl.to("#platform", {
    rotate: 20,
}, "anim1")

tl.to("#page2-in h1", {
    delay: 0.5,
    onUpdate: function () {
        $('#page2-in h1').textillate({ in: { effect: 'fadeInUp' } });
    }
}, "anim1")

tl.to("#page2-circle svg .snake__text-path", {
    onStart: function snake() {
        var a = document.querySelector("#page2-circle svg .snake__text-path")
        var b = 100
        if (b > 0) {
            setInterval(() => {
                a.setAttribute("startOffset", `${b--}%`)
            }, 50);
        }
    }
}, "anim1")

tl2.to("#safed-gola", {
    scale: 10,
}, "anim2")

tl2.to("#page5 h1", {
    delay: 1,
    onUpdate: function () {
        $('#page5 h1').textillate({ in: { effect: 'fadeInUp' } });
    }
}, "anim2")

var flag = 0
document.querySelector("#menu-icon").addEventListener("click",function(){
    if(flag == 0){        
        document.querySelector("#full-scr").style.opacity = 1
        document.querySelector("#full-scr").style.top = 0
        document.querySelector("#full-scr").style.height ="100%"
        document.querySelector("#menu1").style.rotate = "45deg"
        document.querySelector("#menu2").style.rotate = "-45deg"

        
        flag = 1
    }else{
        document.querySelector("#full-scr").style.height = 0
        document.querySelector("#full-scr").style.opacity = 0
        document.querySelector("#full-scr").style.top = "-100%"
        document.querySelector("#menu1").style.rotate = "0deg"
        document.querySelector("#menu2").style.rotate = "0deg"
        flag = 0
    }
})

window.addEventListener("resize",function(){
    location.reload()
})