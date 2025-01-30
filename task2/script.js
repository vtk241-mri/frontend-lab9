class Slider {
  constructor(container, direction = "horizontal") {
    this.container = container;
    this.direction = direction;
    this.slides = [];
    this.currentSlide = 0;

    this.track = document.createElement("div");
    this.track.className = "slider-track";
    this.container.appendChild(this.track);

    this.ui = new SliderUI(this);
    this.navigator = new SliderNavigator(this);
  }

  addSlide(content) {
    const slide = document.createElement("div");
    slide.className = "slider-slide";
    slide.innerHTML = content;
    this.track.appendChild(slide);
    this.slides.push(slide);
    this.updateTrackLayout();
  }

  updateTrackLayout() {
    if (this.direction === "vertical") {
      this.track.style.flexDirection = "column";
      this.container.classList.add("vertical");
    } else {
      this.track.style.flexDirection = "row";
      this.container.classList.remove("vertical");
    }
  }

  updateSlidePosition() {
    const offset =
      this.direction === "vertical"
        ? this.container.clientHeight
        : this.container.clientWidth;

    this.track.style.transform =
      this.direction === "vertical"
        ? `translateY(-${this.currentSlide * offset}px)`
        : `translateX(-${this.currentSlide * offset}px)`;
  }
}

class SliderUI {
  constructor(slider) {
    this.slider = slider;
    this.createControls();
  }

  createControls() {
    const controls = document.createElement("div");
    controls.className = "slider-controls";

    const prevButton = this.createButton("&#10094;", () =>
      this.slider.navigator.prevSlide()
    );
    const nextButton = this.createButton("&#10095;", () =>
      this.slider.navigator.nextSlide()
    );

    controls.appendChild(prevButton);
    controls.appendChild(nextButton);
    this.slider.container.appendChild(controls);
  }

  createButton(innerHtml, action) {
    const button = document.createElement("button");
    button.className = "slider-button";
    button.innerHTML = innerHtml;
    button.onclick = action;
    return button;
  }
}

class SliderNavigator {
  constructor(slider) {
    this.slider = slider;
  }

  nextSlide() {
    if (this.slider.currentSlide < this.slider.slides.length - 1) {
      this.slider.currentSlide++;
    } else {
      this.slider.currentSlide = 0;
    }
    this.slider.updateSlidePosition();
  }

  prevSlide() {
    if (this.slider.currentSlide > 0) {
      this.slider.currentSlide--;
    } else {
      this.slider.currentSlide = this.slider.slides.length - 1;
    }
    this.slider.updateSlidePosition();
  }
}

const sliderContainer = document.getElementById("sliderContainer");
const slider = new Slider(sliderContainer, "horizontal");

slider.addSlide('<img src="img/1.jpg" alt="Slide 1">');
slider.addSlide('<img src="img/2.jpg" alt="Slide 2">');
slider.addSlide('<img src="img/3.jpg" alt="Slide 3">');
