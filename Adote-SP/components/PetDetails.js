import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/petDetails.module.css';

const PetDetails = () => {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) return;

        const fetchPetDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/animals/${id}`);
                const data = await response.json();
                setPet(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar os detalhes do animal:', error);
                setLoading(false);
            }
        };

        fetchPetDetails();
    }, [id]);

    if (loading) {
        return <div>Carregando detalhes do pet...</div>;
    }

    if (!pet) {
        return <div>Animal não encontrado.</div>;
    }

    return (
        <div className={styles.petDetails}>
            <h2>{pet.nome}</h2>
            <img
                src={pet.fotos.length > 0 ? pet.fotos[0] : '/images/default-pet.jpg'}
                alt={pet.nome}
            />
            <p><strong>Espécie:</strong> {pet.especie}</p>
            <p><strong>Tamanho:</strong> {pet.tamanho}</p>
            <p><strong>Idade:</strong> {pet.idade} anos</p>
            <p><strong>Descrição:</strong> {pet.descricao}</p>
            <p><strong>Localização:</strong> {pet.localizacao}</p>
           
            <button className={styles.adoptButton}>Adotar</button>
        </div>
    );
};

export default PetDetails;
