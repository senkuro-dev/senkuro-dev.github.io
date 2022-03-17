(() => {
    const SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzXBZHpw2zZQAFz0IcSKc-vmeQBy0JFgoMEHatVTunNv10WsDaXby4dILLzdmKJ1aHG/exec';

    const form = document.querySelector('.form');
    const input = document.querySelector('.form-input');
    const submit = form.querySelector('.form-submit');
    const formSpinner = form.querySelector('.form-submit-loader');

    const formMessage = document.querySelector('.form-message');

    form.onsubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        input.setAttribute('disabled', 'disabled');
        submit.setAttribute('disabled', 'disabled');

        formSpinner.classList.add('form-submit-loader-spin');

        const response = await fetch(SHEET_SCRIPT_URL, {
            method: 'POST',
            body: formData
        });

        try {
            const result = await response.json();

            if (!result.success) {
                throw new Error('Not success response');
            }

            formMessage.textContent = result.code === 'DUPLICATE'
                ? 'Спасибо, вы уже и так с нами 💖'
                : 'Спасибо за подписку ❤️‍🔥';

            console.log('Success send email');
        } catch (error) {
            console.error('Failed to send email', response.statusText);

            formMessage.textContent = 'Произошла ошибка, попробуйте ещё раз 😩';

            input.removeAttribute('disabled');
            submit.removeAttribute('disabled');
        } finally {
            formSpinner.classList.remove('form-submit-loader-spin');
            formMessage.classList.remove('form-message-hide');
        }
    };

    const sr = ScrollReveal({
		origin: 'top',
		distance: '80px',
		duration: 2000,
		reset: false
	})

	/*SCROLL HOME*/
	sr.reveal('.content-info', {})
	sr.reveal('.content-image', {origin:'left', delay: 400})
})();