import React, {Component} from "react";
import {CarouselData} from "./CarouselData";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import Swipe from "react-easy-swipe";
import PropTypes from "prop-types";

// TODO: https://stackoverflow.com/questions/68025173/how-to-change-image-on-hover-with-nextjs-and-tailwindcss

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0,
            paused: false,
            playTime: this.props.playTime,
        };
    }

    static propTypes = {
        playTime: PropTypes.number,
    };

    static defaultProps = {
        playTime: 5000,
    };

    componentDidMount() {
        setInterval(() => {
            if (this.state.paused === false) {
                let newSlide =
                    this.state.currentSlide === CarouselData.length - 1
                        ? 0
                        : this.state.currentSlide + 1;
                this.setState({currentSlide: newSlide});
            }
        }, this.state.playTime);
    }

    nextSlide = () => {
        let newSlide =
            this.state.currentSlide === CarouselData.length - 1
                ? 0
                : this.state.currentSlide + 1;
        this.setState({currentSlide: newSlide});
    };

    prevSlide = () => {
        let newSlide =
            this.state.currentSlide === 0
                ? CarouselData.length - 1
                : this.state.currentSlide - 1;
        this.setState({currentSlide: newSlide});
    };

    setCurrentSlide = (index) => {
        this.setState({currentSlide: index});
    };

    render() {
        return (
            <div>
                <div className="w-auto lg:h-[32rem] lg:max-h-screen md:h-96 sm:h-full flex overflow-hidden relative">
                    <AiOutlineLeft
                        onClick={this.prevSlide}
                        className="absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer"
                    />

                    <Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>
                        {CarouselData.map((slide, index) => {
                            return (
                                <a href={slide.url}>

                                    <img
                                        src={slide.image}
                                        alt="This is a carousel slide"
                                        key={index}
                                        className={
                                            index === this.state.currentSlide
                                                ? "block w-full h-auto object-cover"
                                                : "hidden"
                                        }
                                        onMouseEnter={() => {
                                            this.setState({paused: true});
                                        }}
                                        onMouseLeave={() => {
                                            this.setState({paused: false});
                                        }}
                                    />
                                </a>
                            );
                        })}
                    </Swipe>

                    <div className="absolute w-full flex justify-center bottom-0">
                        {CarouselData.map((element, index) => {
                            return (
                                <div
                                    className={
                                        index === this.state.currentSlide
                                            ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                                            : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
                                    }
                                    key={index}
                                    onClick={() => {
                                        this.setCurrentSlide(index);
                                    }}
                                />
                            );
                        })}
                    </div>

                    <AiOutlineRight
                        onClick={this.nextSlide}
                        className="absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer"
                    />
                </div>
            </div>
        );
    }
}


export default Carousel;
