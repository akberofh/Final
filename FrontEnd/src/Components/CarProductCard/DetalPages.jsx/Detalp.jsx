import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Detalp.module.scss';
import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from '../ProductCard';

const Detalp = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { note_id } = useParams();
    const { userInfo } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/notes/${note_id}`);
                const data = response.data;
                if (data && data.getById) {
                    setProduct(data.getById);
                } else {
                    setError('Ürün bulunamadı.');
                }
            } catch (error) {
                console.error('Ürün alınırken hata oluştu:', error);
                setError('Ürün detayları alınırken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [note_id]);

    const handleAddToBag = () => {
        if (!userInfo) {
            toast.warn('Sifaris etmek için kayıt olmalısınız.');
            setTimeout(() => {
                navigate('/register', { state: { from: window.location.pathname } });
            }, 3000); // 3 saniye sonra yönlendirme
            return;
        }

        const storedUserInfo = localStorage.getItem('userInfo');
        let basketList = [];

        if (storedUserInfo) {
            const userInfoObject = JSON.parse(storedUserInfo);

            const productToAdd = {
                _id: userInfo._id,
                id: note_id,
                title: product.title,
                price: product.price,
                email: userInfo.email,
                thumbnail: product.thumbnail,
                addedAt: new Date().toISOString() // Adding timestamp
            };

            if (localStorage.getItem('basketList')) {
                basketList = JSON.parse(localStorage.getItem('basketList'));
                const existingProduct = basketList.find(item => item.id === note_id);
                if (!existingProduct) {
                    basketList.push(productToAdd);
                    toast.success(`${product.title} Sifaris edildi!`);
                } else {
                    toast.info(`${product.title} zaten siparis etdiniz.`);
                }
            } else {
                basketList.push(productToAdd);
                toast.success(`${product.title} siparis edildi!`);
            }

            localStorage.setItem('basketList', JSON.stringify(basketList));
        } else {
            console.log('Kullanıcı bilgisi bulunamadı. Giriş yapmalısınız.');
        }
    };

    if (loading) {
        return <div className={styles.loading}>Yükleniyor...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!product) {
        return <div className={styles.error}>Ürün bulunamadı.</div>;
    }

    return (
        <div className={styles.detailContent}>
            <div className={styles.productDetails}>
                <img src={product.thumbnail} alt={product.title} className={styles.image} />
                <div className={styles.info}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.price}>Fiyat: {product.price}$</p>
                    <p className={styles.description}>{product.description}</p>
                    <p className={styles.category}>Kategori: {product.category}</p>
                    <div className={styles.ratings}>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                    <div className={styles.btns}>
                        <button onClick={handleAddToBag}>Sifaris et</button>
                        
                    </div>
                </div>
            </div>
            <div className={styles.otherProducts}>
                <h1>DİĞER ÜRÜNLERİMİZİ GÖRÜNTÜLE</h1>
                <div className={styles.cards}>
                    <ProductCard />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Detalp;
