import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import ImageLeft from '../../assets/images/image-title-left.png';
import ImageRight from '../../assets/images/image-title-right.png';

const Form = () => {

    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('contact_service', 'contact_form', form.current, 'LoB492yO3zEvCzY_C')
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    return (
        <form ref={form} onSubmit={sendEmail} className="form">
            <img className='form__imageLeft' src={ImageRight} alt="Image decoration gauche" />
            <img className='form__imageRight' src={ImageRight} alt="Image decoration droite" />
            <div className="form__lastname">
                <label htmlFor="lastname">Nom</label>
                <input type="text" name="lastname" maxLength={20} required={true} />
            </div>
            <div className="form__firstname">
                <label htmlFor="firstname">Prénom</label>
                <input type="text" name='firstname' maxLength={20} required={true} />
            </div>
            <div className="form__email">
                <label htmlFor="email">Email</label>
                <input type="email" name='email' maxLength={40} required={true} />
            </div>
            <div className="form__message">
                <label htmlFor="message">Message</label>
                <textarea cols="30" rows="10" name='message' maxLength={200} required={true} />
            </div>
            <div className="form__btn">
                <button>Envoyer</button>
            </div>
        </form>
    )
}

export default Form;