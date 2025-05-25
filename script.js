
// تأثيرات الحركة عند التمرير
const animateElements = document.querySelectorAll('.animate-on-scroll');

animateElements.forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
});

// العدادات المتغيرة
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value.toLocaleString() + "+";
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// تشغيل العدادات عند التمرير إليها
ScrollTrigger.create({
    trigger: ".stats-bar",
    start: "top 80%",
    onEnter: () => {
        animateValue("martyrs-count", 0, 35000, 2000);
        animateValue("refugees-count", 0, 7000000, 2000);
        animateValue("settlements-count", 0, 280, 1000);
    }
});

// زر الطباعة
document.getElementById('print-btn').addEventListener('click', () => {
    window.print();
});

// زر العودة للأعلى
document.getElementById('top-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// رسم بياني للإحصاءات
const ctx = document.createElement('canvas');
ctx.style.maxWidth = '100%';
ctx.style.margin = '2rem 0';
document.querySelector('#crimes').appendChild(ctx);

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['الشهداء', 'الجرحى', 'المعتقلون', 'المباني المدمرة'],
        datasets: [{
            label: 'إحصاءات الصراع الفلسطيني',
            data: [35000, 100000, 1000000, 50000],
            backgroundColor: [
                'rgba(206, 17, 38, 0.7)',
                'rgba(0, 122, 61, 0.7)',
                'rgba(0, 0, 0, 0.7)',
                'rgba(128, 128, 128, 0.7)'
            ],
            borderColor: [
                'rgba(206, 17, 38, 1)',
                'rgba(0, 122, 61, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(128, 128, 128, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
