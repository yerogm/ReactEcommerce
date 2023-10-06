import React from 'react'
import "./styles.scss"
import { collection } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const CarShop = () => {

const carritoCollection = collection(db, "listaProductos")

  return (
    <div>CarShop</div>
  )
}

export default CarShop