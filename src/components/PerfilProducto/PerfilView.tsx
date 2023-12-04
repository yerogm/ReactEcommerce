import React, { useEffect, useState } from "react";
import {
    faArrowLeft,
    faCartShopping,
    faMagnifyingGlass,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { CategoriaModel, ProductoModel } from "../AppViewEcommerce/AppView";
import { db } from "../firebaseConfig/firebase";
import "./styles.scss";
import Mapa from "../Mapa/Mapa";
// @ts-ignore
import { WhatsAppWidget } from "react-whatsapp-widget";

type Params = {
    id: string;
};

export interface WhatsappProps {
    numeroTelefono: number;
}

const quantityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const PerfilProducto = (props: WhatsappProps) => {
    const params = useParams<Params>();
    const [producto, setProducto] = useState<ProductoModel>();
    const [sugerencias, setSugerencias] = useState<ProductoModel[]>([]);
    const [categoria, setCategoria] = useState<CategoriaModel>();

    const productosCollection = collection(db, "listaProductos");

    async function obtenerProductoPorId() {
        const docRef = doc(collection(db, "listaProductos"), params.id);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const productoActual = docSnap.data() as ProductoModel;
                console.log("Producto actual cargado:", productoActual);
                setProducto(productoActual);
                obtenerCategoriaPorId(productoActual.categoriaId);
                productosSugeridos(productoActual.categoriaId);
            } else {
                console.log(params.id, "ESTE ES EL ID DEL DOCUMENTO");
            }
        } catch (error) {
            console.error("Error al obtener el producto:", error);
        }
    }

    async function obtenerCategoriaPorId(id: string) {
        const docRef = doc(collection(db, "categorias"), id);

        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const categoriaResult = docSnap.data() as CategoriaModel;
                setCategoria(categoriaResult);
            } else {
                console.log("no se encontro la categoria");
            }
        } catch (error) {
            console.error("Error al obtener el producto:", error);
        }
    }

    useEffect(() => {
        obtenerProductoPorId();
    }, []);

    const productosSugeridos = async (categoriaId: string) => {
        try {
            const productosObtenidos = await query(
                productosCollection,
                where("categoriaId", "==", categoriaId)
            );
            const data = await getDocs(productosObtenidos);
            const values: ProductoModel[] = data.docs.map((doc) => ({
                ...(doc.data() as ProductoModel),
                id: doc.id,
            }));
            setSugerencias(values);
        } catch {}
    };
    const { numeroTelefono } = props;

    const whatsappClick = () => {
        const numeroWhatsAppColombia = `+57${numeroTelefono}`;
        const message = `Hola, buen día. El producto ${producto?.name} ha sido agregado al carrito de compras. ¿Puedes ayudarme con el proceso de pago?`;

        const whatsappLink = `https://wa.me/${numeroWhatsAppColombia}?text=${encodeURIComponent(
            message
        )}`;

        window.open(whatsappLink, "_blank");
    };
    return (
        <div className="contenedorPerfil">
            <div className="contenedorBarraPerfil">
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

            {producto ? (
                <div className="contenedorPrincipal">
                    <Link
                        to={"/"}
                        style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            // marginTop: "10px",
                            textDecoration: "none",
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            style={{ color: "black" }}
                        />
                        <span style={{ fontSize: "13px", color: "black" }}>
                            Volver
                        </span>
                    </Link>
                    <div className="contenedorPerfil">
                        <div className="post">
                            <img src={producto.imgProducto} alt="" />
                            <div className="namePrice">
                                <h2>{producto.name}</h2>
                                <h1>${producto.price}</h1>
                                <div className="carrito-Drop">
                                    <select name="" id="">
                                        <option>Cantidad: 0</option>
                                        {quantityList.map((item) => {
                                            return (
                                                <option key={item}>
                                                    {item}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <button onClick={whatsappClick}>
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                marginTop: "20px",
                            }}
                        >
                            <span
                                style={{ fontWeight: "500", fontSize: " 20px" }}
                            >
                                Description
                            </span>
                            <span
                                style={{
                                    fontWeight: "500",
                                    fontSize: " 16px",
                                    marginTop: "20px",
                                    color: "#494949",
                                }}
                            >
                                {producto.description}
                            </span>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <span
                                style={{ fontWeight: "500", fontSize: " 20px" }}
                            >
                                Caracteristicas
                            </span>
                            <table style={{ marginTop: "20px" }}>
                                <tbody>
                                    <tr>
                                        <td className="caracteristicas">
                                            Categoria
                                        </td>
                                        <td>{categoria?.categoria}</td>
                                    </tr>

                                    <tr>
                                        <td className="caracteristicas">
                                            Talla
                                        </td>
                                        <td>{producto.talla}</td>
                                    </tr>
                                    <tr>
                                        <td className="caracteristicas">
                                            Color
                                        </td>
                                        <td>{producto.color}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                        >
                            <Mapa />
                        </div>
                        <h2 style={{ fontSize: "21px", fontWeight: "100" }}>
                            {categoria?.categoria}
                        </h2>
                        <div className="contenedorSugerencias">
                            {sugerencias.map((sugerencia) => (
                                <div className="sugerencias">
                                    <img src={sugerencia.imgProducto} alt="" />
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "100",
                                            padding: "1px 10px",
                                        }}
                                    >
                                        {sugerencia.name}
                                    </span>
                                    <span className="price">
                                        ${sugerencia.price}
                                    </span>{" "}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Agrega más detalles o características del producto aquí */}
                </div>
            ) : (
                <h1 style={{ textAlign: "center" }}>Cargando producto...</h1>
            )}
        </div>
    );
};

export default PerfilProducto;
