import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ToyotCom from './ToyotCom';

const ToyotaCatagory = () => {
    const [charms, setCharms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/notes');
                const filteredNotes = res.data.allNotes.filter(note => note.catagory === 'TOYOTA');
                setCharms(filteredNotes);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Yükleniyor...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Hata: {error}</div>;
    }

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold text-center mb-10" data-aos="fade-up">
                TOYOTA Kategorisi
            </h1>
            <div style={{marginBottom:"60px"}} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {charms.length > 0 ? (
                    charms.map((note) => (
                        <div key={note._id} className="bg-white shadow-lg rounded-lg p-6" data-aos="fade-up">
                            {note.thumbnail && (
                                <img
                                    src={note.thumbnail}
                                    alt="Thumbnail"
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                            )}
                            <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                            <p className="text-gray-600 mb-4">${note.price}</p>
                            <button
                                onClick={() => navigate(`/product/${note._id}`)}
                                className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
                            >
                                Details
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center col-span-full">Ürün bulunamadı.</div>
                )}
            </div>
            <ToyotCom/>
        </div>
    );
};

export default ToyotaCatagory;
