(() => {
    const SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyC83j_Zjh3W_PeSWr4oTmCAvzmxD6umT-RHl-qCa_ykf2oBEgNWq0eXMbSiimEyo00/exec';

    const form = document.querySelector('.form');
    const input = document.querySelector('.form-input');
    const submit = form.querySelector('.form-submit');
    const formSpinner = form.querySelector('.form-submit-loader');

    const formMessage = document.querySelector('.form-message');

    form.onsubmit = async (event) => {
        event.preventDefault();

        input.setAttribute('disabled', 'disabled');
        submit.setAttribute('disabled', 'disabled');

        const formData = new FormData(event.target);

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
                : 'Спасибо за подписку 🔥';

            console.log('Success send email');
        } catch (error) {
            console.error('Failed to send email', response.statusText);

            formMessage.textContent = 'Произошла ошибка, попробуйте ещё раз 😩';

            input.removeAttribute('disabled');
            submit.removeAttribute('disabled');
        } finally {
            formSpinner.classList.remove('form-submit-loader-spin');
        }
    };
})();