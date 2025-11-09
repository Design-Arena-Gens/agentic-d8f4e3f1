const services = [
  {
    id: "brand-strategy",
    name: "Brand Strategy & Positioning",
    category: "Branding",
    price: "$2,400",
    description: "Craft a cohesive brand system with messaging, visual identity, and go-to-market positioning.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Competitive landscape and customer research",
      "Persona development and brand voice guidelines",
      "Visual identity starter kit and asset templates",
    ],
    tags: ["Brand Audit", "Go-to-Market", "Playbook"],
    actionUrl: "https://cal.com",
  },
  {
    id: "ux-review",
    name: "Experience Design Sprint",
    category: "Product",
    price: "$3,100",
    description: "Rapidly validate product ideas through collaborative workshops, UX research, and prototyping.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Three-day collaborative workshop",
      "User journey mapping and opportunity analysis",
      "Clickable prototype and testing report",
    ],
    tags: ["UX Strategy", "Workshops", "Research"],
    actionUrl: "https://cal.com",
  },
  {
    id: "seo-suite",
    name: "Growth SEO Suite",
    category: "Marketing",
    price: "$1,850",
    description: "Data-driven SEO roadmap focused on technical improvements, authority building, and content strategy.",
    image:
      "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Comprehensive audit with actionable scorecard",
      "Quarterly content calendar and keyword clustering",
      "Technical fixes prioritized with developer handoff notes",
    ],
    tags: ["SEO", "Content Strategy", "Analytics"],
    actionUrl: "https://cal.com",
  },
  {
    id: "automation-suite",
    name: "Workflow Automation Suite",
    category: "Operations",
    price: "$2,950",
    description: "Automate repetitive tasks, streamline process handoffs, and integrate your SaaS stack seamlessly.",
    image:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Operational audit and automation blueprint",
      "Integration with CRM, marketing automation, and billing",
      "Team training with detailed documentation",
    ],
    tags: ["Automation", "Zapier", "SaaS"],
    actionUrl: "https://cal.com",
  },
  {
    id: "content-studio",
    name: "Content Velocity Studio",
    category: "Marketing",
    price: "$1,450",
    description: "Build high-performing content systems with editorial strategy, production workflows, and analytics.",
    image:
      "https://images.unsplash.com/photo-1522199996660-7b3f91a5d79e?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Editorial strategy with positioning pillars",
      "Production workflows and talent recommendations",
      "Analytics dashboard setup and performance KPIs",
    ],
    tags: ["Editorial", "Inbound", "Analytics"],
    actionUrl: "https://cal.com",
  },
  {
    id: "analytics-pulse",
    name: "Analytics Health Pulse",
    category: "Data",
    price: "$2,150",
    description:
      "Get a full audit of your analytics stack with dashboards, instrumentation fixes, and executive reporting.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Instrumentation audit and conversion tracking fixes",
      "Executive dashboard with tailored insights",
      "Quarterly analytics playbook and training",
    ],
    tags: ["Data Studio", "Attribution", "BI"],
    actionUrl: "https://cal.com",
  },
];

const searchInput = document.querySelector("#serviceSearch");
const servicesGrid = document.querySelector("#servicesGrid");
const emptyState = document.querySelector("#emptyState");
const cardTemplate = document.querySelector("#serviceTemplate");
const popupTemplate = document.querySelector("#popupTemplate");
const popupContainer = document.querySelector("#popupContainer");

const renderServices = (serviceCollection) => {
  servicesGrid.innerHTML = "";
  if (serviceCollection.length === 0) {
    emptyState.classList.remove("d-none");
    return;
  }

  emptyState.classList.add("d-none");
  const fragment = document.createDocumentFragment();

  serviceCollection.forEach((service) => {
    const card = cardTemplate.content.cloneNode(true);
    const cardElement = card.querySelector(".service-card");

    cardElement.dataset.serviceId = service.id;

    const imageElement = card.querySelector(".service-card__image");
    if (imageElement) {
      imageElement.style.backgroundImage = `linear-gradient(135deg, rgba(13, 110, 253, 0.18), rgba(32, 201, 151, 0.2)), url("${service.image}")`;
    }

    card.querySelector(".service-card__category").textContent = service.category;
    card.querySelector(".service-card__price").textContent = service.price;
    card.querySelector(".service-card__title").textContent = service.name;
    card.querySelector(".service-card__description").textContent = service.description;

    const tagsContainer = card.querySelector(".service-card__tags");
    tagsContainer.append(
      ...service.tags.map((tag) => {
        const span = document.createElement("span");
        span.textContent = tag;
        return span;
      })
    );

    card.querySelector(".service-card__btn").addEventListener("click", () => openPopup(service.id));

    fragment.appendChild(card);
  });

  servicesGrid.appendChild(fragment);
};

const createPopup = (service) => {
  const popup = popupTemplate.content.cloneNode(true);
  const overlay = popup.querySelector(".service-popup__overlay");
  const closeButton = popup.querySelector(".service-popup__close");
  const actionButton = popup.querySelector(".service-popup__action");

  popup.querySelector(".service-popup__title").textContent = service.name;
  popup.querySelector(".service-popup__subtitle").textContent = service.description;
  popup.querySelector(".service-popup__price").textContent = service.price;

  const media = popup.querySelector(".service-popup__media");
  media.style.backgroundImage = `linear-gradient(135deg, rgba(13, 110, 253, 0.4), rgba(123, 97, 255, 0.35)), url("${service.image}")`;

  const tagsWrapper = popup.querySelector(".service-popup__tags");
  tagsWrapper.append(
    ...service.tags.map((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      return span;
    })
  );

  const featureList = popup.querySelector(".service-popup__features");
  service.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    featureList.appendChild(li);
  });

  actionButton.href = service.actionUrl;

  const closePopup = () => {
    overlay.classList.add("closing");
    overlay.addEventListener(
      "animationend",
      () => {
        overlay.remove();
      },
      { once: true }
    );
  };

  closeButton.addEventListener("click", closePopup);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closePopup();
    }
  });

  return overlay;
};

const openPopup = (serviceId) => {
  const service = services.find((item) => item.id === serviceId);
  if (!service) return;

  const overlay = createPopup(service);
  popupContainer.appendChild(overlay);
};

const normalize = (value) => value.toLowerCase().trim();

const filterServices = (query) => {
  if (!query) return services;

  const normalizedQuery = normalize(query);
  return services.filter((service) => {
    const haystack = [
      service.name,
      service.category,
      service.description,
      ...service.tags,
      service.features.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
};

const handleSearch = (event) => {
  const { value } = event.target;
  const filtered = filterServices(value);
  renderServices(filtered);
};

searchInput.addEventListener("input", handleSearch);

renderServices(services);
