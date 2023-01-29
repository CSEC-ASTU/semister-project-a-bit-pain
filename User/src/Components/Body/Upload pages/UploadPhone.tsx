import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { Iphone } from '../../../Models/Models'


const UploadPhone = () => {
    const {register, handleSubmit} = useForm<Iphone>();
    const onSubmit = handleSubmit((data) => {
        alert(JSON.stringify(data))
    });
  return (
    <div>
        <form onSubmit={onSubmit}>
            <div className='flex justify-center items-center'>
                <div className='flex shadow justify-center items-center flex-col border-0 rounded-xl w-96 mt-8 text-gray-700'>
                    <h1 className='border-b-2 mx-28 mt-4'>Phone Entry</h1>
                    <div className='mt-4'>
                        <h3 className='text-left'>Brand</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('brand', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Ram</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('ram', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Storage</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('storage', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Operating System</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('operatingsystem', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Connectivity</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('connectivity', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Color</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('color', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Screen Size</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('screensize', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Wireless Network</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('wirlessnetwork', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Price</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('price', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Description</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('description', {required: true})}/>
                    </div>
                    <div className='mt-2'>
                        <h3 className='text-left'>Types</h3>
                        <input className='px-2 mt-2 border-b-2' type="text" {...register('types', {required: true})}/>
                    </div>
                    <div>
                        <button className='my-8 border-2 px-2 rounded-md'>Upload</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default UploadPhone
