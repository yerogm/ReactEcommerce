import React, { useEffect, useState } from "react";
import "./styles.scss";
import { ProductoModel } from "../AppViewEcommerce/AppView";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faMagnifyingGlass,
    faUser,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

export interface CarritoComprasModel {
    imgProducto: string;
    name: string;
    price: number;
    id: string;
}

export interface WhatsappProps {
    numeroTelefono: number;
}

const CarritoCompras = (props: WhatsappProps) => {
    const [productosAgregados, setProductosAgregados] = useState<
        CarritoComprasModel[]
    >([
        {
            imgProducto: "",
            name: "",
            price: 0,
            id: "",
        },
    ]);
    const carritoComprasCollection = collection(db, "carritoCompras");

    const accederProductos = () => {
        getDocs(carritoComprasCollection)
            .then((data) => {
                console.log("DATA RESULT : ", data);
                const values = data.docs.map((doc) => ({
                    ...(doc.data() as CarritoComprasModel),
                    id: doc.id,
                }));
                console.log("Categorías cargadas:", values);
                setProductosAgregados(values);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            });
        console.log(carritoComprasCollection, "DEBERIA VERSE");
    };
   
    useEffect(() => {
        accederProductos();
    }, []);

    const eliminarCarrito = (id: string) => {
        const carritoDoc = doc(db, "carritoCompras", id);
        deleteDoc(carritoDoc);
        accederProductos();
    };

    const totalPrice = productosAgregados.reduce(
        (total, product) => total + product.price,
        0
    );

    const { numeroTelefono } = props;
    const whatsappClick = () => {

        const numeroWhatsAppColombia = `+57${numeroTelefono}`;
        const message = `Hola, buen día el producto ha sido agregado al carrito de compras. ¿Puedes ayudarme con el proceso de pago?`;

        const whatsappLink = `https://wa.me/${numeroWhatsAppColombia}?text=${encodeURIComponent(
            message
        )}`;

        window.open(whatsappLink, "_blank");

    };

    return (
        <div className="carritoCompras">
            
            <div
                className="contenedorBarraPerfil"
                // style={{ backgroundColor: "rgb(222, 222, 222)" }}
                style={{ margin: "10px", backgroundColor: "none" }}
            >
                <div className="imgLogo">
                    <img
                        src="https://thumbs.dreamstime.com/b/vector-de-la-marca-nike-swoosh-logotipo-osh-vectorial-en-fondo-negro-dise%C3%B1o-imprimible-183282346.jpg"
                        alt=""
                        width="40px"
                        className="imgLogo"
                    />
                </div>
                <div className="buscador">
                    <input type="text" placeholder="Buscar Productos" />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{
                            marginLeft: "auto",
                            color: "#6c6cff",
                        }}
                    />
                </div>
                <div className="userShop">
                    <button>
                        <FontAwesomeIcon
                            icon={faUser}
                            style={{
                                color: "rgb(67 67 69)",
                            }}
                        />
                    </button>
                    <button>
                        <Link to={"/carritoCompras"}>
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                style={{
                                    color: "rgb(67 67 69)",
                                }}
                            />
                        </Link>
                    </button>
                </div>

                <div
                    style={{
                        borderBottom: "#e5e4e4 solid 1px",
                        marginTop: "10px",
                    }}
                />
            </div>
            {/* <hr /> */}
            <div
                style={{
                    border: "1px solid black",
                    margin: "10px",
                    padding: "10px",
                    borderRadius: "10px",
                }}
            >
                <span style={{ fontWeight: "500", fontSize: "18px" }}>
                    PRODUCTOS
                </span>
                {productosAgregados.map((products) => (
                    <div className="contenedorProducts">
                        <div>
                            <img
                                src={products.imgProducto}
                                alt=""
                                className="imgCarrito"
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span style={{ fontSize: "17px" }}>
                                {products.name}
                            </span>
                            <span style={{ fontSize: "17px" }}>
                                ${products.price}
                            </span>
                        </div>
                        <div className="btnEliminar">
                            <button
                                onClick={() => eliminarCarrito(products.id)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div
                style={{
                    border: "1px solid black",
                    margin: "10px",
                    padding: "10px",
                    borderRadius: "10px",
                    marginTop: "20px",
                }}
            >
                <span style={{ fontWeight: "500", fontSize: "17px" }}>
                    Resumen
                </span>
                <div style={{ marginTop: "20px" }} className="resumen-pago">
                    <div style={{ display: "flex", marginBottom: "5px" }}>
                        <span>Subtotal: </span>
                        <div style={{ marginLeft: "auto" }}>
                            <span>${totalPrice}</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                        <span>Impuesto: </span>
                        <div style={{ marginLeft: "auto" }}>
                            <span>$0</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", marginTop: "10px" }}>
                        <span>TOTAL: </span>
                        <div style={{ marginLeft: "auto" }}>
                            <span>${totalPrice}</span>
                        </div>
                    </div>
                </div>
                <div className="btnCompra">
                    <button style={{cursor:"pointer"}} onClick={whatsappClick}>Continuar Compra</button>
                </div>
            </div>
        </div>
    );
};

export default CarritoCompras;
