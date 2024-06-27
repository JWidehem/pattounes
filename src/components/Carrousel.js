import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import './Carrousel.scss';
import imagesLoaded from 'imagesloaded';

const Carrousel = () => {
    const sliderRef = useRef(null);
    const inactivityTimeoutRef = useRef(null);
    const autoScrollIntervalRef = useRef(null);
    const currentIndexRef = useRef(0); 
    const INACTIVITY_TIME = 10000; 
    const AUTO_SCROLL_TIME = 10000;

    const lerp = (a, b, t) => a + (b - a) * t;

    const genId = useMemo(() => {
        let count = 0;
        return () => {
            return (count++).toString();
        };
    }, []);

    const Raf = useMemo(() => {
        return class Raf {
            constructor() {
                this.rafId = 0;
                this.callbacks = [];
                this.raf = this.raf.bind(this);
                this.start();
            }

            start() {
                this.raf();
            }

            stop() {
                cancelAnimationFrame(this.rafId);
            }

            raf() {
                this.callbacks.forEach(({ callback, id }) => callback({ id }));
                this.rafId = requestAnimationFrame(this.raf);
            }

            add(callback, id) {
                this.callbacks.push({ callback, id: id || genId() });
            }

            remove(id) {
                this.callbacks = this.callbacks.filter((callback) => callback.id !== id);
            }
        };
    }, [genId]);

    const Vec2 = useMemo(() => {
        return class Vec2 {
            constructor(x = 0, y = 0) {
                this.x = x;
                this.y = y;
            }

            set(x, y) {
                this.x = x;
                this.y = y;
            }

            lerp(v, t) {
                this.x = lerp(this.x, v.x, t);
                this.y = lerp(this.y, v.y, t);
            }
        };
    }, []);

    const vec2 = useCallback((x = 0, y = 0) => new Vec2(x, y), [Vec2]);

    const resolveOptions = useCallback((node, options) => {
        return {
            trigger: options?.trigger ?? node,
            target: options?.target
                ? Array.isArray(options.target)
                    ? options.target
                    : [options.target]
                : [node]
        };
    }, []);

    const tilt = useCallback((node, options, rafInstance) => {
        let { trigger, target } = resolveOptions(node, options);
        let lerpAmount = 0.06;

        const rotDeg = { current: vec2(), target: vec2() };
        const bgPos = { current: vec2(), target: vec2() };

        const update = (newOptions) => {
            destroy();
            ({ trigger, target } = resolveOptions(node, newOptions));
            init();
        };

        let rafId;

        function ticker({ id }) {
            rafId = id;

            rotDeg.current.lerp(rotDeg.target, lerpAmount);
            bgPos.current.lerp(bgPos.target, lerpAmount);

            for (const el of target) {
                el.style.setProperty("--rotX", rotDeg.current.y.toFixed(2) + "deg");
                el.style.setProperty("--rotY", rotDeg.current.x.toFixed(2) + "deg");
                el.style.setProperty("--bgPosX", bgPos.current.x.toFixed(2) + "%");
                el.style.setProperty("--bgPosY", bgPos.current.y.toFixed(2) + "%");
            }
        }

        const onMouseMove = ({ offsetX, offsetY }) => {
            lerpAmount = 0.1;

            for (const el of target) {
                const ox = (offsetX - el.clientWidth * 0.5) / (Math.PI * 3);
                const oy = -(offsetY - el.clientHeight * 0.5) / (Math.PI * 4);

                rotDeg.target.set(ox, oy);
                bgPos.target.set(-ox * 0.3, oy * 0.3);
            }
        };

        const onMouseLeave = () => {
            lerpAmount = 0.06;
            rotDeg.target.set(0, 0);
            bgPos.target.set(0, 0);
        };

        const addListeners = () => {
            trigger.addEventListener("mousemove", onMouseMove);
            trigger.addEventListener("mouseleave", onMouseLeave);
        };

        const removeListeners = () => {
            trigger.removeEventListener("mousemove", onMouseMove);
            trigger.removeEventListener("mouseleave", onMouseLeave);
        };

        const init = () => {
            addListeners();
            rafInstance.add(ticker);
        };

        const destroy = () => {
            removeListeners();
            rafInstance.remove(rafId);
        };

        init();
        return { destroy, update };
    }, [vec2, resolveOptions]);

    useEffect(() => {
        const totalSlides = document.querySelectorAll('.slide').length;
        const rafInstance = new Raf(); 

        function startAutoScroll() {
            autoScrollIntervalRef.current = setInterval(() => {
                change(1)();
                currentIndexRef.current = (currentIndexRef.current + 1) % totalSlides;
                if (currentIndexRef.current === 0) {
                    stopAutoScroll();
                }
            }, AUTO_SCROLL_TIME);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollIntervalRef.current);
        }

        function resetInactivityTimeout() {
            clearTimeout(inactivityTimeoutRef.current);
            stopAutoScroll();
            inactivityTimeoutRef.current = setTimeout(() => {
                currentIndexRef.current = 0;
                startAutoScroll();
            }, INACTIVITY_TIME);
        }

        function change(direction) {
            return () => {
                let current = {
                    slide: document.querySelector(".slide[data-current]"),
                    slideInfo: document.querySelector(".slide-info[data-current]"),
                };
                let previous = {
                    slide: document.querySelector(".slide[data-previous]"),
                    slideInfo: document.querySelector(".slide-info[data-previous]"),
                };
                let next = {
                    slide: document.querySelector(".slide[data-next]"),
                    slideInfo: document.querySelector(".slide-info[data-next]"),
                };

                Object.values(current).forEach((el) => el.removeAttribute("data-current"));
                Object.values(previous).forEach((el) => el.removeAttribute("data-previous"));
                Object.values(next).forEach((el) => el.removeAttribute("data-next"));

                if (direction === 1) {
                    let temp = current;
                    current = next;
                    next = previous;
                    previous = temp;

                    current.slide.style.zIndex = "20";
                    previous.slide.style.zIndex = "30";
                    next.slide.style.zIndex = "10";
                } else if (direction === -1) {
                    let temp = current;
                    current = previous;
                    previous = next;
                    next = temp;

                    current.slide.style.zIndex = "20";
                    previous.slide.style.zIndex = "10";
                    next.slide.style.zIndex = "30";
                }

                Object.values(current).forEach((el) => el.setAttribute("data-current", ""));
                Object.values(previous).forEach((el) => el.setAttribute("data-previous", ""));
                Object.values(next).forEach((el) => el.setAttribute("data-next", ""));
            };
        }

        const init = () => {
            const loader = document.querySelector(".loader");

            const slides = [...document.querySelectorAll(".slide")];
            const slidesInfo = [...document.querySelectorAll(".slide-info")];

            const buttons = {
                prev: document.querySelector(".slider--btn__prev"),
                next: document.querySelector(".slider--btn__next")
            };

            loader.style.opacity = 0;
            loader.style.pointerEvents = "none";

            slides.forEach((slide, i) => {
                const slideInner = slide.querySelector(".slide__inner");
                const slideInfoInner = slidesInfo[i].querySelector(".slide-info__inner");

                tilt(slide, { target: [slideInner, slideInfoInner] }, rafInstance); 
            });

            buttons.prev.addEventListener("click", () => {
                resetInactivityTimeout();
                change(-1)();
            });
            buttons.next.addEventListener("click", () => {
                resetInactivityTimeout();
                change(1)();
            });

            document.addEventListener('click', resetInactivityTimeout);
            document.addEventListener('mousemove', resetInactivityTimeout);
            document.addEventListener('keypress', resetInactivityTimeout);

            resetInactivityTimeout();
        }

        const setup = () => {
            const loaderText = document.querySelector(".loader__text");

            const images = [...document.querySelectorAll("img")];
            const totalImages = images.length;
            let loadedImages = 0;
            let progress = {
                current: 0,
                target: 0
            };

            images.forEach((image) => {
                imagesLoaded(image, (instance) => {
                    if (instance.isComplete) {
                        loadedImages++;
                        progress.target = loadedImages / totalImages;
                    }
                });
            });

            rafInstance.add(({ id }) => {
                progress.current = lerp(progress.current, progress.target, 0.06);
                const progressPercent = Math.round(progress.current * 100);
                loaderText.textContent = `${progressPercent}%`;

                if (progressPercent === 100) {
                    init();
                    rafInstance.remove(id);
                }
            });
        }

        setup();

        return () => {
            clearTimeout(inactivityTimeoutRef.current);
            clearInterval(autoScrollIntervalRef.current);
            document.removeEventListener('click', resetInactivityTimeout);
            document.removeEventListener('mousemove', resetInactivityTimeout);
            document.removeEventListener('keypress', resetInactivityTimeout);
        };
    }, [Raf, tilt]);

    return (
        <div className="slider" ref={sliderRef}>
            <button className="slider--btn slider--btn__prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6" />
                </svg>
            </button>
            <div className="slides__wrapper">
                <div className="slides">
                    <div className="slide" data-current>
                        <div className="slide__inner">
                            <div className="slide--image__wrapper">
                                <img className="slide--image" src="https://devloop01.github.io/voyage-slider/images/scotland-mountains.jpg" alt="Scotland Mountains" />
                            </div>
                        </div>
                    </div>
                    <div className="slide__bg" data-current></div>

                    <div className="slide" data-next>
                        <div className="slide__inner">
                            <div className="slide--image__wrapper">
                                <img className="slide--image" src="https://devloop01.github.io/voyage-slider/images/machu-pichu.jpg" alt="Machu Pichu" />
                            </div>
                        </div>
                    </div>
                    <div className="slide__bg" data-next></div>

                    <div className="slide" data-previous>
                        <div className="slide__inner">
                            <div className="slide--image__wrapper">
                                <img className="slide--image" src="https://devloop01.github.io/voyage-slider/images/chamonix.jpg" alt="Chamonix" />
                            </div>
                        </div>
                    </div>
                    <div className="slide__bg" data-previous></div>
                </div>

                <div className="slides--infos">
                    <div className="slide-info" data-current>
                        <div className="slide-info__inner">
                            <div className="slide-info--text__wrapper">
                                <div data-title className="slide-info--text">
                                    <span>Highlands</span>
                                </div>
                                <div data-subtitle className="slide-info--text">
                                    <span>Scotland</span>
                                </div>
                                <div data-description className="slide-info--text">
                                    <span>The mountains are calling</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="slide-info" data-next>
                        <div className="slide-info__inner">
                            <div className="slide-info--text__wrapper">
                                <div data-title className="slide-info--text">
                                    <span>Machu Pichu</span>
                                </div>
                                <div data-subtitle className="slide-info--text">
                                    <span>Peru</span>
                                </div>
                                <div data-description className="slide-info--text">
                                    <span>Adventure is never far away</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="slide-info" data-previous>
                        <div className="slide-info__inner">
                            <div className="slide-info--text__wrapper">
                                <div data-title className="slide-info--text">
                                    <span>Chamonix</span>
                                </div>
                                <div data-subtitle className="slide-info--text">
                                    <span>France</span>
                                </div>
                                <div data-description className="slide-info--text">
                                    <span>Let your dreams come true</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="slider--btn slider--btn__next">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </button>

            <div className="loader">
                <span className="loader__text">0%</span>
            </div>
        </div>
    );
};

export default Carrousel;
