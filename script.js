document.addEventListener('DOMContentLoaded', () => {
    // Inicializar íconos Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // Menú móvil
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Preseleccionar servicio al hacer clic en una tarjeta de servicio
    const serviceLinks = document.querySelectorAll('.service-link');
    const serviceSelect = document.getElementById('service');

    serviceLinks.forEach(link => {
        link.addEventListener('click', () => {
            const selectedService = link.getAttribute('data-service');
            if (serviceSelect && selectedService) {
                serviceSelect.value = selectedService;
            }
        });
    });

    // Evaluador Interactivo en 30 Segundos (#autodiagnostico)
    const orgTypeButtons = document.querySelectorAll('#orgTypeOptions .eval-option');
    const goalButtons = document.querySelectorAll('#goalOptions .eval-option');
    const evalResultTitle = document.getElementById('evalResultTitle');
    const evalResultDesc = document.getElementById('evalResultDesc');
    const evalWhatsappBtn = document.getElementById('evalWhatsappBtn');

    let currentOrg = 'Empresa / MYPE';
    let currentGoal = 'Obtener Crédito o Capital de Trabajo';

    const recommendations = {
        'Empresa / MYPE': {
            'Obtener Crédito o Capital de Trabajo': {
                title: 'Estructuración Financiera y Carpeta Crediticia para MYPE',
                desc: 'Analizaremos sin costo tus flujos de caja, indicadores de endeudamiento y garantías para estructurar un expediente sólido ante banca o cajas municipales. Según el diagnóstico, evaluaremos una visita técnica a tu negocio o asesoría financiera.'
            },
            'Licitar con el Estado (OSCE)': {
                title: 'Ruta de Proveedor del Estado y Licitaciones OSCE/SEACE',
                desc: 'Revisaremos en tu consulta gratuita tu RNP, experiencia facturable y oportunidades en SEACE para que presentes ofertas competitivas sin errores formales. Evaluaremos acompañarte con asesoría especializada por proceso.'
            },
            'Formalización, RUC / SUNAT y Procesos': {
                title: 'Optimización Administrativa, Tributaria y Logística MYPE',
                desc: 'Diagnosticaremos gratuitamente tus cuellos de botella operativos, régimen tributario SUNAT y control de abastecimiento para proponerte una visita de diagnóstico in situ o consultoría de mejora continua.'
            },
            'Gestión del Riesgo (CENEPRED) / Proyectos': {
                title: 'Cumplimiento Técnico e Inspecciones de Riesgo Empresarial',
                desc: 'Evaluaremos en una primera sesión gratuita los requerimientos normativos y de seguridad de tus instalaciones para definir una visita técnica de verificación in situ.'
            }
        },
        'Cooperativa / Asociación Agraria': {
            'Obtener Crédito o Capital de Trabajo': {
                title: 'Financiamiento Agrario y Capital de Campaña (Enfoque Agrobanco)',
                desc: 'En tu consulta 100% gratuita evaluaremos el padrón de socios, hectáreas instaladas, rendimientos y flujos proyectados. Con base en ello, coordinaremos una visita técnica en campo o la estructuración integral del crédito.'
            },
            'Licitar con el Estado (OSCE)': {
                title: 'Articulación Comercial y Compras Estatales para Productores',
                desc: 'Diagnosticaremos sin costo la capacidad productiva y formalización de tu cooperativa o asociación para participar en programas públicos y adquisiciones estatales.'
            },
            'Formalización, RUC / SUNAT y Procesos': {
                title: 'Fortalecimiento Organizacional, Padrón y Formalización SUNAT',
                desc: 'Revisaremos gratuitamente el estado legal, tributario y contable de la organización agraria, definiendo si programamos un taller presencial con los socios o una asesoría administrativa.'
            },
            'Gestión del Riesgo (CENEPRED) / Proyectos': {
                title: 'Gestión de Proyectos Productivos Rurales (AgroRural / FONCODES)',
                desc: 'Analizaremos en tu consulta gratuita la viabilidad técnica y administrativa de tu proyecto productivo rural para programar una visita en campo o asistencia técnica especializada.'
            }
        },
        'Municipalidad / Entidad Pública': {
            'Obtener Crédito o Capital de Trabajo': {
                title: 'Evaluación Financiera de Proyectos e Inversión Pública',
                desc: 'En una primera reunión gratuita revisaremos la sostenibilidad financiera y administrativa de tus intervenciones o proyectos productivos municipales.'
            },
            'Licitar con el Estado (OSCE)': {
                title: 'Asistencia Técnica en Actos Preparatorios y Contrataciones',
                desc: 'Diagnosticaremos gratuitamente los requerimientos técnicos, estudio de mercado y bases administrativas para prevenir observaciones y nulidades en tus procesos de selección.'
            },
            'Formalización, RUC / SUNAT y Procesos': {
                title: 'Optimización de Abastecimiento, Logística y Gestión Municipal',
                desc: 'Evaluaremos sin costo el flujo logístico, ejecución presupuestal y control patrimonial de tu entidad para proponer una visita técnica o consultoría especializada.'
            },
            'Gestión del Riesgo (CENEPRED) / Proyectos': {
                title: 'Consultoría EVAR e Instrumentos Técnicos CENEPRED / SINAGERD',
                desc: 'En tu consulta gratuita revisaremos el alcance territorial y normativo requerido por CENEPRED para programar el levantamiento de información en campo y elaboración del informe EVAR.'
            }
        },
        'Productor / Emprendedor': {
            'Obtener Crédito o Capital de Trabajo': {
                title: 'Evaluación Crediticia y Flujo de Caja para Productores y Negocios',
                desc: 'Conversaremos gratuitamente sobre tu actividad productiva o comercial para preparar tus sustento de ingresos y costos antes de solicitar financiamiento. Evaluaremos realizar una visita a tu parcela o local.'
            },
            'Licitar con el Estado (OSCE)': {
                title: 'Inscripción en RNP e Inicio como Proveedor del Estado',
                desc: 'Te orientaré gratis sobre los requisitos para inscribirte en el Registro Nacional de Proveedores (RNP) y cotizar tus primeros bienes o servicios con entidades públicas.'
            },
            'Formalización, RUC / SUNAT y Procesos': {
                title: 'Ruta de Formalización RUC / SUNAT y Orden Administrativo',
                desc: 'En tu consulta gratuita definiremos el régimen tributario más conveniente y cómo ordenar tus costos e inventarios para crecer con respaldo financiero.'
            },
            'Gestión del Riesgo (CENEPRED) / Proyectos': {
                title: 'Formulación de Planes de Negocio y Fondos Concursables',
                desc: 'Evaluaremos sin costo el potencial de tu emprendimiento o parcela para postular a fondos concursables, proyectos productivos o asistencia técnica.'
            }
        }
    };

    const updateEvaluator = () => {
        const orgData = recommendations[currentOrg] || recommendations['Empresa / MYPE'];
        const rec = orgData[currentGoal] || orgData['Obtener Crédito o Capital de Trabajo'];

        if (evalResultTitle && evalResultDesc) {
            evalResultTitle.textContent = rec.title;
            evalResultDesc.textContent = rec.desc;
        }

        if (evalWhatsappBtn) {
            const text =
                `Hola Jhunior, realicé el autodiagnóstico en tu web:\n` +
                `• Organización: ${currentOrg}\n` +
                `• Objetivo: ${currentGoal}\n` +
                `• Recomendación: ${rec.title}\n\n` +
                `Deseo solicitar mi Orientación Inicial Gratuita y conocer las opciones de consulta desde S/ 50, visita técnica o asesoría.`;
            evalWhatsappBtn.href = `https://wa.me/51916645528?text=${encodeURIComponent(text)}`;
        }
    };

    orgTypeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            orgTypeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentOrg = btn.getAttribute('data-org');
            updateEvaluator();
        });
    });

    goalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            goalButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGoal = btn.getAttribute('data-goal');
            updateEvaluator();
        });
    });

    // Filtros de la Galería de 18 Fotos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Acordeón de Preguntas Frecuentes (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                faqItems.forEach(other => other.classList.remove('active'));
                if (!isOpen) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Modal Lightbox para ampliar cualquier foto de la galería
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxClose = document.getElementById('lightboxClose');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4');
            const desc = item.querySelector('p');

            if (lightbox && img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxTitle.textContent = title ? title.textContent : '';
                lightboxDesc.textContent = desc ? desc.textContent : '';
                lightbox.classList.add('active');
                lightbox.setAttribute('aria-hidden', 'false');
            }
        });
    });

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            lightboxImg.src = '';
        }
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Envío del formulario hacia WhatsApp / Correo directo
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const organization = document.getElementById('organization').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;
            const modalityEl = document.getElementById('modality');
            const modality = modalityEl ? modalityEl.value : 'Por definir tras consulta gratuita';
            const message = document.getElementById('message').value.trim();

            const subject = encodeURIComponent(`Consulta Inicial 100% Gratuita - ${organization}`);
            const bodyText =
                `Hola Jhunior,\n\n` +
                `Solicito mi Consulta Inicial 100% Gratuita con los siguientes datos:\n` +
                `• Nombre y Cargo: ${fullName}\n` +
                `• Organización / RUC: ${organization}\n` +
                `• Teléfono: ${phone}\n` +
                `• Correo: ${email}\n` +
                `• Servicio de interés: ${service}\n` +
                `• Modalidad a evaluar tras la consulta: ${modality}\n` +
                `• Detalle: ${message || 'Por definir en la consulta gratuita'}\n`;

            const whatsappUrl = `https://wa.me/51916645528?text=${encodeURIComponent(bodyText)}`;
            window.open(whatsappUrl, '_blank', 'noopener');

            window.location.href = `mailto:jhuniorvignerzanderv@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
        });
    }

    // Animaciones de aparición suave al bajar (Scroll Reveal de lujo)
    const revealTargets = document.querySelectorAll(
        '.service-card, .pricing-card, .case-card, .process-step, .why-card, .gallery-item, .faq-item, .trust-item'
    );

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
        );

        revealTargets.forEach((el, index) => {
            el.classList.add('reveal-on-scroll');
            el.style.transitionDelay = `${(index % 4) * 70}ms`;
            revealObserver.observe(el);
        });
    }
});
