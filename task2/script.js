class Slider {
  constructor(container, direction = "horizontal") {
    this.container = container;
    this.direction = direction;
    this.slides = [];
    this.currentSlide = 0;

    this.track = document.createElement("div");
    this.track.className = "slider-track";
    this.container.appendChild(this.track);

    this.createControls();
  }

  createControls() {
    const controls = document.createElement("div");
    controls.className = "slider-controls";

    const prevButton = document.createElement("button");
    prevButton.className = "slider-button";
    prevButton.innerHTML = "&#10094;";
    prevButton.onclick = () => this.prevSlide();

    const nextButton = document.createElement("button");
    nextButton.className = "slider-button";
    nextButton.innerHTML = "&#10095;";
    nextButton.onclick = () => this.nextSlide();

    controls.appendChild(prevButton);
    controls.appendChild(nextButton);
    this.container.appendChild(controls);
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

  nextSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
    this.updateSlidePosition();
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.slides.length - 1;
    }
    this.updateSlidePosition();
  }

  updateSlidePosition() {
    if (this.direction === "vertical") {
      this.track.style.transform = `translateY(-${this.currentSlide * 100}%)`;
    } else {
      this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
  }
}

const sliderContainer = document.getElementById("sliderContainer");
const slider = new Slider(sliderContainer, "horizontal");

slider.addSlide('<img src="img/1.jpg" alt="Slide 1">');
slider.addSlide('<img src="img/2.jpg" alt="Slide 2">');
slider.addSlide('<img src="img/3.jpg" alt="Slide 3">');
