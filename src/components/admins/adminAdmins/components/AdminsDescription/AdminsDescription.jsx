import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import ModalAdmins from "./ModalAdmins.jsx"
import { fetchForAll } from "../../../../../utilities/functionFetch.js"

const AdminsDescription = () => {
    const [openModal, setOpenModal] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [datas, setDatas] = useState([]);

    const handleDelete = (id) => {
        fetch("http://localhost:3000/api/users/" + id, {
            method: 'DELETE'
        })
            .then(resp => {
                if (resp.ok) {
                    console.log(`La suppression de l'utilisateur ${id} a réussi.`);
                    return resp.json();
                } else {
                    console.log(`La suppression de l'utilisateur a échoué.`);
                    throw new Error("Erreur lors de la suppression de l'utilisateur.");
                }
            })
            .then(datas => {
                console.log(`La suppression de l'utilisateur ${id} a réussi.`,
                    datas);
            })
            .catch(error => {
                console.error('Erreur lors de la requête de suppression',
                    error);
            })
    }

    const handleOpenModal = (user) => {
        setOpenModal(user)
    }

    const handleCloseModal = () => {
        setOpenModal(null)
    }

    useEffect(() => {
        fetchForAll(setIsLoaded, setError, setDatas, "api/users")
    }, [])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {

        return (

            <>

                {datas.data.map((item) => (

                    <section className="articleAdmins" key={item.id}>

                        <div className="articleAdmins__text">
                            <p>{item.email}</p>
                        </div>

                        <div className="articleAdmins__icon">

                            <a onClick={() => handleOpenModal(item)}>
                                <FontAwesomeIcon className="articleAdmins__icon__pencil" icon={faPencil} />
                            </a>
                            {openModal == item && createPortal(
                                <ModalAdmins adminData={item} closeModal={handleCloseModal} />, document.body
                            )}

                            <span onClick={() => { handleDelete(item.id) }}>
                                <FontAwesomeIcon className="articleAdmins__icon__trash" icon={faTrash} />
                            </span>
                        </div>
                    </section>

                ))}

            </>

        )
    }
}

export default AdminsDescription;