import React from 'react'

const inicioSesion = () => {
  return (
    <div><h2 className='text-2x1 font-bold mb-6 text-center'>Inicio de Sesión</h2>
        <div className='flex space-y-4 flex-col items-center justify-center mt-8'>
            <h5>Ingresar correo</h5>
            <input 
            type="email"
            placeholder='Correo'
            className='w-100 mb-4 p-2 border rounded text-center' />
            <h5>Ingresar contraseña</h5>
            <input 
            type="password"
            placeholder='Contraseña'
            className='w-100 mb-6 p-2 border rounded text-center' />
            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4'>
            Iniciar Sesión
            </button>
        </div>
    </div>

  )
}

export default inicioSesion