/* Adapted from https://codepen.io/shankarcabus/pen/GzAfb */

window.addEventListener('load', () => {
    const $ppc = document.querySelector('.progress-pie-chart');
    console.log($ppc)
    const percent = parseInt($ppc.attributes['data-percent'].nodeValue);

    const deg = 360*percent/100;

    if (percent > 50) {
        $ppc.classList.add('gt-50');
    }
    document.querySelector('.ppc-progress-fill').style.transform = `rotate(${deg}deg)`;
})