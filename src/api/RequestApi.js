import axiosApi from "./axiosApi"

export const postPersonType = async (data, idUser) =>{
 const _URL = `/api/TiposPersonas/${idUser}`;

    return axiosApi.post(_URL, data)
}


export const putPersonType = async (data, idUser) =>{
    const _URL = `/api/TiposPersonas/${idUser}`;
   
       return axiosApi.put(_URL, data)
   }

   
   export const deletePersonType = async (data, idUser) =>{
    const _URL = `api/TiposPersonas/${idUser}`;

    console.log(_URL, data)
   
       return axiosApi.delete(_URL, {data: data})
   }
   

export const postPeople = async (data, idUser) =>{
    const _URL = `/api/contabilidad/Personas/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }

   export const EditPeople = async (data, idUser) =>{
    const _URL = `/api/contabilidad/Personas/${idUser}`;
   
       return axiosApi.put(_URL, data)
   }

   export const deletePerson = async (data, idUser) =>{
    const _URL = `api/contabilidad/Personas/${idUser}`;

    console.log(_URL, data)
   
       return axiosApi.delete(_URL, {data: data})
   }

export const getAllTyperPersons = async () =>{
    const _URL = `/api/TiposPersonas/all`;

       return axiosApi.get(_URL)
   }

   export const getAllPeople = async () =>{
    const _URL = `/api/contabilidad/Personas/all`;

       return axiosApi.get(_URL)
   }

   export const getAllBranchOffice = async () =>{
    const _URL = `/api/Sucursales/all`;

       return axiosApi.get(_URL)
   }

   export const postBranchOffice = async (data, idUser) =>{
    const _URL = `/api/Sucursales/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }

   export const EditBranchOffice = async (data, idUser) =>{
    const _URL = `/api/Sucursales/${idUser}`;
   
       return axiosApi.put(_URL, data)
   }

   export const deleteBranchOffice = async (data, idUser) =>{
    const _URL = `api/Sucursales/${idUser}`;

    console.log(_URL, data)
   
       return axiosApi.delete(_URL, {data: data})
   }


   
   export const getAllWarehouseType = async () =>{
    const _URL = `/api/Almacen/TiposAlmacen/all`;

       return axiosApi.get(_URL)
   }


   export const postWarehouseType = async (data, idUser) =>{
    
    const _URL = `/api/Almacen/TiposAlmacen/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }

   export const EditWarehouseType = async (data, idUser) =>{
    const _URL = `/api/Almacen/TiposAlmacen/${idUser}`;
   
       return axiosApi.put(_URL, data)
   }


   export const deleteWarehouseType = async (data, idUser) =>{
    const _URL = `api/Almacen/TiposAlmacen/${idUser}`;

    console.log(_URL, data)
   
       return axiosApi.delete(_URL, {data: data})
   }


   export const getAllWarehouse = async () =>{
    const _URL = `/api/Almacen/Almacenes/all`;

       return axiosApi.get(_URL)
   }

   export const postWarehouse = async (data, idUser) =>{
    
    const _URL = `/api/api/Almacen/Almacenes/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }

   export const EditWarehouse = async (data, idUser) =>{
    const _URL = `/api/Almacen/Almacenes/${idUser}`;
   
       return axiosApi.put(_URL, data)
   }

   export const deleteWarehouse = async (data, idUser) =>{
    const _URL = `api/Almacen/Almacenes/${idUser}`;

    console.log(_URL, data)
   
       return axiosApi.delete(_URL, {data: data})
   }

   
   export const getAllProductsbyIdProvider = async (id) =>{
    const _URL = `/api/Compras/ProveedorProductos/porproveedor/${id}`;

       return axiosApi.get(_URL)
   }

   export const getAllProducts = async () =>{
    const _URL = `api/Compras/ProveedorProductos/all`;

       return axiosApi.get(_URL)
   }

   export const postRequesitions = async (data, idUser) =>{
    
    const _URL = `/api/Compras/OrdenesCompras/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }

   export const getAllRequesitions = async () =>{
    
    const _URL =`/api/Compras/OrdenesCompras/all`;
   
       return axiosApi.get(_URL)
   }


   export const postRequesitionsDetail = async (data, idUser) =>{
    
    const _URL = `/api/Compras/DetallesOrdenesCompras/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }

   export const getRequesitionById = async (id) =>{
    
    const _URL =`/api/Compras/OrdenesCompras/id/${id}`;
   
       return axiosApi.get(_URL)
   }

   export const getOrderDetail = async (id) =>{
    
    const _URL =`/api/Compras/DetallesOrdenesCompras/ordencompra/${id}`;
   
       return axiosApi.get(_URL)
   }

   export const updateRequesitions = async ( data, idUser) =>{
    
    const _URL = `/api/Compras/OrdenesCompras/${idUser}`;
   
       return axiosApi.put(_URL, data)
   }

   export const changeStatusReqById = async ( idOrder,idEstatus, idUser) =>{
    
    const _URL = `/api/Compras/OrdenesCompras/estado/${idOrder}/${idEstatus}/${idUser}`;
   
       return axiosApi.put(_URL)
   }

   export const getAllProductos = async () =>{
    
    const _URL =`/api/Compras/ProveedorProductos/all`;
   
       return axiosApi.get(_URL)
   }

   export const getAlmacenByIdSucursal = async () =>{
    
    const _URL =`/api/Almacen/Almacenes/all`;
   
       return axiosApi.get(_URL)
   }

   export const getKardexByIdAlmacen = async (idAlmacen) =>{
    
    let date = new Date().toISOString();

    const _URL =`/api/Almacen/Inventarios/kardex/${date}/${idAlmacen}`;
   
       return axiosApi.get(_URL)
   }

   export const kardexBajoStock = async (idAlmacen) =>{
    
    let date = new Date().toISOString();

    const _URL =`/api/Almacen/Inventarios/kardex/${date}/${idAlmacen}`;
   
       return axiosApi.get(_URL)
   }


   export const getAllDepartures = async () =>{
    
    let date = new Date().toISOString();

    const _URL =`/api/Almacen/SalidasAlmacen/all`;
   
       return axiosApi.get(_URL)
   }

   
   export const getAllTransfers = async () =>{

    let date = new Date().toISOString();

    const _URL =`/api/Almacen/Transferencias/all`;
   
       return axiosApi.get(_URL)
   }


   export const postSalidaAlmacen = async (data, idUser) =>{
    
    const _URL = `/api/Almacen/SalidasAlmacen/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }

   export const entradaAlmacen = async (data, idUser) =>{
    
    const _URL = `/api/Almacen/EntradasAlmacen/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }

   export const trasferenciaAlmacen = async (data, idUser) =>{
    
    const _URL = `/api/Almacen/Transferencias/${idUser}`;
   
       return axiosApi.post(_URL, data)
   }







   


   
   
