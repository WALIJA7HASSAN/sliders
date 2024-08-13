const testimonials = [
  {
    text: '“We have created a multi-million dollar organization, and we started with $40K in the bank … Business Mastery is a one stop shop to get every possible resource you need to define yourself, your business, and your future.”',
    name: '- ANDIRA',
  },
  {
    text: '“$1,000 dollars in 2018 and in 2021 it hit $5 million dollars… Next year, I mean, the sky’s the limit with all the teachings we’ve had from Tony.”',
    name: '- LETIZDA',
  },
  {
    text: '“Our latest results (4 months since attending Business Mastery) show $600,000 in increased revenue. We have only used these tools with one location. Extrapolated over our other 7 locations… this will yield a 8 figure return within 12 months.”',
    name: '- DAVID',
  },
]

const testimonialContainer = document.querySelector(
  '.testimonial-text-container'
)
const sliderSpansContainer = document.querySelector('.slider-spans-container')
const iconLeft = document.querySelector('.icon-left')
const iconRight = document.querySelector('.icon-right')
let currentIndex = 0
let autoSlideInterval

// Create testimonial HTML
function createTestimonialHTML(testimonial) {
  return `
    <div class="testimonial-text">
      <p>${testimonial.text}</p>
      <p class="testimonila-name">${testimonial.name}</p>
    </div>
  `
}

// Create slider span HTML
function createSliderSpanHTML(index) {
  return `<li class="slider-span-container" data-index="${index}"><span class="slider-span"></span></li>`
}

// Render testimonials
function renderTestimonials() {
  testimonialContainer.innerHTML = createTestimonialHTML(
    testimonials[currentIndex]
  )
  sliderSpansContainer.innerHTML = testimonials
    .map((_, index) => createSliderSpanHTML(index))
    .join('')
  updateActiveSpan(currentIndex) // Initialize the first testimonial
  initializeSliderSpanEventListeners() // Reattach event listeners
}

// Update active slider span
function updateActiveSpan(index) {
  const sliderSpans = document.querySelectorAll('.slider-span-container')
  sliderSpans.forEach((container, idx) => {
    const span = container.querySelector('.slider-span')
    span.classList.toggle('active-slider-span', idx === index)
  })
}

// Reset animation class
function resetAnimation() {
  const testimonial = testimonialContainer.querySelector('.testimonial-text')
  testimonial.classList.remove('slide-right', 'slide-left')
}

// Show next testimonial
function showNextTestimonial() {
  resetAnimation()
  testimonialContainer
    .querySelector('.testimonial-text')
    .classList.add('slide-right')

  currentIndex = (currentIndex + 1) % testimonials.length
  renderTestimonials() // Update content and reattach event listeners
  restartAutoSlide()
}

// Show previous testimonial
function showPrevTestimonial() {
  resetAnimation()
  testimonialContainer
    .querySelector('.testimonial-text')
    .classList.add('slide-left')

  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
  renderTestimonials() // Update content and reattach event listeners
  restartAutoSlide()
}

// Update slider position
function updateSliderPosition(index) {
  updateActiveSpan(index)
}

// Restart auto slide
function restartAutoSlide() {
  clearInterval(autoSlideInterval)
  startAutoSlide()
}

// Start auto slide
function startAutoSlide() {
  autoSlideInterval = setInterval(showNextTestimonial, 2500)
}

// Handle span click
function handleSpanClick(index) {
  if (index !== currentIndex) {
    currentIndex = index
    renderTestimonials() // Update content and reattach event listeners
    resetAnimation() // Reset animation class
    updateSliderPosition(currentIndex)
    restartAutoSlide()
  }
}

// Initialize slider span event listeners
function initializeSliderSpanEventListeners() {
  document.querySelectorAll('.slider-span-container').forEach((container) => {
    container.addEventListener('click', (e) => {
      handleSpanClick(parseInt(container.dataset.index))
    })
  })
}

// Initialize event listeners
function initializeEventListeners() {
  iconRight.addEventListener('click', showNextTestimonial)
  iconLeft.addEventListener('click', showPrevTestimonial)
}

// Handle touch and drag events
function handleTouchDragEvents() {
  let startX, endX

  testimonialContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX
    clearInterval(autoSlideInterval)
  })

  testimonialContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX
    if (startX > endX) {
      showNextTestimonial()
    } else {
      showPrevTestimonial()
    }
    restartAutoSlide()
  })

  testimonialContainer.addEventListener('mousedown', (e) => {
    startX = e.clientX
    clearInterval(autoSlideInterval)
  })

  testimonialContainer.addEventListener('mouseup', (e) => {
    endX = e.clientX
    if (startX > endX) {
      showNextTestimonial()
    } else {
      showPrevTestimonial()
    }
    restartAutoSlide()
  })
}

// Initialize the slider
renderTestimonials()
initializeEventListeners()
startAutoSlide()
handleTouchDragEvents()


// Alumni data
