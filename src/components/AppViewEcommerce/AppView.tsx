import React, { useEffect, useState } from "react";
import "./styles.scss";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import {
    faMagnifyingGlass,
    faUser,
    faCartShopping,
    faPhone,
    faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WahioImg } from "../../App";
import { Link } from "react-router-dom";

export interface ProductoModel {
    imgProducto: string;
    categoriaId: string;
    name: string;
    description: string;
    price: string;
    imgLogo: string;
    imgBanner: string;
    id: string;
    // categoria: {
    //     imgCategoria: string;
    //     categoria: string;
    // };
}
interface CategoriasModel {
    categoria: string;
    imgCategoria: string;
    id: string;
}

const AppView = () => {
    const [productos, setProductos] = useState<ProductoModel[]>([
        {
            imgProducto: "",
            categoriaId: "",
            name: "",
            description: "",
            price: "",
            imgLogo: "",
            imgBanner: "",
            id: "",
        },
    ]);

    // const [producto, setProducto] = useState<ProductoModel>({
    //     imgProducto: "",
    //     categoriaId: "",
    //     name: "",
    //     description: "",
    //     price: "",
    //     imgLogo: "",
    //     imgBanner: "",

    // });

    const [categorias, setCategorias] = useState<CategoriasModel[]>([]);
    const productosCollection = collection(db, "listaProductos");
    const categoriasCollection = collection(db, "categorias");

    const accederProductos = () => {
        getDocs(productosCollection)
            .then((data) => {
                console.log("DATA RESULT : ", data);
                const values = data.docs.map((doc) => ({
                    ...(doc.data() as ProductoModel),
                    id: doc.id,
                }));
                console.log("Categorías cargadas:", values);
                setProductos(values);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            });
        console.log(productosCollection, "DEBERIA VERSE");
    };
    useEffect(() => {
        accederProductos();
    }, []);
    const accederCategorias = () => {
        getDocs(categoriasCollection)
            .then((data) => {
                console.log("DATA RESULT : ", data);
                const values = data.docs.map((doc) => ({
                    ...(doc.data() as CategoriasModel),
                    id: doc.id,
                }));
                console.log("Categorías cargadas:", values);
                setCategorias(values);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            });
        console.log(categoriasCollection, "DEBERIA VERSE");
    };
    useEffect(() => {
        accederCategorias();
    }, []);

    const getCategoriaForProducto = (producto: ProductoModel) => {
        return categorias.find((cat) => cat.id === producto.categoriaId);
    };

    // Crear un array de objetos con datos combinados de productos y categorías
    const productosConCategorias = productos.map((product) => ({
        ...product,
        categoria: getCategoriaForProducto(product),
    }));

    return (
        <div>
            <div>
                <div>
                    <div className="contenedorBarra">
                        {productos.map((product) => (
                            <div>
                                <div>
                                    <img
                                        src={product.imgLogo}
                                        alt=""
                                        width="40px"
                                        className="imgLogo"
                                    />
                                </div>
                            </div>
                        ))}
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
                    {/* {productos.map((product) => ( */}
                    <div
                        style={{
                            margin: "0 auto",
                            maxWidth: "1100px",
                        }}
                    >
                        <img
                            src="https://i.ytimg.com/vi/TonNdlqz2uI/maxresdefault.jpg"
                            alt=""
                            width="1100px"
                            height="450px"
                            style={{ width: "100%" }}
                            className="imgBanner"
                        />
                    </div>
                    {/* ))} */}
                </div>

                <div className="listaCategorias">
                    {categorias.map((category) => (
                        <div className="contenedorProducts">
                            <div className="categorias">
                                <img
                                    src={category.imgCategoria}
                                    alt=""
                                    width="80px"
                                />
                                <p
                                    style={{
                                        color: "#353535",
                                        fontSize: "15px",
                                        fontFamily: "sans-serif",
                                    }}
                                >
                                    {category.categoria}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: "10px",
                    margin: "0 auto",
                    maxWidth: "1100px",
                    marginTop: "20px",
                }}
            >
                {productosConCategorias.map((productoConCategoria) => (
                    <Link
                        to={"/perfilProducto/:" + productoConCategoria.id}
                        className="producto"
                        key={productoConCategoria.id}
                    >
                        <img
                            src={productoConCategoria.imgProducto}
                            alt=""
                            width="248px"
                            height="248px"
                        />
                        <p>{productoConCategoria.name}</p>
                        <p style={{ color: "black" }}>
                            $ {productoConCategoria.price}
                        </p>
                        <p>
                            {productoConCategoria.categoria
                                ? `Categoría: ${productoConCategoria.categoria.categoria}`
                                : ""}
                        </p>
                    </Link>
                ))}
            </div>
            <div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",

                        backgroundColor: "#DEDEDE66",
                        padding: "50px",
                        marginTop: "40px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            margin: "0 auto",
                            maxWidth: "1100px",
                            gap: "100px",
                        }}
                    >
                        <div>
                            <p>Ropa</p>
                            <p style={{ color: "#808080" }}>
                                Siguenos en redes
                            </p>
                            <button
                                style={{
                                    border: "none",
                                    borderRadius: "10px",
                                    padding: "7px",
                                    backgroundColor: "#b3b3b3",
                                }}
                            >
                                <FontAwesomeIcon icon={faPhone} />
                            </button>
                        </div>
                        <div>
                            <p>Pagos seguros con tarjeta o en efectivo</p>
                            <img
                                src="https://test.wahio.shop/static/media/wompi-logo.b535ec1703117dcd4937.png"
                                alt=""
                                width="100px"
                            />
                        </div>

                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "7px",
                                }}
                            >
                                <p>Powered by Wahio</p>
                                <img src={WahioImg} alt="" width="16px" />
                            </div>
                            <button
                                style={{ borderRadius: "20px", padding: "7px" }}
                            >
                                <FontAwesomeIcon icon={faArrowCircleRight} />{" "}
                                Crea tu tienda
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // </div>
    );
};

export default AppView;
