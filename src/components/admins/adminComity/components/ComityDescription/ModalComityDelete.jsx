import { useState } from "react";
import { clearErrorAfterDelay } from "../../../../../utilities/clearErrorAfterDelay.js";
import { ReloadAfterDelay } from "../../../../../utilities/ReloadAfterDelay.js";

const ModalComityDelete = ({ closeModal, adminData }) => {
    const [datas, setDatas] = useState([]);
    const [message, setMessage] = useState('');

    const handleDelete = (id) => {
        fetch("http://localhost:3000/api/comities/" + id, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(resp => {
                if (resp.ok) {
                    setMessage(`Le membre a bien été supprimé.`);
                    ReloadAfterDelay(setMessage, 3000);
                    return resp.json();
                } else {
                    setMessage(`La suppression du membre a échoué.`);
                    clearErrorAfterDelay(setMessage, 3000);
                    throw new Error("Erreur lors de la suppression du membre.");
                }
            })
            .then(datas => {
                console.log(`La suppression du membre a réussi.`,
                    datas);
            })
            .catch(error => {
                console.error('Erreur lors de la requête de suppression',
                    error);
            })
    }
    
    return (
        <>

            <div className="modalDelete" onClick={closeModal}></div>

            <div className="modalDelete__content">
                <div className="modalDelete__content__close" onClick={closeModal}></div>
                <p className="modalDelete__content__question">Êtes vous surs de vouloir supprimer</p>
                <span className="modalDelete__content__data">"{adminData.firstName} {adminData.lastName}"</span>
                <button className="modalDelete__content__yes" onClick={() => handleDelete(adminData.id)}>Oui</button>
                <button className="modalDelete__content__no" onClick={closeModal}>Non</button>
                <p className="modalDelete__content__message">{message}</p>
            </div>

        </>
    )
}

export default ModalComityDelete;